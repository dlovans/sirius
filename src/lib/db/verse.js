import { db } from '$lib/db/firebase.js'
import { collection, query, where, getDocs } from 'firebase/firestore'

/**
 * Gets all verse documents from database.
 * @param languageCode - Language code, for example, "en" for English.
 * @returns {object} - Status code and data.
 */
export async function getVersesByLangCode(languageCode) {
	const q = query(collection(db, 'verses'), where('langCode', '==', languageCode))

	try {
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			return {
				status: 404,
				message: "Couldn't find specified documents."
			}
		}

		const verses = querySnapshot.docs.map(doc => doc.data())

		return {
			status: 200,
			data: verses
		}
	} catch (error) {
		return {
			status: 500,
			message: error.message
		}
	}
}