import { redirect, fail, error } from '@sveltejs/kit';
import { createBoard } from '$lib/db/board.js'
import { findUser } from '$lib/db/user.js'

export const actions = {
	createBoardAction: async ({ cookies, request }) => {
		const data = await request.formData();
		const boardTitle = data.get('title');
		const userID = cookies.get('userID');

		if (!boardTitle) {
			return fail(400, {message: 'Board title is required!'})
		}
		if (!userID) {
			throw error(401, 'Unauthorized! Login or sign up to create a board.')
		}

		const user = await findUser(userID);

		if (!user.userRowId) {
			throw error(401, user.message)
		}
		if (!user.success) {
			throw error(500, user.message)
		}

		const result = await createBoard(user.id, boardTitle)

		if (!result.success) {
			throw error(500, result.message)
		}
		if (!result.boardID) {
			return fail(503, { message: 'Successfully created board. Missing board data. Refresh page.'})
		}

		redirect(303,`/${result.boardID}`)
	}
}