const BASE_URL = import.meta.env.VITE_API_URL

export const api = {
    post: async <T>(endpoint: string, body: unknown, token?: string): Promise<T> => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            const errorJson = await res.json();
            const error = new Error(errorJson.error ?? 'Something went wrong') as any;
            error.email = errorJson.email;
            throw error;
        }

        return res.json()
    },

    get: async <T>(endpoint: string, token?: string): Promise<T> => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error ?? 'Something went wrong')
        }

        return res.json()
    },

    put: async <T>(endpoint: string, body: unknown, token?: string): Promise<T> => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error ?? 'Something went wrong')
        }

        return res.json()
    },

    patch: async <T>(endpoint: string, body: unknown, token?: string): Promise<T | null> => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify(body)
        })
        
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error ?? 'Something went wrong')
        }

        if (res.status === 204) return null;

        return res.json()
    },

    delete: async (endpoint: string, token?: string, body?: unknown): Promise<void> => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                ...(body ? { 'Content-Type': 'application/json' } : {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error ?? 'Something went wrong')
        }
    }
}