import { findUser } from '$lib/db/user.js';
import { collection, addDoc, doc, serverTimestamp, getDocs, query, where, getDoc } from 'firebase/firestore';
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
			topicOwner: userId,
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

/**
 * Get topic data.
 * @param topicId - Topic ID of topic to retrieve.
 * @returns {object} - Topic data.
 */
export async function getTopic(topicId) {
	try {
		const docRef = doc(db, 'topics', topicId)
		const docSnap = await getDoc(docRef)
		const data = docSnap.data()

		if (docSnap.exists()) {
			const topic = {
				...data,
				lastUpdated: data.lastUpdated.toDate().toISOString()
			}
			return {
				status: 200,
				data: topic
			}
		} else {
			return {
				status: 422,
				message: "Data not found."
			}
		}
	} catch(error) {
		return {
			status: 500,
			message: "Something went wrong."
		}
	}
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
				...doc.data(),
			}
		))

		const updatedTopics = topics.map(topic => (
			{
				...topic,
				lastUpdated: topic.lastUpdated.toDate().toISOString()
			}
		))

		return {
			status: 200,
			data: updatedTopics
		}
	} catch (error) {
		return {
			status: 500,
			message: "Something went wrong."
		}
	}
}