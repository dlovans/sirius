import { getAuth } from 'firebase/auth';
import { collection, addDoc, doc, serverTimestamp, getDocs, query, where, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '$lib/db/firebase.js';
import { isAuthenticated } from '$lib/db/user.js';


/**
 * Creates a topic.
 * @param topicTitle - Title of topic.
 * @returns {object} - Topic ID and status.
 */
export async function createTopic(topicTitle) {
	try {
		const auth = getAuth()
		const user = auth.currentUser
		if (!user) {
			return {
				status: 401,
				message: "Unauthorized user. Login to create a topic."
			}
		}

		const topicRef = await addDoc(collection(db, 'topics'), {
			topicOwner: user.uid,
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
		const auth = getAuth()
		const user = auth.currentUser
		if (!user) {
			return {
				status: 401,
				message: "Unauthorized user. Login to read topic."
			}
		}
		const docRef = doc(db, 'topics', topicId)
		const docSnap = await getDoc(docRef)
		const data = docSnap.data()

		if (docSnap.exists()) {
			if (user.uid !== data.topicOwner) {
				return {
					status: 401,
					message: "Unauthorized user. User is not authorized to read topic."
				}
			}

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
			message: "Could not fetch user topic."
		}
	}
}

/**
 * Get all user-created topics.
 * @returns {object} - Topics data.
 */
export async function getUserTopics() {
	try {
		const auth = getAuth()
		const user = auth.currentUser

		if (!user) {
			return {
				status: 401,
				message: "Unauthorized user. Login to read topics."
			}
		}

		const q = query(collection(db, 'topics'), where('topicOwner', '==', user.uid))
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

/**
 * Updates a topic title or analysis content.
 * @param topicId - ID of topic to be updated.
 * @param content - The content.
 * @param updateType 'topicTitle' | 'content' - Whether to update title or analysis content.
 * @returns - Operation status.
 */
export async function updateTopic(topicId, content, updateType) {
	try {
		const isAuthorized = await isAuthenticated()
		if (isAuthorized.status !== 200) {
			return {
				status: isAuthorized.status,
				message: isAuthorized.message
			}
		}

		const topic = await getTopic(topicId)
		if (topic.status !== 200) {
			return {
				status: topic.status,
				message: topic.message
			}
		}

		if (topic.data.topicOwner !== isAuthorized.id) {
			return {
				status: 401,
				message: "Unauthorized user. Topic does not belong to this account."
			}
		}

		const topicRef = doc(db, 'topics', topicId)
		if (updateType === 'topicTitle') {
			if (!content.length) {
				return {
					status: 409,
					message: "Topic title cannot be empty!"
				}
			}
			await updateDoc(topicRef, { topicTitle: content })
		} else if (updateType === 'analysis') {
			await updateDoc(topicRef, { content: content })
		}

		return {
			status: 200,
			message: "Topic successfully updated."
		}

	} catch (error) {
		console.error(error.message)
		return {
			status: 500,
			message: "Failed to update topic."
		}
	}
}