<script>
	import Verse from '$lib/ui/Book/Verse.svelte';
	import { onMount } from 'svelte';

	// TODO: Add isRemovable, for removable verses.
	// TODO: If verse has been added, change state, so it cant be added again.

	let { data, isEditable = false, isAddable = false } = $props()
	let searchQuery = $state("")
	let formRef = $state()
	let	langSelectionRef = $state()

	function filterVerses(event) {
		searchQuery = event.target.value.toLowerCase()
	}

	function updateBookLanguage() {
		formRef.submit()
	}

	onMount(() => {
		langSelectionRef.value = data.langCode
	})
</script>

<div class="flex flex-col gap-4 w-full h-full overflow-auto">
	<div class="flex flex-row gap-2 items-center bg-emerald-400 px-3 py-1 rounded-lg justify-between">
		<form method="POST" action="?/updateLang" bind:this={formRef} class="rounded-lg text-zinc-900 p-2 outline-0 flex flex-row justify-between w-full">
			<label for="language" class="text-zinc-900 text-lg">Select Language:</label>
			<select name="langCode" id="language" onchange={updateBookLanguage} bind:this={langSelectionRef} class="p-1 px-4 rounded-md outline-none">
				<option value="ar">Arabic</option>
				<option value="en" selected>English</option>
			</select>
		</form>
	</div>
	<input type="search" placeholder="Search verses..." class="w-full h-12 rounded-lg p-4 text-xl text-zinc-900 outline-0" oninput={filterVerses} />

	<div class="flex flex-col gap-3 pb-5">
		{#each data.verses.data as verse}
			{#if `${verse.chapterNo}:${verse.verseNo}`.includes(searchQuery) || verse.content.toLowerCase().includes(searchQuery)}
				<Verse verseData={verse} isEditable={isEditable} isAddable={isAddable} isAdmin={data.isAdmin} />
			{/if}
		{/each}
		{#each data.verses.data as verse}
			{#if `${verse.chapterNo}:${verse.verseNo}`.includes(searchQuery) || verse.content.toLowerCase().includes(searchQuery)}
				<Verse verseData={verse} isEditable={isEditable} isAddable={isAddable} isAdmin={data.isAdmin} />
			{/if}
		{/each}
		{#each data.verses.data as verse}
			{#if `${verse.chapterNo}:${verse.verseNo}`.includes(searchQuery) || verse.content.toLowerCase().includes(searchQuery)}
				<Verse verseData={verse} isEditable={isEditable} isAddable={isAddable} isAdmin={data.isAdmin} />
			{/if}
		{/each}
	</div>
</div>