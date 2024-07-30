import { useHookstate } from '@hookstate/core';
import { Scraplet, newScraplet } from '../Models/Scraplet';
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

    const getErrorMessage = (e: unknown) => {
        if (e instanceof Error) error.set(e.message);
        error.set(String(e));
        loading.set(false);
    }

    const fetchScraplets = async () => {
        loading.set(true);
        try {
            const data = await getScraplets();
            scraplets.set(data);
            loading.set(false);
            error.set("");
        } catch (e) {
            getErrorMessage(e);
        }
    }

    const fetchScrapletById = async (id: number) => {
        loading.set(true);
        try {
            const data = await getScraplet(id);
            openScraplet.set(data);
            loading.set(false);
        } catch (e) {
            getErrorMessage(e);
        }
    };

    const addScraplet = async (scraplet: newScraplet) => {
        loading.set(true);
        try {
            const newScraplet = await createScraplet(scraplet);
            await fetchScraplets();
            openScraplet.set(newScraplet);
            return newScraplet.id;
        } catch (e) {
            getErrorMessage(e);
            return -1;
        }
    };

    const putScraplet = async (scraplet: Scraplet) => {
        loading.set(true);
        try {
            await updateScraplet(scraplet);
            await fetchScraplets();
        } catch (e) {
            getErrorMessage(e);
        }
    }

    const deleteScrapletById = async (id: number) => {
        loading.set(true);
        try {
            await deleteScraplet(id);
            await fetchScraplets();
        } catch (e) {
            getErrorMessage(e);
        }
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