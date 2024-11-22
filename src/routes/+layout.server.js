import { error } from '@sveltejs/kit';
import { getUserTopics } from '$lib/db/topic.js';
import { isAuthenticated } from '$lib/db/user.js';

export async function load() {
	const userAuthorization = await isAuthenticated()

	if (userAuthorization.isAuthenticated) {
		const topics = await getUserTopics()

		if (topics.status !== 200) {
			throw error(topics.status, topics.message)
		}

		return {
			isAuthorized: userAuthorization.isAuthenticated,
			isAdmin: userAuthorization.isAdmin,
			topics: topics.data
		}
	}

	return {
		isAuthorized: userAuthorization.isAuthenticated,
		isAdmin: userAuthorization.isAdmin,
		topics: []
	}
}

