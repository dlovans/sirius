<script>
	import { createEventDispatcher } from 'svelte';

	export let displayPlusSign = true;
	export let id;

	let iconRef;

	const dispatch = createEventDispatcher()

	function handleClick() {
		if (displayPlusSign) {
			displayPlusSign = false;

			dispatch('addToBookmarked', id)
		} else {
			displayPlusSign = true;
			dispatch('removeFromBookmarked', id)
		}
	}
</script>

<button>
	<img bind:this={iconRef} on:click={handleClick} src="" alt="Add verse.">
</button>
