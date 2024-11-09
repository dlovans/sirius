<script>
	let { verses } = $props()

	function filterVerses() {
		// Filter verses by search query.
	}
</script>

<div class="p-2 flex flex-col gap-4">
	<div class="flex flex-row gap-2 items-center bg-emerald-400 p-1 rounded-l">
		<label for="language">Select Language:</label>
		<select name="langCode" id="language" class="rounded-lg text-zinc-900 p-2 outline-0 flex">
			<option value="ar">Arabic</option>
			<option value="en" selected>English</option>
		</select>
	</div>
	<input type="search" placeholder="Search verses..." class="w-full h-12 rounded-lg p-4 text-xl text-zinc-900 outline-0" oninput={filterVerses} />

	<div>
		{#each verses as verse}
			<div class="flex relative">
				<h5>{chapterNo}:{verseNo}</h5>
				<p>{content}</p>
				{#if isAddable}
					<button class="absolute top-0 left-0 w-full h-full">
						+
					</button>
				{/if}
			</div>
		{/each}
	</div>
</div>