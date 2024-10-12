<script>
	import VerseNumberView from '$lib/ui/VerseView/VerseNumberView.svelte';
	import TextVerseView from '$lib/ui/VerseView/TextView.svelte';

	export let verseNumber;
	export let verseText;
</script>

<div class="flex flex-row flex-nowrap w-auto bg-sky-950">
	<VerseNumberView verseNumber={verseNumber} />
	<TextVerseView text={verseText} />
</div>