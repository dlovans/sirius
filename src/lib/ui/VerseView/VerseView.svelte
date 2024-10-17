<script>
	import VerseNumberView from '$lib/ui/VerseView/VerseDetailView.svelte';
	import TextVerseView from '$lib/ui/VerseView/TextView.svelte';
	import ToggleView from '$lib/ui/VerseView/ToggleView.svelte';

	export let verseChapter;
	export let verseNumber;
	export let verseText;
	export let id;
	export let displayPlusSign;
</script>

<div class="flex flex-row flex-nowrap w-auto bg-sky-950">
	<VerseNumberView verseNumber={verseNumber} verseChapter={verseChapter} />
	<TextVerseView text={verseText} />
	<ToggleView id={id} displayPlusSign={displayPlusSign} />
</div>