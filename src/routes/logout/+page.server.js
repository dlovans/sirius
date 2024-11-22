import { redirect } from '@sveltejs/kit';
import { signOutUser } from '$lib/db/user.js';

export async function load() {
	const loggedOut = await signOutUser()
}