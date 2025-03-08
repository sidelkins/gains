import { json, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { NutritionEntry } from "$lib/types";

const API_URL = 'http://192.168.1.69:3000/api';

export const load = (async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    } else {
        const res = await event.fetch(API_URL + '/nutrition', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${event.cookies.get('jwt')}`
            }
        });
        if (!res.ok) {
            console.error('Failed to fetch nutrition entries');
            return { status: 500 };
        } else {
            const entries = (await res.json()) as NutritionEntry[];
            return {
                props: {
                    entries
                }
            };
        }
    }
}) satisfies PageServerLoad;

export const actions: Actions = {
    // Action to add a new nutrition entry
    add: async (event) => {
        const formData = await event.request.formData();

        const data = {
            date: formData.get('date'),
            description: formData.get('description'),
            calories: formData.get('calories'),
            protein: formData.get('protein'),
            carbs: formData.get('carbs'),
            fat: formData.get('fat')
        };

        const res = await event.fetch(API_URL + '/nutrition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${event.cookies.get('jwt')}`
            },
            body: JSON.stringify(data)
        });

        const response = await res.json();

        if (response.ok) {
            return { status: 200 };
        } else {
            return { status: 500, body: { error: 'Failed to add entry' } };
        }
    },

    // Action to delete selected nutrition entries
    delete: async (event) => {
        const formData = await event.request.formData();
        const idsToDelete = formData.getAll('ids') as string[]; // Get all IDs to delete

        if (!idsToDelete || idsToDelete.length === 0) {
            return { status: 400, body: { error: 'No IDs provided for deletion' } };
        }

        try {
            // Send a DELETE request to the API for all IDs at once
            const res = await event.fetch(API_URL + '/nutrition', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${event.cookies.get('jwt')}`
                },
                body: JSON.stringify({ ids: idsToDelete })
            });

            if (res.ok) {
                return { status: 200, body: { message: 'Entries deleted successfully' } };
            } else {
                return { status: 500, body: { error: 'Failed to delete entries' } };
            }
        } catch (error) {
            console.error('Error deleting entries:', error);
            return { status: 500, body: { error: 'Failed to delete entries' } };
        }
    }
};