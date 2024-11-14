<script>
	let { verses } = $props()

	function filterVerses() {
		// Filter verses by search query.
	}
</script>

<div class="p-2 flex flex-col gap-4 w-full overflow-hidden">
	<div class="flex flex-row gap-2 items-center bg-emerald-400 px-3 py-2 rounded-lg justify-between overflow-hidden">
		<label for="language">Select Language:</label>
		<select name="langCode" id="language" class="rounded-lg text-zinc-900 p-2 outline-0 flex">
			<option value="ar">Arabic</option>
			<option value="en" selected>English</option>
		</select>
	</div>
	<input type="search" placeholder="Search verses..." class="w-full h-12 rounded-lg p-4 text-xl text-zinc-900 outline-0" oninput={filterVerses} />

	<div class="flex flex-col gap-3">
		{#each verses.data as verse}
			<div class="flex items-center relative w-full p-3 bg-stone-900 gap-2 rounded-lg overflow-hidden">
				<h5 class="text-2xl bg-sky-900 flex h-min py-0.5 px-1 rounded-lg">{verse?.chapterNo}:{verse.verseNo}</h5>
				<p class="text-lg flex items-center">{verse.content}</p>
			</div>
		{/each}
	</div>
</div>