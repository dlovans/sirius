<script>
	let { id, isAddable, isMutable, content, chapterNo, verseNo } = $props()
</script>

<div class="flex relative">
	<h5>{chapterNo}:{verseNo}</h5>
	<p>{content}</p>
	{#if isAddable}
		<button class="absolute top-0 left-0 w-full h-full">
			+
		</button>
	{/if}
</div>