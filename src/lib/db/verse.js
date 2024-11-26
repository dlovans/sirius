import { db } from '$lib/db/firebase.js'
import { collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'
import { isAuthenticated } from '$lib/db/user.js';

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

		await setDoc(docRef, { content: updatedContent }, { merge: true })

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