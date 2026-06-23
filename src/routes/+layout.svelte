<script>
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Twin from '$lib/components/Twin.svelte';

  let { children } = $props();
</script>

<Nav />
{@render children()}
<Footer />
<Twin />
