import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

/**
 * Checks if user exists.
 * @param userId - User ID.
 * @returns {object} - If database querying was successful.
 */
export async function findUser(userId) {

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

		// TODO: Call findUser to get if user is admin.
		return {
			status: 200,
			userID: userCredentials.user.uid,
			isAdmin: true
		}
	} catch(error) {
		return {
			status: 422,
			message: "Invalid email or password."
		}
	}
}