<script>
	import { ZERO_TO_EIGHT } from '@/constants';
	import Square from './square.svelte';
</script>

<div class="grid h-[18rem] w-[18rem] grid-cols-9">
	{#each ZERO_TO_EIGHT as row}
		{#each ZERO_TO_EIGHT as col}
			<Square {row} {col} />
		{/each}
	{/each}
</div>
