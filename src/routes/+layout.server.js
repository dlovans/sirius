export async function load({ cookies }) {
	const isLoggedIn = cookies.get('isLoggedIn') || false
	const isAdmin = cookies.get('isAdmin') || false

	return {
		isLoggedIn,
		isAdmin
	}
}