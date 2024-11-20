import { findUser } from '$lib/db/user.js';
import { collection, addDoc, doc, serverTimestamp, getDocs, query, where } from 'firebase/firestore'
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

/**
 * Get all user-created topics.
 * @param userId - User ID stored in session.
 * @returns {object} - Topics data.
 */
export async function getUserTopics(userId) {
	try {
		const q = query(collection(db, 'topics'), where('topicOwner', '==', userId))
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			return {
				status: 200,
				data: []
			}
		}

		const topics = querySnapshot.docs.map((doc) =>  (
			{
				id: doc.id,
				...doc.data()
			}
		))

		return {
			status: 200,
			data: topics
		}
	} catch (error) {
		return {
			status: 500,
			message: "Something went wrong."
		}
	}
}