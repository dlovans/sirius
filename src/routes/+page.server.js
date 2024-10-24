import { redirect, fail, error } from '@sveltejs/kit';
import { createBoard } from '$lib/db/board.js'
import { userExists } from '$lib/db/user.js'

export const actions = {
	createBoard: async ({ cookies, request }) => {
		const data = await request.formData();
		const boardTitle = data.get('title');
		const userID = cookies.get('userID');

		if (!boardTitle) {
			return fail(400, {message: 'Board title is required!'})
		}

		if (!userID) {
			throw error(401, 'Unauthorized! Login or sign up to create a board.')
		}

		const user = await userExists(userID);

		if (!user.success) {
			throw error(500, 'Something went wrong! Could not create board.')
		}

		if (!user.userExists) {
			throw error(401, 'Unauthorized user. Login or sign up to create a board.')
		}

		const result = await createBoard(userID, boardTitle)

		if (!result.success) {
			throw error(500, 'Something went wrong! Could not create board.')
		}

		if (!result.boardID) {
			return fail(503, { message: 'Successfully created board. Missing board data. Refresh page.'})
		}

		redirect(303,`/${result.boardID}`)
	}
}