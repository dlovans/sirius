<script>
import Book from '$lib/ui/Book/Book.svelte';
import NavbarSpacer from '$lib/ui/NavbarSpacer.svelte';
import Navbar from '$lib/ui/Navbar.svelte';

let { data = [] } = $props()
</script>

<Navbar userID={data.userID} isAdmin={data.isAdmin} topics={data.topics} />
<div class="relative h-full w-auto top-16 z-0 flex flex-row mx-5">
	<NavbarSpacer />
	<Book verses={data} />
</div>
