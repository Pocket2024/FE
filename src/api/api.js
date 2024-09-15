import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080",
});

// 요청 응답에 대한 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    // 정상적인 응답일 경우 그 응답을 그대로 반환
    return response;
  },
  (error) => {
    // 에러 응답이 발생할 경우 처리
    if (error.response && error.response.status === 500) {
      // JWT 만료로 500 에러가 발생한 경우
      console.log("JWT가 만료되었습니다. 로그아웃 처리합니다.");

      // localStorage에서 access token 삭제
      localStorage.removeItem("accessToken");

      // // 로그아웃 처리 (예: 페이지 리다이렉션 또는 상태 관리)
      // window.location.href = "/login"; // 로그아웃 후 로그인 페이지로 이동
    }

    // 다른 에러는 그대로 throw
    return Promise.reject(error);
  }
);

export default api;
