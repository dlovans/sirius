import { findUser } from '$lib/db/user.js';
import { collection, addDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '$lib/db/firebase.js';


/**
 * Creates a topic.
 * @param userId - ID of user creating topic.
 * @param topicTitle - Title of topic.
 * @returns {object} - Topic ID and status.
 */
export async function createTopic(userId, topicTitle) {
	try {
		const user = await findUser(userId)

		if (user.status !== 200) {
			return {
				status: 401,
				message: "Unauthorized user."
			}
		}

		const topicRef = await addDoc(collection(db, 'topics'), {
			topicOwner: doc(db, 'users', userId),
			topicTitle: topicTitle,
			verses: [],
			content: "",
			lastUpdated: serverTimestamp()
		})

		return {
			status: 200,
			topicID: topicRef.id
		}
	} catch(error) {
		return {
			status: 500,
			message: "Something went wrong."
		}
	}
}

export async function getTopic(userId) {

}