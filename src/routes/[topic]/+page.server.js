import { error, fail, redirect } from '@sveltejs/kit';
import { createTopic, getTopic } from '$lib/db/topic.js';
import { addVerseToTopic, getVerseById, getVersesByLangCode } from '$lib/db/verse.js';
import { isAuthenticated } from '$lib/db/user.js';

export async function load({ params, cookies }) {
	const topicID = params.topic

	let langCode = cookies.get('langCode')
	if (langCode === 'undefined' || langCode === undefined) {
		langCode = 'en';
	}

	const verses = await getVersesByLangCode(langCode)
	const userAuthorization = await isAuthenticated()

	if (!userAuthorization.isAuthenticated) {
		throw error(401, 'Unauthorized.')
	}
	const userTopic = await getTopic(topicID)

	if (userTopic.status !== 200) {
		throw error(userTopic.status, userTopic.message)
	}

	const topicVerses = []

	if (userTopic.data.verses.length > 0) {
		for (const verseId of userTopic.data.verses) {
			topicVerses.push(await getVerseById(verseId))
		}
	}

	return {
		topicID,
		topicTitle: userTopic.data.topicTitle,
		topicContent: userTopic.data.content,
		topicVerses: topicVerses,
		verses: verses,
		langCode
	}

}

export const actions = {
	createTopic: async ({ request }) => {
		const data = await request.formData()
		const topicTitle = data.get('title')

		const userAuthorization = await isAuthenticated()

		if (!topicTitle) {
			return fail(400, {message: 'Topic title is required!'})
		}
		if (!userAuthorization.isAuthenticated) {
			throw error(401, 'Unauthorized! Login or sign up to create a topic.')
		}

		const result = await createTopic(topicTitle)

		if (result.status !== 200) {
			throw error(result.status, result.message)
		}

		redirect(303,`/${result.topicID}`)
	},
	updateLang: async ({ cookies, request }) => {
		const data = await request.formData();
		const langCode = data.get('langCode');
		cookies.set('langCode', langCode, { path: '/'});
	},
	addVerse: async ({ request, params }) => {
		const data = await request.formData()
		const verseId = data.get('verseId')
		const response = await addVerseToTopic(verseId, params.topic)

		if (response.status !== 200) {
			console.log(response.message)
		}
	}
}