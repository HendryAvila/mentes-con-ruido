<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import { courseStore } from '$lib/stores/course.svelte';

  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
  <!-- Header -->
  <header class="border-b border-mind-border/50 bg-mind-darker/80 backdrop-blur-sm sticky top-0 z-30">
    <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="{base}/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <span class="text-2xl">🧠</span>
        <span class="font-bold text-mind-text text-sm tracking-wide">Mentes con Ruido</span>
      </a>

      <div class="flex items-center gap-4">
        <div class="hidden sm:block w-32">
          <ProgressBar />
        </div>
        {#if courseStore.state.badges.length > 0}
          <div class="flex -space-x-1">
            {#each courseStore.state.badges.slice(-3) as badge}
              <span class="text-lg" title={badge.name}>{badge.icon}</span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </header>

  <!-- Main -->
  <main class="flex-1">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="border-t border-mind-border/30 py-6 mt-12">
    <div class="max-w-5xl mx-auto px-4 text-center text-xs text-mind-muted">
      <p>Mentes con Ruido — Productividad para mentes creativas</p>
      <p class="mt-1">Orquestado por <a href="https://github.com/hendryavila" target="_blank" class="text-mind-accent hover:underline">Hendry Avila</a> · Generado con IA · Open Source</p>
    </div>
  </footer>
</div>
