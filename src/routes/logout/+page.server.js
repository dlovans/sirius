import { redirect } from '@sveltejs/kit';
import { signOutUser} from '$lib/db/user.js';

export async function load({ cookies }) {
	cookies.delete('userID', { path: '/'})
	cookies.delete('isAdmin', { path: '/' })
	await signOutUser()

	redirect(303, '/')
}