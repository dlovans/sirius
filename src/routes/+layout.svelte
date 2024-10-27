<script>
	import "../app.css";

	import { isAdmin, userID } from '$lib/stores/auth.js';

	let { data, children } = $props();

</script>

{@render children?.()}