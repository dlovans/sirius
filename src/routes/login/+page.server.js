import { signInUser } from '$lib/db/user.js';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
	signin: async ({ cookies, request }) => {
		const data = await request.formData()
		// TODO: Serverside basic validation, later.

		const response = await signInUser(data.get('email'), data.get('password'))

		if (response.status === 200) {
			redirect(303,'/')
		} else if (response.status === 422) {
			return fail(400, { message: response.message })
		} else {
			throw error(500, 'Something went wrong!')
		}
	}
}