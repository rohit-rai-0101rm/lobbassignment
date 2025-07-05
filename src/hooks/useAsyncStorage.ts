import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [loading, setLoading] = useState(true);

    // Load value on mount
    useEffect(() => {
        const load = async () => {
            try {
                const raw = await AsyncStorage.getItem(key);
                if (raw !== null) {
                    setStoredValue(JSON.parse(raw));
                }
            } catch (e) {
                console.error(`Failed to load ${key} from AsyncStorage`, e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [key]);

    const save = async (value: T) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            setStoredValue(value);
        } catch (e) {
            console.error(`Failed to save ${key}`, e);
        }
    };

    const remove = async () => {
        try {
            await AsyncStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (e) {
            console.error(`Failed to remove ${key}`, e);
        }
    };

    return {
        value: storedValue,
        save,
        remove,
        loading,
    };
};
