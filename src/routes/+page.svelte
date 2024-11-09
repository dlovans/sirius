<script>
	import Navbar from '$lib/ui/Navbar.svelte';
	import Book from '$lib/ui/Book/Book.svelte';

	let { data = [] } = $props()
</script>

<Navbar boards={ data.boards } />
<div class="relative h-full w-full top-16 z-0">
	<Book />
</div>
