"use client";

import { useEffect, useRef } from 'react';
import { useApolloClient } from '@apollo/client/react';
import { useAuthContext } from '../contexts/AuthContext';

export const useAuthState = () => {
    const client = useApolloClient();
    const { isAuthenticated, user } = useAuthContext();
    const previousUserRef = useRef<string | null>(null);
    const isInitializedRef = useRef(false);

    useEffect(() => {
        const currentUserId = user?.id || null;
        const previousUserId = previousUserRef.current;

        if (!isInitializedRef.current) {
            isInitializedRef.current = true;
            previousUserRef.current = currentUserId;
            return;
        }

        if (currentUserId !== previousUserId) {
            if (currentUserId && previousUserId) {
                const clearCacheAndRefetch = async () => {
                    try {
                        const activeQueries = client.getObservableQueries();
                        if (activeQueries.size > 0) {
                            await Promise.all(
                                Array.from(activeQueries.values()).map(query =>
                                    new Promise(resolve => {
                                        if (query.getCurrentResult().loading) {
                                            const unsubscribe = query.subscribe({
                                                next: (result) => {
                                                    if (!result.loading) {
                                                        unsubscribe.unsubscribe();
                                                        resolve(result);
                                                    }
                                                },
                                                error: () => {
                                                    unsubscribe.unsubscribe();
                                                    resolve(null);
                                                }
                                            });
                                        } else {
                                            resolve(query.getCurrentResult());
                                        }
                                    })
                                )
                            );
                        }

                        await client.resetStore();

                        await client.refetchQueries({
                            include: 'active',
                        });
                    } catch (error) {
                        console.warn('Error clearing store:', error);
                    }
                };

                clearCacheAndRefetch();
            } else if (currentUserId && !previousUserId) {
                const clearCacheAndRefetch = async () => {
                    try {
                        await client.resetStore();
                        await client.refetchQueries({
                            include: 'active',
                        });
                    } catch (error) {
                        console.warn('Error clearing store:', error);
                    }
                };

                clearCacheAndRefetch();
            }

            previousUserRef.current = currentUserId;
        }
    }, [isAuthenticated, user?.id, client]);

    return {
        isAuthenticated,
        user,
    };
};
