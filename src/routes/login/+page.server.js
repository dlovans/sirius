import { signInUser } from '$lib/db/user.js';

export const actions = {
	signin: async ({ cookies, request }) => {
		const data = await request.formData()
		// TODO: Serverside basic validation, later.

		const response = await signInUser(data.get('email'), data.get('password'))
	}
}