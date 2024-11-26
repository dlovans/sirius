<script>
	import Navbar from '$lib/ui/Navbar.svelte';
	import Book from '$lib/ui/Book/Book.svelte';
	import NavbarSpacer from '$lib/ui/NavbarSpacer.svelte';

	let { data = [] } = $props()
</script>

<Navbar isAuthorized={data.isAuthorized} isAdmin={data.isAdmin} topics={data.topics} />
<div class="relative h-full w-auto top-16 z-0 flex flex-row mx-5 overflow-auto">
	<NavbarSpacer />
	<Book data={data} isEditable />
</div>
