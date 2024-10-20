<script>
	import VerseNumberView from '$lib/ui/VerseView/VerseDetailView.svelte';
	import TextVerseView from '$lib/ui/VerseView/VerseTextView.svelte';
	import VerseToggleView from '$lib/ui/VerseView/VerseToggleView.svelte';

	export let verseChapter;
	export let verseNumber;
	export let verseText;
	export let id;
	export let canDisable = false;
	export let displayView = true;
</script>

{#if displayView}
<div class="flex flex-row flex-nowrap w-auto bg-sky-950">
	<VerseNumberView verseNumber={verseNumber} verseChapter={verseChapter} />
	<TextVerseView text={verseText} />
	{#if canDisable}
		<VerseToggleView id={id} />
	{/if}
</div>
{/if}