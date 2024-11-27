import { sendResetPasswordLink } from '$lib/db/user.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	resetPassword: async({ request }) => {
		const data = await request.formData()
		const email = data.get('email')

		await sendResetPasswordLink(email)

		// Send back success message regardless if successful or not.
		redirect(303, '/reset-password?success=true');
	}
}