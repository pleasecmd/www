<script>
  import { onMount } from "svelte";
  export let lines;

  let line = 0;
  let char = 0;

  let render = [];

  const type = () => {
    if (!lines[line]) return;
    if (char > lines[line].length - 1) {
      line++;
      char = 0;
      return setTimeout(type, 320);
    }
    const currLine = lines[line];
    if (!currLine) return;
    if (Array.isArray(currLine)) {
      if (!render[line]) render[line] = [];
      render[line] = [...render[line], currLine[char]];
      char++;
    } else {
      render[line] = currLine;
      line++;
      char = 0;
      return setTimeout(type, 320);
    }
    setTimeout(type, 60);
  };

  onMount(() => {
    type();
  });
</script>

<div class="terminal">
  <div class="head">
    <div class="button exit" />
    <div class="button minimize" />
    <div class="button expand" />
    <div class="grow" />
  </div>
  <div class="body">
    {#each render as line}
      <div class="line">
        {#if Array.isArray(line)}
          {#each line as part}
            {#if typeof part === "string"}
              {part}
            {:else if part.class}
              <span class={part.class}>{part.text}</span>
            {:else if part.style}
              <span style={part.style}>{part.text}</span>
            {/if}
          {/each}
          <span class="cursor" />
        {:else}
          {#each line.text as part}
            {#if typeof part === "string"}
              {part}
            {:else if part.class}
              <span class={part.class}>{part.text}</span>
            {:else if part.style}
              <span style={part.style}>{part.text}</span>
            {/if}
          {/each}
          {#if line.cursor}
            <span class="cursor" />
          {/if}
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .terminal {
    background: #282a36;
    border-radius: 0.5em;
    overflow: hidden;
    box-shadow: 0px 0px 64px 8px rgba(0, 0, 0, 0.4);
    font-family: "Fira Code", monospace;
    min-height: 400px;
    width: 100%;
    max-width: 960px;
  }
  .head {
    background: #282a36;
    padding: 0.5em;
    border-bottom: 1px solid #44475a;
    display: flex;
  }
  .grow {
    flex-grow: 1;
  }
  .button {
    width: 1em;
    height: 1em;
    border-radius: 0.5em;
    margin-right: 0.5em;
  }
  .exit {
    background: #ff5555;
  }
  .minimize {
    background: #f1fa8c;
  }
  .expand {
    background: #50fa7b;
  }
  .body {
    padding: 1em;
    color: #f8f8f2;
  }
  .terminal :global(.comment) {
    color: #6272a4;
  }
  .terminal :global(.green) {
    color: #50fa7b;
  }
  .terminal :global(.orange) {
    color: #ffb86c;
  }
  .terminal :global(.purple) {
    color: #bd93f9;
  }
  .terminal :global(.pink) {
    color: #ff79c6;
  }
  .cursor {
    height: 3px;
    border-radius: 2px;
    width: 0.75em;
    animation: blink 0.5s infinite;
    background: #f8f8f8;
    display: none;
  }
  .line:last-of-type .cursor {
    display: inline-block;
  }
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
