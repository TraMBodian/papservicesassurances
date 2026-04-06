// API Client for backend communication
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    this.timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  // Authentication methods
  async login(credentials: { email: string; password: string }) {
    return this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    fullName: string;
    role: string;
    organization?: string;
  }) {
    return this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request<{ user: any }>('/auth/me');
  }

  // User management
  async getUsers() {
    return this.request<{ users: any[] }>('/users');
  }

  async updateUser(id: string, userData: any) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Assures
  async getAssures() {
    return this.request<{ assures: any[] }>('/assures');
  }

  async createAssure(assureData: any) {
    return this.request('/assures', {
      method: 'POST',
      body: JSON.stringify(assureData),
    });
  }

  async updateAssure(id: string, assureData: any) {
    return this.request(`/assures/${id}`, {
      method: 'PUT',
      body: JSON.stringify(assureData),
    });
  }

  async deleteAssure(id: string) {
    return this.request(`/assures/${id}`, {
      method: 'DELETE',
    });
  }

  // Polices
  async getPolices() {
    return this.request<{ polices: any[] }>('/polices');
  }

  async createPolice(policeData: any) {
    return this.request('/polices', {
      method: 'POST',
      body: JSON.stringify(policeData),
    });
  }

  // Sinistres
  async getSinistres() {
    return this.request<{ sinistres: any[] }>('/sinistres');
  }

  async createSinistre(sinistreData: any) {
    return this.request('/sinistres', {
      method: 'POST',
      body: JSON.stringify(sinistreData),
    });
  }

  // Prestataires
  async getPrestataires() {
    return this.request<{ prestataires: any[] }>('/prestataires');
  }

  async createPrestataire(prestataireData: any) {
    return this.request('/prestataires', {
      method: 'POST',
      body: JSON.stringify(prestataireData),
    });
  }

  // Consultations
  async getConsultations() {
    return this.request<{ consultations: any[] }>('/consultations');
  }

  async createConsultation(consultationData: any) {
    return this.request('/consultations', {
      method: 'POST',
      body: JSON.stringify(consultationData),
    });
  }

  // Prescriptions
  async getPrescriptions() {
    return this.request<{ prescriptions: any[] }>('/prescriptions');
  }

  async createPrescription(prescriptionData: any) {
    return this.request('/prescriptions', {
      method: 'POST',
      body: JSON.stringify(prescriptionData),
    });
  }
}

export const apiClient = new ApiClient();