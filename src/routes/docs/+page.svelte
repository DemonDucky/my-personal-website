<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let specUrl = '/openapi.yaml';
	// export let proxyUrl = 'https://proxy.scalar.com';
	export let theme = 'purple';

	onMount(() => {
		if (!browser) return;

		// Create the script element for the API spec
		const apiReference = document.createElement('script');
		apiReference.id = 'api-reference';
		apiReference.setAttribute('data-url', specUrl);

		// Set configuration if needed
		const configuration = {
			theme: theme
			// Add other configuration options as needed
		};

		apiReference.setAttribute('data-configuration', JSON.stringify(configuration));
		document.body.appendChild(apiReference);

		// Create the script element for Scalar
		const scalarScript = document.createElement('script');
		scalarScript.src = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference';
		scalarScript.async = true;
		document.body.appendChild(scalarScript);

		// Cleanup on component unmount
		return () => {
			document.body.removeChild(apiReference);
			document.body.removeChild(scalarScript);
		};
	});
</script>
