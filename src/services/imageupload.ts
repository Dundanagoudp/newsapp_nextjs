// imageService.ts

// Utility function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null; // For SSR compatibility
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

// Utility function to get token from storage
function getAuthToken(): string | null {
  // Check localStorage first
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) return token;
  }
  
  // Fallback to cookies
  return getCookie('authToken');
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export interface UploadedImage {
  _id: string;
  url: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface UploadResponse {
  success: boolean;
  data: {
    id: string;
    url: string;
  };
  error?: string;
}

export interface GetAllImagesResponse {
  success: boolean;
  count: number;
  data: UploadedImage[];
}

export class ImageUploadError extends Error {
  status?: number;
  details?: any;

  constructor(message: string, status?: number, details?: any) {
    super(message);
    this.name = 'ImageUploadError';
    this.status = status;
    this.details = details;
  }
}
export interface UploadedImage {
  _id: string;
  url: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface GetAllImagesResponse {
  success: boolean;
  count: number;
  data: UploadedImage[];
}

export const imageService = {
  async uploadImage(file: File, token?: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("image", file);

    const headers: Record<string, string> = {
      'Accept': 'application/json'
    };
    
    // Get token from parameters or storage
    const authToken = token || getAuthToken();
    
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    } else {
      throw new ImageUploadError('Authentication token is required', 401);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/image/upload`, {
        method: "POST",
        body: formData,
        headers,
        credentials: 'include',
      });

      if (res.status === 401) {
        throw new ImageUploadError(
          'Session expired. Please login again.',
          401,
          { requiresLogin: true }
        );
      }

      const data = await res.json();
      
      if (!res.ok) {
        throw new ImageUploadError(
          data.message || `Upload failed with status ${res.status}`,
          res.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ImageUploadError) throw error;
      if (error instanceof Error) {
        throw new ImageUploadError(error.message);
      }
      throw new ImageUploadError('Unknown upload error occurred');
    }
  },

  async getAllImages(token?: string): Promise<UploadedImage[]> {
    const headers: Record<string, string> = {
      'Accept': 'application/json'
    };
    
    const authToken = token || getAuthToken();
    
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/image`, { 
        headers,
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new ImageUploadError(
          errorData.message || 'Failed to fetch images',
          res.status,
          errorData
        );
      }

      const response: GetAllImagesResponse = await res.json();
      return response.data;
    } catch (error) {
      if (error instanceof ImageUploadError) throw error;
      if (error instanceof Error) {
        throw new ImageUploadError(error.message);
      }
      throw new ImageUploadError('Unknown fetch error occurred');
    }
  },

  getImageUrl(id: string): string {
    return `${API_BASE_URL}/image/${id}`;
  },

  async deleteImage(id: string, token?: string): Promise<void> {
    const headers: Record<string, string> = {
      'Accept': 'application/json'
    };
    
    // Get token from parameters or storage
    const authToken = token || getAuthToken();
    
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    } else {
      throw new ImageUploadError('Authentication token is required', 401);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/image/${id}`, {
        method: "DELETE",
        headers,
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new ImageUploadError(
          errorData.message || `Failed to delete image with status ${res.status}`,
          res.status,
          errorData
        );
      }
    } catch (error) {
      if (error instanceof ImageUploadError) throw error;
      if (error instanceof Error) {
        throw new ImageUploadError(error.message);
      }
      throw new ImageUploadError('Unknown delete error occurred');
    }
  }
};