import { Scraplets } from '../Models/Scraplet';

const apiUrl = 'http://localhost:5210/api/scraplets';

export const getScraplets = async (): Promise<Scraplets[]> => {
    const response = await fetch(apiUrl);
    return await response.json();
}

export const getScraplet = async (id: number): Promise<Scraplets> => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}

export const createScraplet = async (scraplet: Scraplets): Promise<Scraplets> => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scraplet)
    });
    return await response.json();
}

export const updateScraplet = async (scraplet: Scraplets): Promise<Scraplets> => {
    const response = await fetch(`${apiUrl}/${scraplet.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scraplet)
    });
    return await response.json();
}

export const deleteScraplet = async (id: number): Promise<void> => {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
}
