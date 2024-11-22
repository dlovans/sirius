import { db } from '$lib/db/firebase.js'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, query, setDoc, collection, where, getDocs, limit } from 'firebase/firestore';

/**
 * Authenticates user.
 * @param email {String} - Email of user.
 * @param password {String} - Password of user.
 * @returns {object} - Status and data for cookies.
 */
export async function signInUser(email, password){
	try {
		const auth = getAuth()
		const userCredentials = await signInWithEmailAndPassword(auth, email, password)
		const userAuthorization = await isAuthenticated()

		if (!userAuthorization.isAuthenticated) {
			return {
				status: 500,
				message: "Could not log in user."
			}
		}

		const docRef = doc(db, 'users', userCredentials.user.uid)
		const docSnap = await getDoc(docRef)
		const userData = docSnap.data()

		return {
			status: 200,
			userID: userCredentials.user.uid,
			isAdmin: userData.isAdmin
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
		const q = query(
			collection(db, 'users'),
			where('email', '==', email),
			limit(1)
		)
		const querySnapshot = await getDocs(q)


		if (!querySnapshot.empty) {
			return {
				status: 409,
				message: `User with email ${email} already exists.`
			}
		}

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
		console.error(error.code, error.message)
		return {
			status: 500,
			message: "Error creating user!"
		}
	}
}


/**
 * Signs out user authenticated with Firebase.
 */
export async function signOutUser() {
	const auth = getAuth()
	try {
		await signOut(auth)
		return true
	} catch(error) {
		console.error(error)
		return false
	}
}


/**
 * Checks if user is authenticated.
 * @returns - Data if user is authenticated and admin authorization.
 */
export async function isAuthenticated() {
	const auth = getAuth()
	const user = auth.currentUser
	if (!user) {
		return {
			status: 200,
			isAuthenticated: false,
			isAdmin: false
		}
	}

	try {
		const docRef = doc(db, 'users', user.uid)
		const docSnap = await getDoc(docRef)
		const userData = docSnap.data()

		return {
			status: 200,
			isAuthenticated: true,
			isAdmin: userData.isAdmin
		}

	} catch(error) {
		return {
			status: 500,
			message: "Error while checking user authentication."
		}
	}
}