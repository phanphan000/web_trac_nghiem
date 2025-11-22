import API from "./api";

// Token helpers
export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

// Đăng ký
export const register = async (data) => {
    const res = await API.post("/register", data);
    return res.data;
};

// Đăng nhập
export const login = async (data) => {
    const res = await API.post("/login", data);
    setToken(res.data.token);
    return res.data;
};

// Đăng xuất
export const logout = async () => {
    try {
        await API.post("/logout");
    } finally {
        removeToken();
    }
};

// Lấy thông tin user hiện tại
export const getMe = async () => {
    try {
        const res = await API.get("/me");
        return res.data;
    } catch (err) {
        removeToken();
        throw err;
    }
};
