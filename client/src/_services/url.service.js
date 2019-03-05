import { authHeader } from '../_helpers';

var apiUrl = "http://localhost:4000";

export const urlService = {
    create,
    getOne,
    getAll
};

function create(originalUrl, alias) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ originalUrl: originalUrl, alias: alias }),
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${apiUrl}/urls/new`, requestOptions).then(handleResponse);
}

function getOne(hash) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/urls/${hash}`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/urls`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}