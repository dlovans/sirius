<script>
	import Navbar from '$lib/ui/Navbar.svelte';
	import Book from '$lib/ui/Book/Book.svelte';

	let { data = [] } = $props()
</script>

<Navbar boards={ data.boards } />
<div class="relative h-full w-auto top-16 z-0 flex flex-row mx-5">
	<div class="hidden w-[300px] h-full xl:flex"></div>
	<Book verses={data} />
</div>
