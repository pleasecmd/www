<script>
</script>

<main>
  <slot />
</main>

<style>
  main {
    padding: 4em 2em;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 480px) {
    main {
      padding: 2em 1em;
    }
  }
</style>
