<script>
	import { Button } from '@/components/ui/button';
	import { toast } from 'svelte-sonner';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button on:click={() => toast.success('Hewllo world')}>Click me</Button>
