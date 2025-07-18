// API Service Layer - Demonstrates architectural separation of concerns

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication API methods
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  // User API methods
  async getCurrentUser() {
    return this.request('/users/me');
  }

  async updateUserProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async updateUserPreferences(preferences) {
    return this.request('/users/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  async getUserSavedRecipes() {
    return this.request('/users/saved-recipes');
  }

  async getUserCreatedRecipes() {
    return this.request('/users/created-recipes');
  }

  // Recipe API methods
  async getRecipes(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/recipes?${queryParams}` : '/recipes';
    return this.request(endpoint);
  }

  async getRecipeById(id) {
    return this.request(`/recipes/${id}`);
  }

  async createRecipe(recipeData) {
    return this.request('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipeData),
    });
  }

  async updateRecipe(id, recipeData) {
    return this.request(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipeData),
    });
  }

  async deleteRecipe(id) {
    return this.request(`/recipes/${id}`, {
      method: 'DELETE',
    });
  }

  async saveRecipe(recipeId) {
    return this.request(`/recipes/${recipeId}/save`, {
      method: 'POST',
    });
  }

  async unsaveRecipe(recipeId) {
    return this.request(`/recipes/${recipeId}/unsave`, {
      method: 'DELETE',
    });
  }

  // Rating and Review API methods
  async getRecipeRatings(recipeId) {
    return this.request(`/recipes/${recipeId}/ratings`);
  }

  async addRecipeRating(recipeId, ratingData) {
    return this.request(`/recipes/${recipeId}/ratings`, {
      method: 'POST',
      body: JSON.stringify(ratingData),
    });
  }

  async updateRecipeRating(recipeId, ratingId, ratingData) {
    return this.request(`/recipes/${recipeId}/ratings/${ratingId}`, {
      method: 'PUT',
      body: JSON.stringify(ratingData),
    });
  }

  async deleteRecipeRating(recipeId, ratingId) {
    return this.request(`/recipes/${recipeId}/ratings/${ratingId}`, {
      method: 'DELETE',
    });
  }

  // Search and Filter API methods
  async searchRecipes(query, filters = {}) {
    const searchParams = {
      q: query,
      ...filters,
    };
    const queryString = new URLSearchParams(searchParams).toString();
    return this.request(`/recipes/search?${queryString}`);
  }

  async getRecipeCategories() {
    return this.request('/recipes/categories');
  }

  async getRecipeTags() {
    return this.request('/recipes/tags');
  }

  async getDietaryOptions() {
    return this.request('/recipes/dietary-options');
  }

  // Social Features API methods
  async shareRecipe(recipeId, shareData) {
    return this.request(`/recipes/${recipeId}/share`, {
      method: 'POST',
      body: JSON.stringify(shareData),
    });
  }

  async getRecipeComments(recipeId) {
    return this.request(`/recipes/${recipeId}/comments`);
  }

  async addRecipeComment(recipeId, commentData) {
    return this.request(`/recipes/${recipeId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  async updateRecipeComment(recipeId, commentId, commentData) {
    return this.request(`/recipes/${recipeId}/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(commentData),
    });
  }

  async deleteRecipeComment(recipeId, commentId) {
    return this.request(`/recipes/${recipeId}/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  // Analytics and Insights API methods
  async getRecipeAnalytics(recipeId) {
    return this.request(`/recipes/${recipeId}/analytics`);
  }

  async getUserAnalytics() {
    return this.request('/users/analytics');
  }

  async getPopularRecipes(period = 'week') {
    return this.request(`/recipes/popular?period=${period}`);
  }

  async getTrendingRecipes() {
    return this.request('/recipes/trending');
  }

  // File Upload API methods
  async uploadRecipeImage(recipeId, imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.request(`/recipes/${recipeId}/image`, {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData
        'Authorization': this.token ? `Bearer ${this.token}` : '',
      },
      body: formData,
    });
  }

  async uploadUserAvatar(imageFile) {
    const formData = new FormData();
    formData.append('avatar', imageFile);

    return this.request('/users/avatar', {
      method: 'POST',
      headers: {
        'Authorization': this.token ? `Bearer ${this.token}` : '',
      },
      body: formData,
    });
  }

  // Notification API methods
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/read-all', {
      method: 'PUT',
    });
  }

  async updateNotificationPreferences(preferences) {
    return this.request('/notifications/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  // Error handling utility
  handleError(error) {
    if (error.status === 401) {
      // Unauthorized - redirect to login
      this.setToken(null);
      window.location.href = '/login';
    } else if (error.status === 403) {
      // Forbidden - show access denied message
      throw new Error('Access denied. You do not have permission to perform this action.');
    } else if (error.status >= 500) {
      // Server error - show generic error message
      throw new Error('Server error. Please try again later.');
    } else {
      // Other errors - re-throw the original error
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();

export default apiService;

// Export individual methods for convenience
export const {
  login,
  register,
  logout,
  getCurrentUser,
  updateUserProfile,
  updateUserPreferences,
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  saveRecipe,
  unsaveRecipe,
  addRecipeRating,
  searchRecipes,
  shareRecipe,
  uploadRecipeImage,
  getNotifications,
} = apiService; 