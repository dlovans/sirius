import { redirect, fail, error } from '@sveltejs/kit';
import { createTopic } from '$lib/db/topic.js'
import { findUser } from '$lib/db/user.js'
import { getVersesByLangCode } from '$lib/db/verse.js';

export async function load({ request, cookies }) {
	let langCode = cookies.get('langCode')
	if (langCode === 'undefined' || langCode === undefined) {
		langCode = 'en';
	}

	const verses = await getVersesByLangCode(langCode)

	return {
			verses: verses,
			langCode
	}
}

export const actions = {
	createTopic: async ({ cookies, request }) => {
		const data = await request.formData();
		const topicTitle = data.get('title');
		const userID = cookies.get('userID');

		if (!topicTitle) {
			return fail(400, {message: 'Topic title is required!'})
		}
		if (!userID) {
			console.log(userID)
			throw error(401, 'Unauthorized! Login or sign up to create a topic.')
		}

		const user = await findUser(userID);

		if (user.status === 422) {
			throw error(401, "Unauthorized! Login or sign up to create a topic.")
		}
		if (user.status !== 200) {
			throw error(500, "Something went wrong!")
		}

		const result = await createTopic(userID, topicTitle)

		if (result.status !== 200) {
			throw error(500, result.message)
		}

		redirect(303,`/${result.topicID}`)
	},
	updateLang: async ({ cookies, request }) => {
		const data = await request.formData();
		const langCode = data.get('langCode');
		cookies.set('langCode', langCode, { path: '/'});
	}
}