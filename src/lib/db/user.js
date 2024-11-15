import { db } from '$lib/db/firebase.js'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Checks if user exists.
 * @param userId - User ID.
 * @returns {object} - If database querying was successful.
 */
export async function findUser(userId) {
	try {
		const docRef = doc(db, 'users', userId)
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return {
				status: 200,
				message: "User exists",
				isAdmin: docSnap.data().isAdmin
			}
		} else {
			return {
				status: 422,
				message: "User does not exist"
			}
		}
	} catch (error) {
		return {
			status: 500,
			message: "Something went wrong!"
		}
	}

}

/**
 * Authenticates user.
 * @param email {String} - Email of user.
 * @param password {String} - Password of user.
 * @returns {object} - Status and data for cookies.
 */
export async function signInUser(email, password){
	const auth = getAuth();
	try {
		const userCredentials = await signInWithEmailAndPassword(auth, email, password)
		const userDoc = await findUser(userCredentials.user.uid)

		return {
			status: 200,
			userID: userCredentials.user.uid,
			isAdmin: userDoc.isAdmin
		}
	} catch(error) {
		return {
			status: 422,
			message: "Invalid email or password."
		}
	}
}