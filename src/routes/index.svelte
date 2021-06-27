<script>
  import Terminal from "../components/Terminal.svelte";
  import lines from "../lib/terminal";
</script>

<svelte:head>
  <title>Please | On-demand commands</title>
</svelte:head>

<h1>Please!</h1>
<h2>On-demand commands</h2>

<Terminal {lines} />

<div class="learn">
  Learn more on
  <a class="button" href="https://github.com/pleasecmd/please"> GitHub </a>
</div>

<style>
  h1 {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 4em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  h2 {
    margin-bottom: 2em;
  }

  .learn {
    padding: 2em;
    font-size: 2em;
  }

  .button {
    color: #f8f8f8;
    background: #6272a4;
    border-radius: 4em;
    text-decoration: none;
    padding: 0.25em 0.5em;
    transition: opacity cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.25s;
    line-height: 3em;
    font-family: "Raleway", sans-serif;
  }

  .button:hover {
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2.5em;
    }
    .learn {
      text-align: center;
    }
  }
</style>
