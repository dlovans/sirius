<script>
import Book from '$lib/ui/Book/Book.svelte';
import NavbarSpacer from '$lib/ui/NavbarSpacer.svelte';
import Navbar from '$lib/ui/Navbar.svelte';
import Analysis from '$lib/ui/Book/Analysis.svelte';

let { data } = $props()
</script>

<Navbar isAuthorized={data.isAuthorized} isAdmin={data.isAdmin} topics={data.topics} />
<div class="relative w-auto top-16 xl:top-0 xl:h-[100svh] z-0 flex flex-row overflow-hidden">
	<NavbarSpacer />
	<div class="p-1 xl:px-4 flex flex-col gap-2 w-full overflow-hidden">
		<div class="w-full text-xl py-2 px-4 bg-emerald-400 rounded-md flex flex-col lg:flex-row gap-1">
			<div class="flex flex-nowrap gap-1 items-center lg:mr-auto w-full">
				<h2 class="text-stone-900">Topic:</h2>
				<textarea value={data.topicTitle} class="text-stone-900 w-full bg-transparent text-nowrap h-min resize-none" rows="1"></textarea>
			</div>
			<form action="?/updateTopicName">
				<input type="hidden" name="topicTitle" value={data.topicTitle} />
				<input type="hidden" name="topicId" value={data.topicId} />
				<button type="submit" class="px-3 py-1 rounded-md bg-blue-500 w-24">Update</button>
			</form>
			<form action="?/deleteTopic">
				<input type="hidden" name="topicId" value={data.topicId} />
				<button type="submit" class="px-3 py-1 rounded-md bg-red-400 w-24">Delete</button>
			</form>
		</div>
		<div class="flex flex-row gap-2 overflow-x-auto w-full h-[75svh] lg:h-[85svh] xl:h-full snap-mandatory snap-x">
			<div class="w-[98vw] xl:w-[50vw] flex-shrink-0 lg:flex-shrink snap-center flex flex-col gap-2">
				<h3 class="text-center w-full bg-emerald-200 text-stone-900 rounded-md">Add verses for analysis</h3>
				<Book data={data} isAddable />
			</div>
			<div class="w-[98vw] xl:w-[50vw] flex-shrink-0 lg:flex-shrink snap-center flex flex-col gap-2">
				<h3 class="text-center w-full bg-emerald-200 text-stone-900 rounded-md">Verses for analysis</h3>
				<Book data={data} isRemovable />
			</div>
			<div class="w-[98vw] xl:w-[100vw] flex-shrink-0 lg:flex-shrink snap-center flex flex-col gap-2">
				<h3 class="text-center w-full bg-emerald-200 text-stone-900 rounded-md">Analysis</h3>
				<Analysis analysisContent={data.analysis} />
			</div>
		</div>
	</div>
</div>
