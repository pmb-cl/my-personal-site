<script>
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Journey from '$lib/components/Journey.svelte';
  import Expertise from '$lib/components/Expertise.svelte';
  import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
  <title>Phillip Bauman — Engineering Leadership</title>
  <meta
    name="description"
    content="Phillip Bauman is a technical executive and Director of Software Engineering at Capital One Shopping, architecting large-scale, AI-powered marketing and ad-tech platforms."
  />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Phillip Bauman — Engineering Leadership" />
  <meta
    property="og:description"
    content="Technical executive architecting large-scale, AI-powered platforms. Director of Software Engineering at Capital One Shopping."
  />
</svelte:head>

<main>
  <Hero />
  <About />
  <Journey />
  <Expertise />
  <Contact />
</main>
