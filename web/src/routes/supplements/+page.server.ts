import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { SupplementEntry } from "$lib/types";
import env from "$env/static/public";

export const load = (async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    } else {
        const res = await event.fetch(`${env.PUBLIC_API_URL}/supplement`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${event.cookies.get('jwt')}`
            }
        });
        if (!res.ok) {
            console.error('Failed to fetch supplement entries');
            return { status: 500 };
        } else {
            const entries = (await res.json()) as SupplementEntry[];
            return {
                props: {
                    entries
                }
            };
        }
    }
}) satisfies PageServerLoad;