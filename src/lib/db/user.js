import { db } from '$lib/db/firebase.js'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, query, where, collection, getDocs, setDoc } from 'firebase/firestore';

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

/**
 * Creates a user in database.
 * @param email - User email.
 * @param password - User password.
 * @returns {object} - Status and cookie data.
 */
export async function createUser(email, password) {
	try {
		const auth = getAuth()
		const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

		await setDoc(doc(db, 'users', userCredentials.user.uid), {
			email: email,
			isAdmin: false
		})

		return {
			status: 200,
			userID: userCredentials.user.uid,
			isAdmin: false
		}

	} catch(error) {
		console.error(error)
		return {
			status: 500,
			message: "Something went wrong!"
		}
	}
}

/**
 * Finds user by email.
 * @param email - Email of user.
 * @returns {object} - Status and user existence.
 */
export async function findUserByEmail(email) {
	try {
		const q = query(collection(db, 'users'), where('email', '==', email))
		const querySnapshot = await getDocs(q)
		return {
			status: 200,
			userExists: !querySnapshot.empty
		}
	} catch(error) {
		return {
			status: 500,
			message: "Something went wrong!"
		}
	}
}
