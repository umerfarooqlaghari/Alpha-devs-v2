const fs = require('fs');
const path = require('path');

const content = `'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    const checkUser = useCallback(async () => {
        try {
            const res = await fetch(\`\${API_URL}/auth/me\`, {
                credentials: 'include',
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error checking user', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        checkUser();
    }, [checkUser]);

    const login = async (email: string, password: string) => {
        const res = await fetch(\`\${API_URL}/auth/login\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            router.refresh();
            router.push('/admin/dashboard');
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Login failed');
        }
    };

    const logout = async () => {
        await fetch(\`\${API_URL}/auth/logout\`, {
            method: 'POST',
            credentials: 'include',
        });
        setUser(null);
        router.refresh();
        router.push('/admin/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
`;

const filePath = path.join('c:', 'Users', 'Umer Farooq', 'Desktop', 'Alpha-devs', 'alpha-devs-v2', 'frontend', 'hooks', 'useAuth.ts');
console.log('Writing to:', filePath);
fs.writeFileSync(filePath, content, 'utf8');
console.log('File written successfully.');
