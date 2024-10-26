import { supabase } from '$lib/db/supabase.js';

export async function createBoard(userId, boardTitle) {
	let { data: boards, error } = await supabase
		.from('boards')
		.insert([
			{ owner: userId, title: boardTitle }
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

export async function getBoards(userId) {
	let { data: boards, error } = await supabase
	.from('boards')
		.select('*')
		.eq('owner', userId)

	if (error) {
		console.error('Error fetching boards: ', error);
		return {
			success: false,
			message: 'An error occurred while fetching boards.',
			boards: []
		}
	}

	return {
		success: true,
		message: 'Successfully retrieved boards',
		boards: boards
	}
}