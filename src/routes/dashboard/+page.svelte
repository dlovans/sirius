<script>
	import BoardView from '$lib/ui/BoardView/BoardView.svelte';
	import BookView from '$lib/ui/BookView/BookView.svelte';
	import MenuView from '$lib/ui/MenuView/MenuView.svelte';
	import ResearchView from '$lib/ui/ResearchView/ResearchView.svelte';
	import TextVerseView from '$lib/ui/VerseView/VerseView.svelte';
</script>

<div>
	<MenuView />
	<ResearchView />
	<TextVerseView />
	<BookView />
</div>