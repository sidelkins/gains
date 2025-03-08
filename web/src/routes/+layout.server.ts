import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (event.locals.authenticated) {
		return {
            authenticated: event.locals.authenticated,
			user: event.locals.user,
		};
	}
	return {
        authenticated: false,
		user: null
	};
};