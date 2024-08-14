import axios from "axios";

const interceptToken = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshTokenInterval = null;

const refreshTokens = async () => {
  const token = localStorage.getItem("Bearer ");
  const refreshToken = localStorage.getItem("RefreshToken");

  try {
    const response = await axios.post("/api/Auth/RefreshToken", {
      token,
      refreshToken,
    });
    localStorage.setItem("Bearer ", response.data.token);
    localStorage.setItem("RefreshToken", response.data.refreshToken);
    return response.data.accessToken;
  } catch (err) {
    console.error("Failed to refresh token", err);
    localStorage.removeItem("Bearer ");
    localStorage.removeItem("RefreshToken");
    window.location.href = '/login';
    throw err;
  }
};

interceptToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Bearer ");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interceptToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshTokens();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return interceptToken(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const startAutoRefresh = () => {
  const refreshToken = localStorage.getItem("RefreshToken");
  if (refreshToken) {
    refreshTokenInterval = setInterval(refreshTokens, 180 * 1000);
  }
};

export const stopAutoRefresh = () => {
  if (refreshTokenInterval) {
    clearInterval(refreshTokenInterval);
  }
};

export default interceptToken;