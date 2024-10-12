<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let researchContent;

	let timeoutID;

	function handleInput(event) {
		if (timeoutID) clearTimeout(timeoutID);

		timeoutID = setTimeout(() => {
			if (researchContent !== event.target.value) {
				researchContent = event.target.value;
				dispatch('updateResearch', researchContent);
			}
		}, 2000)
	}
</script>

<textarea bind:value={researchContent} onChange={handleInput}
	class="w-full h-full bg-sky-950 border-2 border-r-8"
/>