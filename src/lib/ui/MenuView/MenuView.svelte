<script>
	import BoardView from '$lib/ui/BoardView/BoardView.svelte';

	export let boards;

	function handleClick() {
		console.log("Create board clicked")
	}
</script>

<nav class="flex absolute translate-x-[-150%] transition-transform duration-200 ease-in-out w-full overflow-x-hidden">
	<div>
		<button on:click={handleClick}
			class="justify-center items-center w-full h-full px-2.5 py-1.5 bg-sky-950 hover:bg-cyan-950">New Board</button>
	</div>
	<div class="flex flex-col bg-sky-950 hover:bg-cyan-950">
		{#each boards as board}
			<BoardView boardName={board.name} />
		{/each}
	</div>
</nav>