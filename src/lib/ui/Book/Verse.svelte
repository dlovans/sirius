<script>
	let { verseData, isAdmin, isEditable = false, isAddable = false, isRemovable = false} = $props()

	let verseRef = $state()
	let warningRef = $state()
	let inputVerseRef = $state()
	let timeoutID

	const originalVerseContent = verseData.content

	function revertChanges() {
		if (verseRef.textContent !== originalVerseContent) {
			verseRef.textContent = originalVerseContent
		}
	}

	function validateContent(event) {
		clearTimeout(timeoutID)
		event.preventDefault()
		if (verseRef.textContent !== originalVerseContent) {
			inputVerseRef.value = verseRef.textContent
			event.target.submit()
		} else {
			warningRef.classList.remove('translate-x-[250%]')
			warningRef.classList.remove('opacity-0')
			warningRef.classList.add('-translate-x-1/2')
			setTimeout(() => {
				warningRef.classList.remove('-translate-x-1/2')
				warningRef.classList.add('translate-x-[250%]')
				warningRef.classList.add('opacity-0')
			}, 2000)

		}
	}
</script>

<div class="flex flex-col items-center relative w-full bg-stone-900 gap-2 rounded-lg overflow-hidden shadow-inner border border-solid border-zinc-50 border-opacity-30 p-3">
<form onsubmit={validateContent} method="POST" action={(isEditable && verseData.isMutable && isAdmin) ? "?/updateVerse" : ""} class="w-full">
	<div class="flex w-full items-center gap-1">
		<h5 class="text-md flex h-min py-0.5 px-1 rounded-lg items-center">{verseData.chapterNo}:{verseData.verseNo}</h5>
		{#if isEditable && verseData.isMutable && isAdmin}
			<p bind:this={warningRef} class="absolute top-1/2 left-1/2 translate-x-[250%] -translate-y-1/2 opacity-0 bg-red-400 px-4 py-2 text-center rounded-md transition-all duration-500">No changes were made!</p>
			<div class="flex gap-2 flex-col w-full">
				<input type="hidden" name="verseId" value={verseData.id} />
				<input type="hidden" name="verseContent" value="" bind:this={inputVerseRef}>
				<p bind:this={verseRef} contenteditable class="text-lg flex items-center border border-solid border-zinc-400 border-opacity-70 w-full p-2 rounded-md outline-none">{verseData.content}</p>
				<div class="flex gap-2">
					<button type="submit" class="p-2 rounded-md border border-solid border-emerald-400 hover:bg-emerald-400 hover:duration-500">Update</button>
					<button onclick={revertChanges} type="reset" class="p-2 rounded-md border border-solid border-red-400 hover:bg-red-400 hover:duration-500">Cancel</button>
				</div>
			</div>
		{:else}
			<p class="text-lg flex items-center">{verseData.content}</p>
		{/if}
	</div>
</form>
{#if isAddable}
	<form action="?/addVerse" method="POST" class="w-full">
		<input type="hidden" name="verseId" value={verseData.verseId} />
		<button class="bg-emerald-400 p-1 w-full rounded-md"><span class="text-lg">+</span> Add Verse</button>
	</form>
{:else if isRemovable}
	<form action="?/removeVerse">
		<input type="hidden" name="verseId" value={verseData.verseId} />
		<button class="bg-red-400 p-1 w-full rounded-md"><span class="text-lg">-</span> Remove Verse</button>
	</form>
{/if}
</div>