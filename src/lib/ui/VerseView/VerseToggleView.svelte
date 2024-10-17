<script>
	import { createEventDispatcher } from 'svelte';

	export let displayPlusSign;
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

	// TODO: if bookmarked, remove from Book view, else return it to Book view.
</script>
<button on:click={handleClick}>
	<img bind:this={iconRef} src={displayPlusSign ? "displayplussign": "displayminussign"} alt="Add verse.">
</button>
