<script>
	import TopicForm from '$lib/ui/TopicForm.svelte';
	import { goto } from '$app/navigation';

	let { isAuthorized, topics = [] } = $props();

	let menuRef = $state();
	let lineOneRef = $state();
	let lineTwoRef = $state();
	let lineThreeRef = $state();
	let invisibleOverlayRef = $state();

	let displayModal = $state(false);


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
		if (!isAuthorized) {
			goto('/login?message=topic_signin_required')
		} else {
			displayModal = true;
		}
	}

	function hideModal() {
		displayModal = false;
	}
</script>

<div class="px-2 py-2 fixed flex items-center w-full z-50 bg-[#212529] xl:bg-transparent xl:w-min">
	<a href="/" class="font-bold text-xl text-emerald-400 mr-auto">SIRIUS</a>
	<div onclick={toggleMenu} onkeydown={toggleMenu} class="relative w-[40px] h-[40px] overflow-hidden hover:cursor-pointer xl:hidden" tabindex="0" role="button">
		<span bind:this={lineOneRef} class="h-1 w-10 bg-emerald-400 absolute rounded-sm top-[5px] transition-all duration-300"></span>
		<span bind:this={lineTwoRef} class="h-1 w-10 bg-emerald-400 absolute rounded-sm top-[20px] -translate-y-1/2 opacity-100 transition-all duration-300"></span>
		<span bind:this={lineThreeRef} class="h-1 w-10 bg-emerald-400 absolute rounded-sm bottom-[5px] transition-all duration-300"></span>
	</div>
</div>
<span bind:this={invisibleOverlayRef} onclick={toggleMenu} onkeydown={toggleMenu} tabindex="0" role="button" class="bg-transparent w-[100vw] h-[100svh] fixed top-0 left-0 hidden z-20"></span>
<nav bind:this={menuRef} class="w-[250px] h-[40px] fixed top-0 right-0 translate-x-full xl:left-0 xl:translate-x-0 transition-all duration-300 z-20">
	<div class="text-xl w-full h-[100svh] bg-stone-900 py-3 px-3 overflow-x-hidden no-scrollbar">
		<div class="mt-14 flex flex-col justify-center items-center gap-2">
			{#if !isAuthorized}
			<a href="/login" onclick={toggleMenu} onkeydown={toggleMenu} tabindex="0" role="button" class="w-full h-10 flex items-center justify-center border border-solid border-emerald-400 rounded-md hover:bg-emerald-400 duration-500">Log In</a>
			<a href="/signup" onclick={toggleMenu} onkeydown={toggleMenu} tabindex="0" role="button" class="w-full h-10 flex items-center justify-center rounded-md bg-blue-500 duration-500">Sign Up</a>
			{/if}
			{#if isAuthorized}
				<a href="/logout" onclick={toggleMenu} onkeydown={toggleMenu} tabindex="0" role="button" class="w-full h-10 flex items-center justify-center border border-solid border-red-400 rounded-md hover:bg-red-400 duration-500">Log Out</a>
			{/if}
		</div>
		<hr class="w-52 h-0.5 mx-auto my-4 border-0 rounded md:my-5 bg-gray-700">
		<a href="/" onclick={toggleMenu} onkeydown={toggleMenu} tabindex="0" role="button" class="w-full h-10 flex items-center justify-center rounded-md border border-solid border-emerald-400 hover:bg-emerald-400 duration-500">Qur'an</a>
		<hr class="w-52 h-0.5 mx-auto my-4 border-0 rounded md:my-5 bg-gray-700">
		<div class="flex flex-col justify-center items-center gap-2">
			<h4>TOPICS</h4>
			<button onclick={() => { toggleMenu(); checkUserCredentials(); }} class="rounded-md w-full h-10 border border-solid border-emerald-400 hover:bg-emerald-400 duration-500">+ Create Topic</button>
			{#if topics.length > 0}
				{#each topics as topic}
					<a href="/{ topic.id }" onclick={toggleMenu} onkeydown={toggleMenu} tabindex="0" role="button" class="w-full h-10 flex items-center justify-center bg-opacity-5 rounded-md border-emerald-400 border-solid border hover:bg-emerald-400 duration-500 text-nowrap overflow-hidden px-2">{ topic.topicTitle }</a>
				{/each}
			{/if}
		</div>
	</div>
</nav>
{#if displayModal}
	<TopicForm displayModal={displayModal} hideModal={hideModal} isAuthorized={isAuthorized} />
{/if}
