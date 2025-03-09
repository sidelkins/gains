import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/public'

export const authHook: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('jwt');

    if (token) {
        try {
            // Verify token on server
            const verifyToken = await fetch(`${env.PUBLIC_API_URL}/verify`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (verifyToken.ok) {
                const { user } = await verifyToken.json();
                event.locals.authenticated = true;
                event.locals.user = user;
                // event.locals.token = token; // Store it in locals to make it available in session and load functions
            } else {
                event.cookies.delete('jwt', { path: '/', secure: event.url.protocol === 'https:' });
            }
        } catch (err) {
            console.error('Error during token verification:', err);
        }
    } else {
        event.locals.authenticated = false;
        event.locals.user = null;
        //event.locals.token = null;
    }
    
    return await resolve(event);
};

export const handle = sequence(authHook);