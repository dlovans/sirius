<script>
	import BoardForm from '$lib/ui/BoardForm.svelte';
	import { isLoggedIn, isAdmin } from '$lib/stores/auth.js';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	let menuRef;
	let lineOneRef;
	let lineTwoRef;
	let lineThreeRef;
	let invisibleOverlayRef;

	let displayModal = false;
	const isLoggedInSession = get(isLoggedIn);
	const isAdministrator = get(isAdmin);

	export let boards = [];

	function toggleMenu() {
		lineOneRef.classList.toggle('rotate-45')
		lineOneRef.classList.toggle('origin-top-left')
		lineOneRef.classList.toggle('left-[3px]')
		lineTwoRef.classList.toggle('opacity-0');
		lineTwoRef.classList.toggle('-translate-x-[50px]')
		lineThreeRef.classList.toggle('-rotate-45')
		lineThreeRef.classList.toggle('origin-top-left')
		lineThreeRef.classList.toggle('bottom-[3px]')
		menuRef.classList.toggle('translate-x-[0px]')
		invisibleOverlayRef.classList.toggle('hidden')
	}

	function checkUserCredentials() {
		if (!isLoggedIn) {
			goto('/login')
		} else {
			displayModal = true;
		}
	}

	function hideModal() {
		displayModal = false;
	}

	// TODO: Remove sample board after populating db
</script>

<nav class="w-full h-[40px] px-1.5 py-1">
	<span bind:this={invisibleOverlayRef} on:click={toggleMenu} on:keydown={toggleMenu} class="bg-transparent w-[100vw] h-[100svh] absolute top-0 left-0 hidden" tabindex="0" role="button"></span>
	<div on:click={toggleMenu} on:keydown={toggleMenu} class="relative w-[40px] h-[40px] overflow-hidden hover:cursor-pointer z-50" tabindex="0" role="button">
		<span bind:this={lineOneRef} class="h-1 w-10 bg-emerald-400 absolute rounded-sm top-[5px] transition-all duration-300"></span>
		<span bind:this={lineTwoRef} class="h-1 w-10 bg-emerald-400 absolute rounded-sm top-[20px] -translate-y-1/2 opacity-100 transition-all duration-300"></span>
		<span bind:this={lineThreeRef} class="h-1 w-10 bg-emerald-400 absolute rounded-sm bottom-[5px] transition-all duration-300"></span>
	</div>
	<div bind:this={menuRef} class="text-xl absolute top-0 left-0 -translate-x-[300px] w-[250px] h-[100svh] transition-all duration-300 bg-[#0d1b2a] py-3 px-3 overflow-x-hidden">
		<div class="mt-14 flex flex-col justify-center items-center gap-2">
			<a href="/login" class="w-full h-10 flex items-center justify-center bg-blue-500 rounded-md">Log In</a>
			<a href="/signup" class="w-full h-10 flex items-center justify-center bg-emerald-500 rounded-md">Sign Up</a>
			{#if isLoggedInSession}
				<a href="/logout" class="w-full h-10 flex items-center justify-center bg-amber-800 rounded-md">Log Out</a>
			{/if}
			{#if isAdministrator}
				<a href="/admin" class="w-full h-10 flex items-center justify-center bg-sky-900 bg-opacity-50 rounded-md">Administrative</a>
			{/if}
		</div>
		<hr class="w-52 h-0.5 mx-auto my-4 border-0 rounded md:my-10 bg-gray-700">
		<div class="flex flex-col justify-center items-center mt-4 gap-2">
			<h4>BOARDS</h4>
			<button on:click={checkUserCredentials} class="rounded-md w-full h-10 bg-orange-500">+ Create Board</button>
			<a href="/123-board" class="w-full h-10 flex items-center justify-center bg-gray-700 rounded-md">Sample Board</a>
			{#if boards.length > 0}
				{#each boards as board}
					<a href="/{ board.id }" class="w-full h-10 flex items-center justify-center bg-gray-700 bg-opacity-5 rounded-md">{ board.title }</a>
				{/each}
			{/if}
		</div>
	</div>
	{#if displayModal}
		<BoardForm displayModal={displayModal} hideModal={hideModal} />
	{/if}
</nav>

<main>

</main>