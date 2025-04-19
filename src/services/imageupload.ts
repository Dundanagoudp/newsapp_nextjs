const API_BASE_URL = process.env.NEXT_BACKEND_URL || 'http://localhost:4000';

export interface UploadedImage {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}


export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    url: string;
    path: string;
    filename: string;
  };
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

export const imageService = {
  async uploadImage(file: File, token?: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("image", file); // Changed from "file" to "image"

    const headers: Record<string, string> = {
      'Accept': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/image/upload`, {
        method: "POST",
        body: formData,
        headers,
        credentials: 'include',
      });

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

  async getImageById(id: string, token?: string): Promise<UploadedImage> {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/image/${id}`, { 
        headers,
        credentials: 'include', 
      });

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch (e) {
          throw new ImageUploadError(`Fetch failed with status ${res.status}`, res.status);
        }
        throw new ImageUploadError(
          errorData.message || `Failed to fetch image with status ${res.status}`,
          res.status
        );
      }

      return await res.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new ImageUploadError(error.message);
      }
      throw new ImageUploadError('Unknown fetch error occurred');
    }
  },

  async getAllImages(token?: string): Promise<UploadedImage[]> {
    const headers: Record<string, string> = {
      'Accept': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/image`, { 
        headers,
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch images');
      }

      return await res.json();
    } catch (error) {
      console.error('Fetch images error:', error);
      throw error;
    }
  },

  getImageUrl(id: string): string {
    return `${API_BASE_URL}/image/${id}`;
  }

};