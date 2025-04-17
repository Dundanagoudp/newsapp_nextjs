const API_BASE_URL = process.env.NEXT_BACKEND_URL || 'http://localhost:4000';

interface Name {
    firstname: string;
    lastname: string;
  }
  
  interface User {
    id: string;
    fullname: Name;
    email: string;
  }
  
  interface RegisterRequest {
    fullname: Name;
    email: string;
    password: string;
  }
  
  interface LoginRequest {
    email: string;
    password: string;
  }
  
  interface AuthResponse {
    message: string;
    token: string;
    user: User;
  }
  

  export const authService = {
    async register(userData: RegisterRequest): Promise<AuthResponse> {
      try {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }
  
        const data: AuthResponse = await response.json();
        this.storeToken(data.token);
        return data;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
  
    async login(credentials: LoginRequest): Promise<AuthResponse> {
      try {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }
  
        const data: AuthResponse = await response.json();
        this.storeToken(data.token);
        return data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
  
    storeToken(token: string): void {
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
      }
    },
  
    getToken(): string | null {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
      }
      return null;
    },
  
    clearToken(): void {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
    },
  };
  
