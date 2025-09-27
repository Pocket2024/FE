import html2canvas from "html2canvas";

// Canvas 성능 모니터링 및 최적화 유틸리티
class CanvasPerformanceMonitor {
  constructor() {
    this.performanceData = {
      renderingTime: 0,
      memoryBefore: 0,
      memoryAfter: 0,
      memoryDiff: 0,
      fileSize: 0,
      attempts: 0,
      successes: 0,
      failures: 0,
    };

    this.isDevelopment = process.env.NODE_ENV === "development";
    this.setupDevTools();
  }

  // 성능 데이터 가져오기
  getPerformanceData() {
    return this.performanceData;
  }

  // 성능 데이터 업데이트
  updatePerformanceData(data) {
    this.performanceData = { ...this.performanceData, ...data };
    return this.performanceData;
  }

  // Canvas 성공/실패 통계 추적
  trackCanvasResult(isSuccess, errorType = null) {
    const newStats = {
      ...this.performanceData,
      attempts: this.performanceData.attempts + 1,
      successes: isSuccess
        ? this.performanceData.successes + 1
        : this.performanceData.successes,
      failures: isSuccess
        ? this.performanceData.failures
        : this.performanceData.failures + 1,
    };

    this.performanceData = newStats;

    // 로컬 스토리지에 통계 저장
    const stats = {
      ...newStats,
      successRate:
        newStats.attempts > 0
          ? (newStats.successes / newStats.attempts) * 100
          : 0,
      device: navigator.userAgent,
      timestamp: Date.now(),
      errorType: errorType,
    };

    localStorage.setItem("canvas-performance-stats", JSON.stringify(stats));

    if (!isSuccess && errorType) {
      console.error(`Canvas 실패 유형: ${errorType}`);
    }

    return newStats;
  }

  // 안전한 이미지 생성 래퍼
  async safeImageGeneration(element, options = {}) {
    // 메모리 체크
    if ("memory" in performance) {
      const memory = performance.memory;
      const availableMemory = memory.jsHeapSizeLimit - memory.usedJSHeapSize;
      const estimatedUsage =
        element.offsetWidth *
        element.offsetHeight *
        4 *
        (options.scale || 1) ** 2;

      if (estimatedUsage > availableMemory * 0.5) {
        throw new Error("메모리 부족으로 이미지 생성을 중단합니다.");
      }
    }

    // 타임아웃 설정 (30초)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("이미지 생성 시간 초과")), 30000);
    });

    const canvasPromise = html2canvas(element, options);

    try {
      return await Promise.race([canvasPromise, timeoutPromise]);
    } catch (error) {
      // 메모리 정리
      if (typeof global !== "undefined" && typeof global.gc === "function") {
        // Node 환경에서만 의미 있음. 브라우저에선 무시.
        global.gc();
      }
      throw error;
    }
  }

  // 성능 측정이 포함된 Canvas 생성
  async measureCanvasPerformance(element, canvasOptions = {}) {
    // 성능 마크 설정
    performance.mark("canvas-start");

    const startTime = performance.now();
    const memoryBefore = performance.memory?.usedJSHeapSize || 0; // Performance API (브라우저 제공)

    try {
      const canvas = await this.safeImageGeneration(element, {
        backgroundColor: null,
        scale: canvasOptions.scale || 4,
        useCORS: true,
        allowTaint: false,
        logging: false,
        removeContainer: true,
        ignoreElements: (element) => {
          return (
            element.tagName === "BUTTON" ||
            element.classList.contains("exclude-from-capture")
          );
        },
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // 불필요한 스타일 제거
          const styleElements = clonedDoc.querySelectorAll("style");
          styleElements.forEach((style) => {
            if (!style.textContent.includes("ticket")) {
              style.remove();
            }
          });
        },
        ...canvasOptions,
      });

      // 성능 측정 완료
      performance.mark("canvas-end");
      performance.measure("canvas-rendering", "canvas-start", "canvas-end");

      const endTime = performance.now(); // Performance API (브라우저 제공)
      const renderingTime = (endTime - startTime) / 1000;
      const memoryAfter = performance.memory?.usedJSHeapSize || 0;

      const performanceInfo = {
        renderingTime,
        memoryBefore,
        memoryAfter,
        memoryDiff: memoryAfter - memoryBefore,
      };

      // 성능 데이터 업데이트
      this.updatePerformanceData({
        renderingTime: performanceInfo.renderingTime,
        memoryBefore: Math.round(performanceInfo.memoryBefore / 1048576),
        memoryAfter: Math.round(performanceInfo.memoryAfter / 1048576),
        memoryDiff: Math.round(performanceInfo.memoryDiff / 1048576),
      });

      // 성공 추적
      this.trackCanvasResult(true);

      // 콘솔에 성능 정보 출력 (개발 모드에서만)
      if (this.isDevelopment) {
        console.table({
          "렌더링 시간": `${renderingTime.toFixed(2)}초`,
          "사용 메모리 (전)": `${Math.round(memoryBefore / 1048576)}MB`,
          "사용 메모리 (후)": `${Math.round(memoryAfter / 1048576)}MB`,
          "메모리 변화": `${Math.round(
            (memoryAfter - memoryBefore) / 1048576
          )}MB`,
        });
      }

      return { canvas, performanceInfo };
    } catch (error) {
      console.error("Canvas generation failed:", error);
      this.trackCanvasResult(false, error.message);
      throw error;
    }
  }

  // 원형 마스크 알고리즘 최적화
  applyCircularMask(data, width, height, circle) {
    const { x: cx, y: cy, radius } = circle;
    const radiusSquared = radius * radius; // 제곱 연산 캐싱: radiusSquared 사전 계산

    // 바운딩 박스로 처리 영역 제한 : 전체 캔버스 대신 원 주변만 처리
    const minX = Math.max(0, cx - radius);
    const maxX = Math.min(width, cx + radius);
    const minY = Math.max(0, cy - radius);
    const maxY = Math.min(height, cy + radius);

    for (let y = minY; y < maxY; y++) {
      for (let x = minX; x < maxX; x++) {
        const dx = x - cx;
        const dy = y - cy;

        if (dx * dx + dy * dy <= radiusSquared) {
          const index = (y * width + x) * 4;
          data[index + 3] = 0; // 알파 채널만 수정 (RGB 건드리지 않고 투명도만 처리)
        }
      }
    }
  }

  // 캔버스 메모리 정리
  cleanupCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvas 크기를 1x1로 축소하여 메모리 해제
    canvas.width = 1;
    canvas.height = 1;
  }

  // 파일 크기 업데이트
  updateFileSize(blob) {
    if (blob) {
      const fileSizeMB = (blob.size / 1048576).toFixed(2); // Blob API (브라우저 제공)
      this.updatePerformanceData({
        fileSize: parseFloat(fileSizeMB),
      });
      return fileSizeMB;
    }
    return 0;
  }

  // 개발자 도구 설정
  setupDevTools() {
    if (this.isDevelopment) {
      // 성능 상세 정보 토글
      window.togglePerformanceDetails = () => {
        const stats = localStorage.getItem("canvas-performance-stats");
        if (stats) {
          console.log("📊 Canvas 성능 통계:", JSON.parse(stats));
        }
        console.log("🔧 현재 성능 데이터:", this.performanceData);
      };

      // 성능 통계 초기화
      window.clearPerformanceStats = () => {
        localStorage.removeItem("canvas-performance-stats");
        this.performanceData = {
          renderingTime: 0,
          memoryBefore: 0,
          memoryAfter: 0,
          memoryDiff: 0,
          fileSize: 0,
          attempts: 0,
          successes: 0,
          failures: 0,
        };
        console.log("📊 성능 통계가 초기화되었습니다.");
      };
    }
  }

  // 개발자 도구 정리
  cleanupDevTools() {
    if (this.isDevelopment) {
      delete window.togglePerformanceDetails;
      delete window.clearPerformanceStats;
    }
  }
}

// 싱글톤 인스턴스 생성
const canvasPerformanceMonitor = new CanvasPerformanceMonitor();

export default canvasPerformanceMonitor;
