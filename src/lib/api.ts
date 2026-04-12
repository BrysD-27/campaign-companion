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
            const error = await res.json()
            throw new Error(error.error ?? 'Something went wrong')
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
    }
}