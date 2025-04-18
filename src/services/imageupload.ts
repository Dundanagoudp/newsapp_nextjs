const API_BASE_URL = process.env.NEXT_BACKEND_URL || 'http://localhost:4000';

export interface UploadedImage {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  createdAt: string;
}

export interface UploadResponse {
  message: string;
  image: {
    id: string;
    url: string;
    path: string;
  };
}

interface ApiError {
  message: string;
  status?: number;
}

export class ImageUploadError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ImageUploadError';
    this.status = status;
  }
}

export const imageService = {
  async uploadImage(file: File, token?: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const headers: Record<string, string> = {};
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

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch (e) {
          throw new ImageUploadError(`Upload failed with status ${res.status}`, res.status);
        }
        throw new ImageUploadError(
          errorData.message || `Image upload failed with status ${res.status}`,
          res.status
        );
      }

      return await res.json();
    } catch (error) {
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
        credentials: 'include', // if using cookies
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
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/image`, { 
        headers,
        credentials: 'include', // if using cookies
      });

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch (e) {
          throw new ImageUploadError(`Fetch failed with status ${res.status}`, res.status);
        }
        throw new ImageUploadError(
          errorData.message || `Failed to fetch all images with status ${res.status}`,
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
};