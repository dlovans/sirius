<script>
	import "../app.css";

	import { user, isAdmin } from '$lib/stores/auth.js';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		user.set(data.isLoggedIn)
		isAdmin.set(data.isAdmin);
	})
</script>

<slot />