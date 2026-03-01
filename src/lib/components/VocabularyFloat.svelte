<script lang="ts">
  import { vocabulary } from '$lib/data/vocabulary';
  import { courseStore } from '$lib/stores/course.svelte';

  let { moduleId }: { moduleId: number } = $props();

  let currentIndex = $state(0);
  let isOpen = $state(false);
  let isMinimized = $state(false);

  const moduleTerms = $derived(
    vocabulary
      .filter(t => t.module === moduleId)
      .filter(t => !courseStore.state.vocabularyDismissed.includes(`${t.module}-${t.term}`))
  );

  const currentTerm = $derived(moduleTerms[currentIndex] ?? null);

  function nextTerm() {
    if (currentIndex < moduleTerms.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
  }

  function dismiss() {
    if (currentTerm) {
      courseStore.dismissVocabulary(`${currentTerm.module}-${currentTerm.term}`);
      if (currentIndex >= moduleTerms.length) {
        currentIndex = Math.max(0, moduleTerms.length - 1);
      }
    }
  }
</script>

{#if moduleTerms.length > 0 && !isMinimized}
  <div class="fixed bottom-6 left-6 z-40 max-w-xs">
    {#if isOpen && currentTerm}
      <div class="card glow-purple slide-in space-y-3">
        <div class="flex items-center justify-between">
          <span class="badge-pill bg-mind-purple/20 text-mind-purple">{currentTerm.category}</span>
          <div class="flex gap-1">
            <button class="text-mind-muted hover:text-mind-text text-xs cursor-pointer p-1" onclick={() => isMinimized = true}>—</button>
            <button class="text-mind-muted hover:text-mind-text text-xs cursor-pointer p-1" onclick={() => isOpen = false}>✕</button>
          </div>
        </div>
        <p class="font-bold text-mind-purple">{currentTerm.term}</p>
        <p class="text-sm text-mind-muted leading-relaxed">{currentTerm.definition}</p>
        <div class="flex gap-2 text-xs">
          <button class="text-mind-muted hover:text-mind-accent cursor-pointer" onclick={nextTerm}>Siguiente →</button>
          <button class="text-mind-muted hover:text-mind-success cursor-pointer" onclick={dismiss}>Ya lo se ✓</button>
        </div>
        <p class="text-xs text-mind-border">{currentIndex + 1}/{moduleTerms.length}</p>
      </div>
    {:else}
      <button
        class="bg-mind-card border border-mind-purple/30 rounded-full px-4 py-2 text-sm text-mind-purple hover:bg-mind-purple/10 transition-colors cursor-pointer flex items-center gap-2"
        onclick={() => isOpen = true}
      >
        📖 Vocabulario ({moduleTerms.length})
      </button>
    {/if}
  </div>
{:else if isMinimized}
  <button
    class="fixed bottom-6 left-6 z-40 bg-mind-card border border-mind-purple/30 rounded-full p-2 text-mind-purple hover:bg-mind-purple/10 cursor-pointer"
    onclick={() => isMinimized = false}
  >📖</button>
{/if}
