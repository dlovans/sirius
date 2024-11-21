import { redirect } from '@sveltejs/kit';
import * as path from 'node:path';

export async function load({ cookies }) {
	cookies.delete('userID', { path: '/'})
	cookies.delete('isAdmin', { path: '/' })

	redirect(303, '/')
}