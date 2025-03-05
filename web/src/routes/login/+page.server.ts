import { fail } from "@sveltejs/kit";

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
		const identifier = formData.get('identifier');
		const password = formData.get('password');

		const loginFetch = await event.fetch('http://192.168.1.69:3000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ identifier, password })
		});

        if (loginFetch.status === 200) {
            // handle successful login
        } else if (loginFetch.status === 401) {
            return fail(401, {
                message: 'unauthorized'
            });
        }
    }
}