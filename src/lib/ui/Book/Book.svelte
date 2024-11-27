<script>
	import Verse from '$lib/ui/Book/Verse.svelte';

	let { data, isEditable = false, isAddable = false, isRemovable = false } = $props()
	let searchQuery = $state("")
	let formRef = $state()

	function filterVerses(event) {
		searchQuery = event.target.value.toLowerCase()
	}

	function updateBookLanguage() {
		formRef.submit()
	}
</script>

<div class="flex flex-col gap-4 w-full h-full overflow-auto">
	{#if !isRemovable}
		<div class="flex flex-row gap-2 items-center bg-emerald-400 px-3 py-1 rounded-lg justify-between">
			<form method="POST" action="?/updateLang" bind:this={formRef} class="rounded-lg text-zinc-900 p-2 outline-0 flex flex-row justify-between w-full">
				<label for="language" class="text-zinc-900 text-lg">Select Language:</label>
				<select name="langCode" id="language" onchange={updateBookLanguage} value={data.langCode} class="p-1 px-4 rounded-md outline-none">
					<option value="ar">Arabic</option>
					<option value="en" selected>English</option>
				</select>
			</form>
		</div>
	{/if}
	<input type="search" placeholder="Search verses..." class="w-full h-12 rounded-lg p-4 text-xl text-zinc-900 outline-0" oninput={filterVerses} />

	<div class="flex flex-col gap-3 pb-5 w-full">
		<!--{#if !isRemovable}-->
		<!--	{#each data.verses.data as verse}-->
		<!--		{#if !data.verseExclusionList.includes(verse.id)}-->
		<!--			{#if `${verse.chapterNo}:${verse.verseNo}`.includes(searchQuery) || verse.content.toLowerCase().includes(searchQuery)}-->
		<!--				<Verse verseData={verse} isEditable={isEditable} isAddable={isAddable} isRemovable={isRemovable} isAdmin={data.isAdmin} />-->
		<!--			{/if}-->
		<!--		{/if}-->
		<!--	{/each}-->
		<!--	{:else if isRemovable}-->
		<!--	{#each data.topicVerses as verse}-->
		<!--		{#if `${verse.data.chapterNo}:${verse.data.verseNo}`.includes(searchQuery) || verse.data.content.toLowerCase().includes(searchQuery)}-->
		<!--			<Verse verseData={verse.data} isEditable={isEditable} isAddable={isAddable} isRemovable={isRemovable} isAdmin={data.isAdmin} />-->
		<!--		{/if}-->
		<!--	{/each}-->
		<!--{/if}-->

		{#if isRemovable}
			{#each data.topicVerses as verse}
				{#if `${verse.data.chapterNo}:${verse.data.verseNo}`.includes(searchQuery) || verse.data.content.toLowerCase().includes(searchQuery)}
					<Verse verseData={verse.data} isEditable={isEditable} isAddable={isAddable} isRemovable={isRemovable} isAdmin={data.isAdmin} />
					{/if}
				{/each}
			{/if}

		{#if !isRemovable && isAddable}
			{#each data.verses.data as verse}
				{#if !data.verseExclusionList.includes(verse.id)}
					{#if `${verse.chapterNo}:${verse.verseNo}`.includes(searchQuery) || verse.content.toLowerCase().includes(searchQuery)}
						<Verse verseData={verse} isEditable={isEditable} isAddable={isAddable} isRemovable={isRemovable} isAdmin={data.isAdmin} />
					{/if}
					{/if}
				{/each}
			{/if}

		{#if !isRemovable && !isAddable}
			{#each data.verses.data as verse}
					{#if `${verse.chapterNo}:${verse.verseNo}`.includes(searchQuery) || verse.content.toLowerCase().includes(searchQuery)}
						<Verse verseData={verse} isEditable={isEditable} isAddable={isAddable} isRemovable={isRemovable} isAdmin={data.isAdmin} />
					{/if}
			{/each}
		{/if}
	</div>
</div>