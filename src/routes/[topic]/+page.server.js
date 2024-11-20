import { error } from '@sveltejs/kit';
import { getTopic } from '$lib/db/topic.js';

export async function load({ params, cookies }) {
	const userID = cookies.get('userID')
	const topicID = params.slug
	if (!userID) {
		throw error(401, 'Unauthorized.')
	}
	const userTopic = await getTopic(userID, topicID)

	if (userTopic.status !== 200) {
		throw error(userTopic.status, userTopic.message)
	}

	return {
		topicID: userTopic.id,
		topicTitle: userTopic.title,
		topicContent: userTopic.content,
		topicVerses: userTopic.verses
	}

}