import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./login/$types";

export const load = (async (event) => {
	if (event.locals.user) {
		return redirect(302, '/dashboard');
	}
}) satisfies PageServerLoad;

// export const actions: Actions = {
// 	logout: async (event) => {
// 		let token = event.cookies.get('jwt');

// 		if (!token) {
// 			return;
// 		}

// 		// Delete the JWT cookie
// 		event.cookies.delete('jwt', { path: '/' });

// 		return redirect(302, '/');
// 	},
// }