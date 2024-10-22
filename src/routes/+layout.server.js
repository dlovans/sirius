export async function load({ cookies }) {
	const isLoggedIn = cookies.get('isLoggedIn') || false
	const userID = cookies.get('userID') || null
	const isAdmin = cookies.get('isAdmin') || false

	return {
		userID,
		isLoggedIn,
		isAdmin
	}
}