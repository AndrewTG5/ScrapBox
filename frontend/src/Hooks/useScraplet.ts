import { useState, useEffect } from 'react';
import { Scraplet } from '../Models/Scraplet';
import { getScraplets, createScraplet } from '../Services/ScrapletService';

export const useScraplet = () => {
    const [scraplets, setScraplets] = useState<Scraplet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchScraplets();
    }, []);

    const fetchScraplets = () => {
        getScraplets()
            .then((data) => {
                setScraplets(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }   

    const addScraplet = async (scraplet: Scraplet) => {
        try {
            const newScraplet = await createScraplet(scraplet);
            setScraplets([...scraplets, newScraplet]);
            fetchScraplets();
        } catch (error: any) {
            setError(error.message);
        }
    };

    return {
        scraplets,
        loading,
        error,
        addScraplet,
    };
}