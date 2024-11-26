import { db } from '$lib/db/firebase.js'
import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { isAuthenticated } from '$lib/db/user.js';
import { getTopic } from '$lib/db/topic.js';

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

		const verses = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));

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

/**
 * Updates a verse.
 * @param verseId - Verse ID in database.
 * @param updatedContent - Updated verse content.
 * @returns - If successful.
 */
export async function updateVerseById(verseId, updatedContent) {
	try {
		const isAuthorized = await isAuthenticated()

		if (isAuthorized.status !== 200) {
			return {
				status: 404,
				message: "Could not update verse."
			}
		}

		if (!isAuthorized.isAuthenticated || !isAuthorized.isAdmin) {
			return {
				status: 401,
				message: "Unauthorized user. Verse was not updated."
			}
		}

		const docRef = doc(db, 'verses', verseId)
		const docSnap = await getDoc(docRef)

		if (!docSnap.exists()) {
			return {
				status: 422,
				message: "Could not find verse to be updated."
			}
		}

		const data = docSnap.data()
		const { isMutable } = data

		if (!isMutable) {
			return {
				status: 403,
				message: "Cannot change specific verse."
			}
		}

		await updateDoc(docRef, { content: updatedContent })

		return {
			status: 200,
			message: "Verse successfully updated."
		}


	} catch (error) {
		console.error(error.message)
		return {
			status: 500,
			message: error.message
		}
	}
}

/**
 * Adds verse to the topic verse collection.
 * @param verseId - ID of verse to be added to topic verse collection.
 * @param topicId - ID of topic to be updated.
 * @returns - If successful.
 */
export async function addVerseToTopic(verseId, topicId) {
	try {
		const topic = await getTopic(topicId)
		if (topic.status !==200) {
			return {
				status: topic.status,
				message: topic.message
			}
		}

		if (Array.isArray(topic.verses) && topic.verses.length !== 0) {
			for (const verse of topic.verses) {
				if (verseId === verse) {
					return {
						status: 409,
						message: "Verse already in collection."
					};
				}
			}
		}


		const docRef = doc(db, 'topics', topicId)
		await updateDoc(docRef, { verses: arrayUnion(verseId) })

		return {
			status: 200,
			message: `Verse successfully added to topic with ID: ${topicId}.`
		}


	} catch (error) {
		console.error(error.message)
		return {
			status: 500,
			message: error.message
		}
	}
}