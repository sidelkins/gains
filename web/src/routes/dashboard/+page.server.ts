import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { env } from '$env/dynamic/public'
import type { NutritionEntry } from "$lib/types";

export const load = (async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    } else {
        const res = await event.fetch(`${env.PUBLIC_API_URL}/nutrition/entries/today`, {
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