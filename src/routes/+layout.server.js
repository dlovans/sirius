export async function load({ cookies }) {
	const userID = cookies.get('userID') || null
	const isAdmin = cookies.get('isAdmin') || false

	return {
		userID,
		isAdmin,
		topics: []
	}
}

