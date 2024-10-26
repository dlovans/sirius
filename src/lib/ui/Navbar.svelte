<script>
	import BoardForm from '$lib/ui/BoardForm.svelte';
	import { isLoggedIn, isAdmin } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';

	let menuRef = $state();
	let lineOneRef = $state();
	let lineTwoRef = $state();
	let lineThreeRef = $state();
	let invisibleOverlayRef = $state();

	let displayModal = $state(false);


	let { boards = [] } = $props();

	function toggleMenu() {
		lineOneRef.classList.toggle('rotate-45')
		lineOneRef.classList.toggle('origin-center')
		lineOneRef.classList.toggle('translate-y-[12px]')
		lineTwoRef.classList.toggle('opacity-0');
		lineTwoRef.classList.toggle('-translate-x-[50px]')
		lineThreeRef.classList.toggle('-rotate-45')
		lineThreeRef.classList.toggle('origin-center')
		lineThreeRef.classList.toggle('-translate-y-[14px]')
		menuRef.classList.toggle('translate-x-full')
		invisibleOverlayRef.classList.toggle('hidden')
	}

	function checkUserCredentials() {
		displayModal = true
		if (!$isLoggedIn) {
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

<div class="px-2 py-2 fixed flex items-center w-full z-50">
	<a href="/" class="font-bold text-xl text-emerald-400 mr-auto">SIRIUS</a>
	<div onclick={toggleMenu} onkeydown={toggleMenu} class="relative w-[40px] h-[40px] overflow-hidden hover:cursor-pointer xl:hidden" tabindex="0" role="button">
		<span bind:this={lineOneRef} class="h-1 w-10 bg-emerald-400 absolute rounded-sm top-[5px] transition-all duration-300"></span>
		<span bind:this={lineTwoRef} class="h-1 w-10 bg-emerald-400 absolute rounded-sm top-[20px] -translate-y-1/2 opacity-100 transition-all duration-300"></span>
		<span bind:this={lineThreeRef} class="h-1 w-10 bg-emerald-400 absolute rounded-sm bottom-[5px] transition-all duration-300"></span>
	</div>
</div>
<span bind:this={invisibleOverlayRef} onclick={toggleMenu} onkeydown={toggleMenu} class="bg-transparent w-[100vw] h-[100svh] fixed top-0 left-0 hidden" tabindex="0" role="button"></span>
<nav bind:this={menuRef} class="w-[250px] h-[40px] fixed top-0 right-0 translate-x-full xl:left-0 xl:translate-x-0 transition-all duration-300">
	<div class="text-xl w-full h-[100svh] bg-[#0d1b2a] py-3 px-3 overflow-x-hidden">
		<div class="mt-14 flex flex-col justify-center items-center gap-2">
			<a href="/login" class="w-full h-10 flex items-center justify-center bg-blue-500 rounded-md">Log In</a>
			<a href="/signup" class="w-full h-10 flex items-center justify-center bg-emerald-500 rounded-md">Sign Up</a>
			{#if $isLoggedIn}
				<a href="/logout" class="w-full h-10 flex items-center justify-center bg-amber-800 rounded-md">Log Out</a>
			{/if}
			{#if $isAdmin}
				<a href="/admin" class="w-full h-10 flex items-center justify-center bg-sky-900 bg-opacity-50 rounded-md">Administrative</a>
			{/if}
		</div>
		<hr class="w-52 h-0.5 mx-auto my-4 border-0 rounded md:my-10 bg-gray-700">
		<div class="flex flex-col justify-center items-center mt-4 gap-2">
			<h4>BOARDS</h4>
			<button onclick={checkUserCredentials} class="rounded-md w-full h-10 bg-orange-500">+ Create Board</button>
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
