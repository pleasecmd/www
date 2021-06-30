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

  let moved = false;

  const move = (el) => {
    const parent = el.closest(".terminal");
    let start;
    let isMoving = false;
    let x;
    let y;
    const onMouseDown = (event) => {
      if (!moved) {
        const rect = el.getBoundingClientRect();
        x = rect.x;
        y = rect.y;
        render();
        moved = true;
      }
      isMoving = true;
      start = event;
    };
    const onMouseUp = () => {
      isMoving = false;
    };
    const onMouseMove = (event) => {
      if (isMoving) {
        const deltaX = event.x - start.x;
        const deltaY = event.y - start.y;
        x += deltaX;
        y += deltaY;
        start = event;
      }
    };
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    const render = () => {
      parent.style.top = `${y}px`;
      parent.style.left = `${x}px`;
      if (isMoving) {
        requestAnimationFrame(render);
      }
    };
    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  };

  onMount(() => {
    type();
  });
</script>

{#if moved}
  <div class="placeholder" />
{/if}

<div class="terminal" class:moved>
  <div class="head" use:move>
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

  .placeholder {
    min-height: 400px;
  }
  .moved {
    position: absolute;
  }
  .head {
    background: #282a36;
    padding: 0.5em;
    border-bottom: 1px solid #44475a;
    display: flex;
    cursor: move;
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
