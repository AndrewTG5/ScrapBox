import { useHookstate } from '@hookstate/core';
import { Scraplet } from '../Models/Scraplet';
import {getScraplets, createScraplet, updateScraplet, deleteScraplet, getScraplet} from '../Services/ScrapletService';
import {useEffect} from "react";

export const useScraplet = () => {
    const scraplets = useHookstate<Scraplet[]>([]);
    const openScraplet = useHookstate<Scraplet | null>(null);
    const loading = useHookstate<boolean>(true);
    const error = useHookstate<string>("");

    useEffect(() => {
        fetchScraplets()
    }, []);

    const fetchScraplets = () => {
        loading.set(true);
        getScraplets()
            .then((data) => {
                scraplets.set(data);
                loading.set(false);
                error.set("");
            })
            .catch((e) => {
                error.set(e.message);
                loading.set(false);
            });
    }

    const fetchScrapletById = (id: number) => {
        loading.set(true);
        getScraplet(id)
            .then((data) => {
                openScraplet.set(data);
                loading.set(false);
            })
            .catch((e) => {
                error.set(e.message);
                loading.set(false);
            });
    };

    const addScraplet = (scraplet: Scraplet) => {
        loading.set(true);
        createScraplet(scraplet)
            .then(() => {
                fetchScraplets();
            })
            .catch((e) => {
                error.set(e.message);
                loading.set(false);
            });
    };

    const putScraplet = (scraplet: Scraplet) => {
        loading.set(true);
        updateScraplet(scraplet)
            .then(() => {
                fetchScraplets();
            })
            .catch((e) => {
                error.set(e.message);
                loading.set(false);
            });
    }

    const deleteScrapletById = (id: number) => {
        loading.set(true);
        return deleteScraplet(id)
            .then(() => {
                fetchScraplets()
            })
            .catch((e) => {
                error.set(e.message);
                loading.set(false);
            });
    }

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