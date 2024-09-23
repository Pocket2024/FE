import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false, // 로그인 여부를 나타내는 상태
  login: () => set({ isLoggedIn: true }), // 로그인 액션
  logout: () => set({ isLoggedIn: false }), // 로그아웃 액션
}));

export default useAuthStore;
