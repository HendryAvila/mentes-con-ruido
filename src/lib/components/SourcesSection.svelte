<script lang="ts">
  import type { Source } from '$lib/data/modules';

  let { sources }: { sources: Source[] } = $props();
  let isOpen = $state(false);
</script>

<div class="mt-10 border-t border-mind-border pt-6">
  <button
    class="flex items-center gap-2 text-mind-muted hover:text-mind-accent transition-colors cursor-pointer"
    onclick={() => isOpen = !isOpen}
  >
    <span class="text-lg">📚</span>
    <span class="text-sm font-semibold uppercase tracking-wider">
      Fuentes ({sources.length})
    </span>
    <span class="text-xs transition-transform duration-200" class:rotate-180={isOpen}>▼</span>
  </button>

  {#if isOpen}
    <div class="mt-4 space-y-2 fade-in">
      {#each sources as source, i}
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-start gap-3 p-3 rounded-lg hover:bg-mind-card transition-colors group"
        >
          <span class="text-mind-muted text-sm mt-0.5">[{i + 1}]</span>
          <span class="text-sm text-mind-muted group-hover:text-mind-accent transition-colors">
            {source.name}
            <span class="text-mind-accent/50 ml-1">↗</span>
          </span>
        </a>
      {/each}
    </div>
  {/if}
</div>
