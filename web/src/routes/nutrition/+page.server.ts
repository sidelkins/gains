import { json, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { NutritionEntry } from "$lib/types";
import { env } from '$env/dynamic/public'

export const load = (async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    } else {
        const res = await event.fetch(`${env.PUBLIC_API_URL}/nutrition`, {
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

        const res = await event.fetch(`${env.PUBLIC_API_URL}/nutrition`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${event.cookies.get('jwt')}`
            },
            body: JSON.stringify(data)
        });

        const response = await res.json();
		
        return response;
    },
    delete: async (event) => {
        const formData = await event.request.formData();
		const idsToDelete = (formData.get('ids') as string).split(',');
        if (!idsToDelete || idsToDelete.length === 0) {
            return { status: 400, body: { error: 'No IDs provided for deletion' } };
        }

        try {
            const res = await event.fetch(`${env.PUBLIC_API_URL}/nutrition`, {
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
    },
    analyze: async (event) => {
        const formData = await event.request.formData();
        
        // Extract the file from form data
        const file = formData.get('file') as File;

        if (!file) {
            return { status: 400, body: { error: 'No file uploaded' } };
        }

        // Prepare the form data for FastAPI
        const fastApiFormData = new FormData();
        fastApiFormData.append('file', file);
        
        // Send the image to FastAPI for classification
        const fastApiRes = await event.fetch(`http://127.0.0.1:8000/classify/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${event.cookies.get('jwt')}`,
            },
            body: fastApiFormData
        });

        if (!fastApiRes.ok) {
            return { status: 500, body: { error: 'Failed to classify the image' } };
        }

        // Parse the response from FastAPI
        const classificationData = await fastApiRes.json();

        // Return the classification data back to the client
        return {
            status: 200,
            body: {
                classification: classificationData
            }
        };
    },
};