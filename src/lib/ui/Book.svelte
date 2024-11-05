<script>
	import BookMenu from '$lib/ui/BookMenu.svelte';
	import Verse from '$lib/ui/Verse.svelte';

	let { verses = [], isAddable = false, isMutable = false } = $props()
</script>

<BookMenu />
<div class="flex flex-col gap-1 items-center">
	{#each verses as verse}
		<Verse id={verse.id} isAddable={isAddable} isMutable={isMutable} chapterNo={verse.chapterNo} verseNo={verse.verseNo} content={verse.content} />
	{/each}
</div>