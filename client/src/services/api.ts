import { apiRequest } from "@/lib/queryClient";
import { type LoginData, type RegisterData } from "@shared/schema";

export const authApi = {
  login: async (data: LoginData) => {
    const response = await apiRequest("POST", "/api/auth/login", data);
    return response.json();
  },

  register: async (data: RegisterData) => {
    const response = await apiRequest("POST", "/api/auth/register", data);
    return response.json();
  },
};

export const centersApi = {
  getAll: async () => {
    const response = await apiRequest("GET", "/api/centers");
    return response.json();
  },

  getUserCenters: async (userId: string) => {
    const response = await apiRequest("GET", `/api/user-centers/${userId}`);
    return response.json();
  },

  addUserCenter: async (userId: string, centerId: string) => {
    const response = await apiRequest("POST", "/api/user-centers", { userId, centerId });
    return response.json();
  },

  removeUserCenter: async (userId: string, centerId: string) => {
    const response = await apiRequest("DELETE", `/api/user-centers/${userId}/${centerId}`);
    return response.json();
  },
};

export const notificationsApi = {
  getNotifications: async (userId: string) => {
    const response = await apiRequest("GET", `/api/notifications/${userId}`);
    return response.json();
  },

  markAsRead: async (notificationId: string) => {
    const response = await apiRequest("PATCH", `/api/notifications/${notificationId}/read`);
    return response.json();
  },

  getSentCount: async () => {
    const response = await apiRequest("GET", "/api/notifications/sent-count");
    return response.json();
  },
};

export const usersApi = {
  getUser: async (userId: string) => {
    const response = await apiRequest("GET", `/api/users/${userId}`);
    return response.json();
  },

  updateUser: async (userId: string, updates: any) => {
    const response = await apiRequest("PATCH", `/api/users/${userId}`, updates);
    return response.json();
  },
};
