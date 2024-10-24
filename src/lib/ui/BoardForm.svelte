<script>
	import { userID } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';

	let inputRef;
	let warningTextRef;

	export let displayModal;
	export let hideModal;


	function cancelCreateBoard() {
		inputRef.value = '';
		hideModal();
	}

	async function submitForm(event) {
		event.preventDefault();
		console.log($userID)
		if (!$userID) {
			goto('/login')
			console.log("here")
			return
		}
		if (!inputRef.value) {
			warningTextRef.classList.remove('opacity-0')
			inputRef.classList.remove('border-gray-500')
			inputRef.classList.add('border-orange-500')

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
<form action="?/createBoardAction" method="POST" on:submit={submitForm} class="px-3 py-2 rounded-md border-0 bg-gray-800 z-50 flex flex-col justify-center items-center gap-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
	<h4>Create Board</h4>
	<input bind:this={inputRef} on:input={confirmValidity} type="text" name="title" class="border-2 border-gray-500 rounded-md outline-0 px-1 py-1">
	<p bind:this={warningTextRef} class="opacity-0 transition-opacity duration-300 bg-orange-400 px-3">Enter a title!</p>
	<div class="flex justify-between w-full">
		<button type="submit" class="bg-emerald-300 py-1 px-4">Create</button>
		<button on:click={cancelCreateBoard} class="bg-red-600 py-1 px-4">Cancel</button>
	</div>
</form>
	{/if}