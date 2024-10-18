<script>
	import BoardView from '$lib/ui/BoardView/BoardView.svelte';
	import LinkView from '$lib/ui/MenuView/LinkView.svelte';

	export let boards;
	export let adminAccess;

	function handleClick() {
		console.log("Create board clicked")
	}
</script>

<nav class="flex absolute translate-x-[-150%] transition-transform duration-200 ease-in-out w-full overflow-x-hidden">
	<div>
		<LinkView uri="/quran" linkText="Qur'an" />
		{#if adminAccess}
			<LinkView uri="/dashboard/admin" linkText="Administrative" />
		{/if}
	</div>
	<div>
		<button on:click={handleClick}
			class="justify-center items-center w-full h-full px-2.5 py-1.5 bg-sky-950 hover:bg-cyan-950">New Board</button>
	</div>
	<div class="flex flex-col bg-sky-950 hover:bg-cyan-950">
		{#if Array.isArray(boards) && boards.length > 0 }
			{#each boards as board}
				<BoardView boardName={board.name} />
			{/each}
		{/if}
	</div>
</nav>