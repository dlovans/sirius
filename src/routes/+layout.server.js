import { findUser } from '$lib/db/user.js';
import { getBoards } from '$lib/db/topic.js';

export async function load({ cookies }) {
	const userID = cookies.get('userID') || null
	const isAdmin = cookies.get('isAdmin') || false
}

