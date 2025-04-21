const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

// Define types for the API responses and product data
export type Product = {
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  stock: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type ProductCreatePayload = Omit<Product, '_id' | 'id' | 'createdAt' | 'updatedAt' | '__v'>;
export type ProductUpdatePayload = Partial<ProductCreatePayload>;

// Helper function for API calls
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
  token?: string
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }

  return response.json();
}

// Product API functions
export const productsApi = {
  // Get all products
  async getAllProducts(token?: string): Promise<ApiResponse<Product[]>> {
    return apiRequest<Product[]>('/products', 'GET', undefined, token);
  },

  // Get a single product by ID
  async getProductById(id: string, token?: string): Promise<ApiResponse<Product>> {
    return apiRequest<Product>(`/products/${id}`, 'GET', undefined, token);
  },

  // Create a new product
  async createProduct(productData: ProductCreatePayload, token?: string): Promise<ApiResponse<Product>> {
    return apiRequest<Product>('/products', 'POST', productData, token);
  },

  // Update a product
  async updateProduct(
    id: string,
    productData: ProductUpdatePayload,
    token?: string
  ): Promise<ApiResponse<Product>> {
    return apiRequest<Product>(`/products/${id}`, 'PUT', productData, token);
  },

  // Delete a product
  async deleteProduct(id: string, token?: string): Promise<ApiResponse<{ _id: string }>> {
    return apiRequest<{ _id: string }>(`/products/${id}`, 'DELETE', undefined, token);
  },
};