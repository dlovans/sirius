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

		if (!user) {
			throw error(401, 'Unauthorized user. Login or sign up to create a board.')
		}

		const result = await createBoard(userID, boardTitle)

		if (!result) {
			return fail(500, { message: "Something went wrong! Couldn't create a board." })
		}

		redirect(303,`/${result.boardID}`)
	}
}