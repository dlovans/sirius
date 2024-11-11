import { redirect, fail, error } from '@sveltejs/kit';
import { createTopic } from '$lib/db/topic.js'
import { findUser } from '$lib/db/user.js'
import { getVersesByLangCode } from '$lib/db/verse.js';

export async function load({ cookies }) {
		 return await getVersesByLangCode(cookies.get('langCode') || 'en');
}

export const actions = {
	createTopicAction: async ({ cookies, request }) => {
		const data = await request.formData();
		const topicTitle = data.get('title');
		const userID = cookies.get('userID');

		if (!topicTitle) {
			return fail(400, {message: 'Topic title is required!'})
		}
		if (!userID) {
			throw error(401, 'Unauthorized! Login or sign up to create a topic.')
		}

		const user = await findUser(userID);

		if (!user.userRowId) {
			throw error(401, user.message)
		}
		if (!user.success) {
			throw error(500, user.message)
		}

		const result = await createTopic(user.id, topicTitle)

		if (!result.success) {
			throw error(500, result.message)
		}
		if (!result.topicID) {
			return fail(503, { message: 'Successfully created topic. Missing topic data. Refresh page.'})
		}

		redirect(303,`/${result.topicID}`)
	}
}