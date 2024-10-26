<script>
	import Navbar from '$lib/ui/Navbar.svelte';

	let { data = [] } = $props()
</script>

<Navbar boards={ data.boards } />