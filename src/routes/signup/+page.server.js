import { createUser, findUserByEmail } from '$lib/db/user.js';
import { error, fail } from '@sveltejs/kit';

export const actions = {
	signup: async ({ cookies, request }) => {
		const data = await request.formData()
		const email = data.get('email')
		const password = data.get('password')

		const userExists = await findUserByEmail(email)

		if (userExists.status !== 200) {
			throw error(500, 'Something went wrong!')
		}

		if (userExists.userExists) {
			return fail(409, { message: 'User already exists' })
		}

		const user = await createUser(email, password)

		if (user.status !== 200) {
			throw error(500, 'Something went wrong!')
		}

		cookies.set('email', user.userID)
		cookies.set('isAdmin', user.isAdmin)
	}
}