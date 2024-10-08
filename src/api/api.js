import axios from "axios";
import { loadingStore } from "../store/store"; // 기본 스토어 경로에 맞게 수정

const api = axios.create({
  baseURL: "http://3.37.150.125",
});

// 요청 응답에 대한 인터셉터 설정
api.interceptors.request.use((config) => {
  const excludedUrls = ["/api/ocr/upload"]; // ocr 요청은 제외
  const shouldSkipLoading = excludedUrls.includes(config.url); // 해당 URL이 로딩 제외 목록에 있는지 확인

  if (!shouldSkipLoading) {
    const { startLoading } = loadingStore.getState(); // 로딩 처리
    startLoading();
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    const { stopLoading } = loadingStore.getState(); // Zustand에서 stopLoading 함수 가져오기
    stopLoading(); // API 호출 성공 시 로딩 상태 감소
    return response;
  },
  (error) => {
    const { stopLoading } = loadingStore.getState(); // Zustand에서 stopLoading 함수 가져오기
    stopLoading(); // API 호출 실패 시 로딩 상태 감소

    // // 에러 응답이 발생할 경우 처리
    // if (error.response && error.response.status === 500) {
    //   console.log("JWT가 만료되었습니다. 로그아웃 처리합니다.");

    //   // localStorage에서 access token 삭제
    //   localStorage.removeItem("accessToken");

    //   // 로그아웃 처리 (예: 페이지 리다이렉션 또는 상태 관리)
    //   window.alert("로그아웃되었습니다. 다시 로그인해주세요.");
    //   window.location.href = "/login"; // 로그아웃 후 로그인 페이지로 이동
    // }

    // 다른 에러는 그대로 throw
    return Promise.reject(error);
  }
);

export default api;
