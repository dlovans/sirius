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

	async function validateInput(event) {
		event.preventDefault();
		if (!inputRef.value) {
			warningTextRef.classList.toggle('hidden')
		} else {
			const data = {
				boardTitle: inputRef.value,
				userID: userID
			}

			try {
				const response = await fetch('/create-board', {
					method: 'POST',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					}
				})

				if (response.ok) {
					const result = await response.json();
					await goto(`/${result.boardID}`)
				}
			} catch(e) {
				console.log("Failed to create board.")
			}
		}
	}

	function confirmValidity() {
		if (inputRef.value) {
			if (!warningTextRef.classList.contains('hidden')) {
				warningTextRef.classList.toggle('hidden');
			}
			inputRef.classList.remove('border-gray-500')
			inputRef.classList.add('bg-emerald-300')
			inputRef.classList.remove('border-orange-500')
		} else {
			inputRef.classList.remove('border-gray-500')
			inputRef.classList.remove('bg-emerald-300')
			inputRef.classList.add('border-orange-500')
		}
	}
</script>

{#if displayModal}
<form action="?/create-board" on:submit={validateInput} class="rounded-md border-2 border-gray-500 z-50 flex flex-col gap-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
	<input bind:this={inputRef} on:input={confirmValidity} type="text" name="title">
	<p bind:this={warningTextRef} class="hidden">Enter a title!</p>
	<div>
		<button type="submit">Create</button>
		<button on:click={cancelCreateBoard}>Cancel</button>
	</div>
</form>
	{/if}