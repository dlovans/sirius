import { supabase } from '$lib/db/supabase.js';
import { userExists } from '$lib/db/user.js';

export async function createBoard(userID, boardTitle) {
	const findUser = await userExists(userID);
	if (!findUser.success) {
		return {
			success: false,
			message: 'Failed to find user',
			boardID: null,
		}
	}

	let { data: boards, error } = await supabase
		.from('boards')
		.insert([
			{ owner: findUser.userRowId, title: boardTitle }
		])
		.select()

	if (error) {
		console.error('Error creating board: ', error);
		return {
			success: false,
			message: 'An error occurred while creating board',
			boardID: null,
		}
	}

	return {
		success: true,
		message: 'Successfully created board',
		boardID: boards[0]['id']
	}
}