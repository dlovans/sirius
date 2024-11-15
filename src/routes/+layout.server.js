export async function load({ cookies }) {
	const userID = cookies.get('userID') || null
	const isAdmin = cookies.get('isAdmin') || false

	if (userID) {
		const topics = await getUserTopics(userID)

		if (topics.status !== 200) {
			throw error(topics.status, topics.message)
		}

		return {
			userID,
			isAdmin,
			topics: topics.data
		}
	}

	return {
		userID,
		isAdmin,
		topics: []
	}
}

