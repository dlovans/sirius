<script>
import Book from '$lib/ui/Book/Book.svelte';
import NavbarSpacer from '$lib/ui/NavbarSpacer.svelte';
import Navbar from '$lib/ui/Navbar.svelte';

let { data } = $props()
console.log(data)
</script>

<Navbar isAuthorized={data.isAuthorized} isAdmin={data.isAdmin} topics={data.topics} />
<div class="relative h-full w-auto top-16 z-0 flex flex-row overflow-hidden">
	<NavbarSpacer />
	<div class="p-1 xl:px-7 flex flex-col gap-2 w-full overflow-hidden">
		<h2 class="w-full text-xl py-2 px-4 bg-emerald-400 rounded-md">Topic: {data.topicTitle}</h2>
		<div class="flex flex-row gap-2 overflow-x-auto w-full h-[83svh] snap-mandatory snap-x">
			<div class="w-[98vw] h-full flex-shrink-0 lg:flex-shrink snap-center relative">
				<Book data={data} isAddable />
			</div>
			<div class="w-[98vw] h-full flex-shrink-0 lg:flex-shrink snap-center">
				<Book data={data} isAddable />
			</div>
			<div class="w-[98vw] h-full flex-shrink-0 lg:flex-shrink snap-center">
				<Book data={data} isAddable />
			</div>
		</div>
	</div>
</div>
