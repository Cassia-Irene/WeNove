import { 
    ApiResponse, 
    RegisterRequest, 
    LoginRequest, 
    UserResponse,
    CreateProductRequest,
    UpdateProductRequest,
    ProductResponse,
    ProductFilters,
    CreateStoreRequest,
    UpdateStoreRequest,
    StoreResponse,
    StoreFilters
} from "./api.types"

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = 'http://localhost:8080/api') {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string, 
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${endpoint}`;
        
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        console.log('Request:', url, config);
        console.log('Request body:', config.body);

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // Authentication methods
    async register(userData: RegisterRequest): Promise<ApiResponse<UserResponse>> {
        return this.request<UserResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async login(credentials: LoginRequest): Promise<ApiResponse<UserResponse>> {
        return this.request<UserResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async getUserByUuid(uuid: string): Promise<ApiResponse<UserResponse>> {
        return this.request<UserResponse>(`/auth/${uuid}`);
    }

    async getUserByEmail(email: string): Promise<ApiResponse<UserResponse>> {
        return this.request<UserResponse>(`/auth/email/${email}`);
    }

    // Métodos de produtos
    async createProduct(data: CreateProductRequest): Promise<ApiResponse<ProductResponse>> {
        return this.request<ProductResponse>('/products', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async getProduct(uuid: string): Promise<ApiResponse<ProductResponse>> {
        return this.request<ProductResponse>(`/products/${uuid}`);
    }

    async getAllProducts(filters?: ProductFilters): Promise<ApiResponse<ProductResponse[]>> {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    params.append(key, value.toString());
                }
            });
        }
        const queryString = params.toString();
        const url = queryString ? `/products?${queryString}` : '/products';
        return this.request<any[]>(url);
    }

    async searchProducts(name: string): Promise<ApiResponse<ProductResponse[]>> {
        const queryParams = new URLSearchParams({ name });
        return this.request<ProductResponse[]>(`/products/search?${queryParams.toString()}`);
    }

    async updateProduct(uuid: string, productData: UpdateProductRequest): Promise<ApiResponse<ProductResponse>> {
        return this.request<ProductResponse>(`/products/${uuid}`, {
            method: 'PUT',
            body: JSON.stringify(productData),
        });
    }

    async deleteProduct(uuid: string): Promise<ApiResponse<string>> {
        return this.request<string>(`/products/${uuid}`, {
            method: 'DELETE',
        });
    }

    // Métodos de lojas
    async createStore(data: CreateStoreRequest): Promise<ApiResponse<StoreResponse>> {
        return this.request<StoreResponse>('/stores', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async getStore(uuid: string): Promise<ApiResponse<StoreResponse>> {
        return this.request<StoreResponse>(`/stores/${uuid}`);
    }

    async getAllStores(filters?: StoreFilters): Promise<ApiResponse<any[]>> {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    params.append(key, value.toString());
                }
            });
        }
        const queryString = params.toString();
        const url = queryString ? `/stores?${queryString}` : '/stores';
        return this.request<any[]>(url);
    }

    async getStoresByOwner(ownerUuid: string): Promise<ApiResponse<StoreResponse[]>> {
        try {
            const response = await this.getAllStores();
            if (response.success && response.data) {
                const userStores = response.data.filter((store: any) => store.ownerUuid === ownerUuid);
                return {
                    success: true,
                    data: userStores,
                    message: response.message
                };
            }
            return {
                success: true,
                data: [],
                message: 'Nenhuma loja encontrada'
            };
        } catch (error) {
            return {
                success: false,
                data: [],
                message: error instanceof Error ? error.message : 'Erro ao buscar lojas'
            };
        }
    }

    async getStoreByName(name: string) : Promise<ApiResponse<StoreResponse>> {
        return this.request<StoreResponse>(`/stores/name/${name}`);
    }

    async updateStore(uuid: string, storeData: UpdateStoreRequest): Promise<ApiResponse<StoreResponse>> {
        return this.request<StoreResponse>(`/stores/${uuid}`, {
            method: 'PUT',
            body: JSON.stringify(storeData),
        });
    }

    async deleteStore(uuid: string): Promise<ApiResponse<string>> {
        return this.request<string>(`/stores/${uuid}`, {
            method: 'DELETE',
        });
    }
}

// Export a default instance
const apiClient = new ApiClient();
export default apiClient;

// Export the class for custom instances
export { ApiClient };

// Helper functions for easier usage
export async function getProductById(uuid: string): Promise<ProductResponse | null> {
    try {
        const response = await apiClient.getProduct(uuid);
        return response.success ? response.data : null;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
    }
}

export async function getStoreById(uuid: string): Promise<StoreResponse | null> {
    try {
        const response = await apiClient.getStore(uuid);
        return response.success ? response.data : null;
    } catch (error) {
        console.error('Erro ao buscar loja:', error);
        return null;
    }
}

export async function getStoreByName(name: string): Promise<StoreResponse | null> {
    try {
        const response = await apiClient.getStoreByName(name);
        return response.success ? response.data : null;
    } catch (error) {
        console.error('Erro ao buscar loja:', error);
        return null;
    }
}

export async function getProductsByStore(storeName: string): Promise<ProductResponse[]> {
    try {
        const response = await apiClient.getStoreByName(storeName);
        if (response.success && response.data.products) {
            return response.data.products;
        }
        return [];
    } catch (error) {
        console.error('Erro ao buscar produtos da loja:', error);
        return [];
    }
}