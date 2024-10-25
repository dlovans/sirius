<script>
	import { userID } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';

	let inputRef = $state();
	let warningTextRef = $state();

	let { displayModal, hideModal } = $props();


	function cancelCreateBoard() {
		inputRef.value = '';
		hideModal();
	}

	async function submitForm(event) {
		event.preventDefault();
		if (!$userID) {
			goto('/login')
			return
		}

		if (!inputRef.value) {
			warningTextRef.classList.remove('opacity-0')
			inputRef.classList.remove('border-gray-500')
			inputRef.classList.add('border-orange-500')
			inputRef.focus()

			setTimeout(() => {
				warningTextRef.classList.add('opacity-0')
			}, 2000)
		} else {
			event.target.submit();
		}
	}

	function confirmValidity() {
		if (inputRef.value) {
			if (!warningTextRef.classList.contains('opacity-0')) {
				warningTextRef.classList.toggle('opacity-0');
			}
			inputRef.classList.remove('border-gray-500')
			inputRef.classList.add('border-emerald-300')
			inputRef.classList.remove('border-orange-500')
		} else {
			inputRef.classList.remove('border-gray-500')
			inputRef.classList.remove('border-emerald-300')
			inputRef.classList.add('border-orange-500')
		}
	}
</script>

{#if displayModal}
<form action="?/createBoardAction" method="POST" onsubmit={submitForm} class="px-5 py-3 rounded-md border-0 bg-gray-800 z-50 flex flex-col justify-center items-center gap-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
	<h4 class="text-xl font-bold">Board Title</h4>
	<input bind:this={inputRef} oninput={confirmValidity} type="text" name="title" class="border-2 border-gray-500 rounded-lg outline-0 px-1 py-1 text-zinc-900">
	<p bind:this={warningTextRef} class="opacity-0 transition-opacity duration-500 bg-orange-400 px-3 rounded-md w-full text-center text-zinc-900">Enter a title!</p>
	<div class="flex justify-between w-full">
		<button type="submit" class="bg-emerald-300 py-1 px-4 text-zinc-900 rounded-md">Create</button>
		<button onclick={cancelCreateBoard} class="bg-red-600 py-1 px-4 text-zinc-900 rounded-md">Cancel</button>
	</div>
</form>
	<span class="absolute w-[100vw] h-[100svh] top-0 left-0 z-40" onclick={cancelCreateBoard} onkeydown={cancelCreateBoard} role="button"	tabindex="0"></span>
{/if}