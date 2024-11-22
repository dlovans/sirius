import { createUser, findUserByEmail } from '$lib/db/user.js';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
	signup: async ({ cookies, request }) => {
		const data = await request.formData()
		const email = data.get('email')
		const password = data.get('password')

		const user = await createUser(email, password)

		if (user.status === 409) {
			return fail(409, { message: 'User already exists. Login instead.' })
		}

		if (user.status !== 200) {
			throw error(user.status, user.message)
		}

		redirect(303, '/')
	}
}