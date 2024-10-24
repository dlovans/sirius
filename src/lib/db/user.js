import { supabase } from '$lib/db/supabase.js';

/**
 * Checks if user exists.
 * @param userID - User ID.
 * @returns {object} - If database querying was successful.
 */
export async function userExists(userID) {
	let { data: users, error } = await supabase
		.from('users')
		.select('id')
		.eq('auth_user_id', userID)
		.limit(1)

	if (error) {
		console.error('Error checking if user exists: ', error)
		return {
			success: false,
			message: 'An error occurred while checking user existence.',
			userRowId: null
		}
	}

	if (users.length > 0) {
		return {
			success: true,
			message: 'User found',
			userRowId: users[0]['id']
		}
	} else {
		return {
			success: false,
			message: 'User not found',
			userRowId: null
		}
	}
}