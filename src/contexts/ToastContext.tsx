"use client";

import React, { createContext, useContext } from 'react';
import { toast as sonnerToast } from 'sonner';

interface ToastContextType {
    toast: typeof sonnerToast;
    success: (message: string, options?: { duration?: number }) => void;
    error: (message: string, options?: { duration?: number }) => void;
    warning: (message: string, options?: { duration?: number }) => void;
    info: (message: string, options?: { duration?: number }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const success = (message: string, options?: { duration?: number }) => {
        sonnerToast.success(message, {
            duration: options?.duration || 5000,
        });
    };

    const error = (message: string, options?: { duration?: number }) => {
        sonnerToast.error(message, {
            duration: options?.duration || 5000,
        });
    };

    const warning = (message: string, options?: { duration?: number }) => {
        sonnerToast.warning(message, {
            duration: options?.duration || 5000,
        });
    };

    const info = (message: string, options?: { duration?: number }) => {
        sonnerToast.info(message, {
            duration: options?.duration || 5000,
        });
    };

    return (
        <ToastContext.Provider value={{
            toast: sonnerToast,
            success,
            error,
            warning,
            info
        }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
