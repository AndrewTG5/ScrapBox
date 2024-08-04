import {Scraplet, newScraplet} from '../Models/Scraplet';

const apiUrl = 'http://192.168.1.1:5000/api/scraplets';

export const getScraplets = async (): Promise<Scraplet[]> => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const getScraplet = async (id: number): Promise<Scraplet> => {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const createScraplet = async (scraplet: newScraplet): Promise<Scraplet> => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scraplet)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const updateScraplet = async (scraplet: Scraplet): Promise<void> => {
    const response = await fetch(`${apiUrl}/${scraplet.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scraplet)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export const deleteScraplet = async (id: number): Promise<void> => {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
