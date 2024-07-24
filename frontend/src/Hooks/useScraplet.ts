import {useEffect, useState} from 'react';
import { Scraplet } from '../Models/Scraplet';
import { getScraplet, getScraplets, createScraplet, updateScraplet, deleteScraplet } from '../Services/ScrapletService';

export const useScraplet = () => {
    const [scraplets, setScraplets] = useState<Scraplet[]>([]);
    const [openScraplet, setOpenScraplet] = useState<Scraplet | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchScraplets()
    }, []);

    const fetchScraplets = () => {
        setLoading(true);
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
    
    const fetchScrapletById = async (id: number) => {
        setLoading(true);
        getScraplet(id)
            .then((data) => {
                setOpenScraplet(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    const addScraplet = async (scraplet: Scraplet) => {
        setLoading(true);
        createScraplet(scraplet)
            .then(() => {
                fetchScraplets();
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    const putScraplet = async (scraplet: Scraplet) => {
        setLoading(true);
        updateScraplet(scraplet)
            .then(() => {
                fetchScraplets();
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    const deleteScrapletById = async (id: number) => {
        setLoading(true);
        deleteScraplet(id)
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    console.log(scraplets);

    return {
        scraplets,
        openScraplet,
        loading,
        error,
        fetchScraplets,
        fetchScrapletById,
        addScraplet,
        putScraplet,
        deleteScrapletById,
    };
}