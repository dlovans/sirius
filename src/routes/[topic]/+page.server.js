import { error } from '@sveltejs/kit';
import { getTopic } from '$lib/db/topic.js';
import { getVersesByLangCode } from '$lib/db/verse.js';

export async function load({ params, cookies }) {
	const userID = cookies.get('userID')
	const topicID = params.topic
	let langCode = cookies.get('langCode')
	if (langCode === 'undefined' || langCode === undefined) {
		langCode = 'en';
	}

	const verses = await getVersesByLangCode(langCode)

	if (!userID) {
		throw error(401, 'Unauthorized.')
	}
	const userTopic = await getTopic(topicID)

	if (userTopic.status !== 200) {
		throw error(userTopic.status, userTopic.message)
	}

	return {
		topicID: userTopic.id,
		topicTitle: userTopic.topicTitle,
		topicContent: userTopic.content,
		// topicVerses: userTopic.verses,
		verses: verses,
		langCode
	}

}