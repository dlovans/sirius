<script>
	let { analysisContent } = $props()
	let textareaRef= $state()

	function validateContent(event) {
		event.preventDefault()
		if (textareaRef.value !== analysisContent) {
			event.target.submit()
		}
	}
</script>

<form action="?/updateAnalysis" method="POST" onsubmit={validateContent} class=" h-full w-full flex flex-col gap-1">
	<label for="analysis" class="hidden">Analysis</label>
	<textarea bind:this={textareaRef} wrap="soft" name="analysis" id="analysis" class="whitespace-pre-wrap h-full overflow-x-hidden bg-stone-900 resize-none outline-none border border-solid border-emerald-400 rounded-md px-2 py-1">{analysisContent}</textarea>
	<button type="submit" class="w-full border border-solid border-emerald-400 py-2 rounded-md hover:bg-emerald-400 duration-300">Save</button>
</form>