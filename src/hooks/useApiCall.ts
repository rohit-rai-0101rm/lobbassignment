// src/hooks/useApiCall.ts
import { useEffect, useState } from 'react';

type UseApiCallOptions<P> = {
    call: (params?: P) => Promise<any>;
    params?: P;
    immediate?: boolean;
};

export const useApiCall = <T = any, P = void>({
    call,
    params,
    immediate = true,
}: UseApiCallOptions<P>) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(immediate);

    const execute = async (customParams?: P) => {
        setLoading(true);
        try {
            const response = await call(customParams ?? params);

            console.log("response", response)
            setData(response);
            setError(null);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, []);

    return { data, error, loading, refetch: execute };
};
