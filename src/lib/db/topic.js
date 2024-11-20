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

/**
 * Get topic data.
 * @param topicId - Topic ID of topic to retrieve.
 * @returns {object} - Topic data.
 */
export async function getTopic(topicId) {
	try {
		const docRef = doc(db, 'topics', topicId)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			console.log(docSnap.data())
			return {
				status: 200,
				data: {
					id: doc.id,
					...docSnap.data()
				}
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