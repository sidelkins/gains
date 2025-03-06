import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (event.locals.authenticated) {
		return {
            authenticated: event.locals.authenticated,
			user: event.locals.user,
			token: event.locals.token
		};
	}
	return {
        authenticated: false,
		user: null,
		token: null
	};
};