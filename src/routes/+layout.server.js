import { findUser } from '$lib/db/user.js';
import { getBoards } from '$lib/db/board.js';

export async function load({ cookies }) {
	const isLoggedIn = cookies.get('isLoggedIn') || false
	const userID = cookies.get('userID') || null
	const isAdmin = cookies.get('isAdmin') || false

	if (userID) {
		const userResponse = await findUser(userID);

		if (!userResponse.success) {
			return {
				user: null,
				boards: [],
				userID,
				isLoggedIn,
				isAdmin
			}
		}

		const boardsResponse = await getBoards(userResponse.userRowId)

		if (!boardsResponse) {
			return {
				user: userResponse.success,
				boards: []
			}
		}

		return {
			user: userResponse.success,
			boards: boardsResponse.boards
		}

	}
}

