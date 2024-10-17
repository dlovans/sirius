<script>
	import VerseView from '$lib/ui/VerseView/VerseView.svelte'

	export let verses;
</script>

<div class="flex flex-col w-full">
	{#each verses as verse}
		<VerseView verseNumber={verse.number} verseText={verse.text} id={verse.id} />
	{/each}
</div>