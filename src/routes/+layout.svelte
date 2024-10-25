<script>
	import "../app.css";

	import { isLoggedIn, isAdmin, userID } from '$lib/stores/auth.js';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	onMount(() => {
		isLoggedIn.set(data.isLoggedIn)
		isAdmin.set(data.isAdmin)
		userID.set(data.userID)
	})
</script>

{@render children?.()}