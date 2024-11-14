<script>
	import { onMount } from 'svelte';

	let { verses: data } = $props()
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

<div class="p-2 flex flex-col gap-4 w-full overflow-hidden">
	<div class="flex flex-row gap-2 items-center bg-emerald-400 px-3 py-1 rounded-lg justify-between overflow-hidden">
		<form method="POST" action="?/updateLang" bind:this={formRef} class="rounded-lg text-zinc-900 p-2 outline-0 flex flex-row justify-between w-full">
			<label for="language" class="text-zinc-900 text-lg">Select Language:</label>
			<select name="langCode" id="language" onchange={updateBookLanguage} bind:this={langSelectionRef} class="p-1 px-4 rounded-md outline-none">
				<option value="ar">Arabic</option>
				<option value="en" selected>English</option>
			</select>
		</form>
	</div>
	<input type="search" placeholder="Search verses..." class="w-full h-12 rounded-lg p-4 text-xl text-zinc-900 outline-0" oninput={filterVerses} />

	<div class="flex flex-col gap-3">
		{#each data.verses.data as verse}
			{#if `${verse.chapterNo}:${verse.verseNo}`.includes(searchQuery) || verse.content.toLowerCase().includes(searchQuery)}
			<div class="flex items-center relative w-full p-3 bg-stone-900 gap-2 rounded-lg overflow-hidden">
				<h5 class="text-2xl bg-sky-900 flex h-min py-0.5 px-1 rounded-lg">{verse.chapterNo}:{verse.verseNo}</h5>
				<p class="text-lg flex items-center">{verse.content}</p>
			</div>
			{/if}
		{/each}
	</div>
</div>