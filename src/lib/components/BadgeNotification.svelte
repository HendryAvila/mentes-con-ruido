<script lang="ts">
  import type { Badge } from '$lib/stores/course.svelte';

  let { badge, onClose }: { badge: Badge; onClose?: () => void } = $props();

  $effect(() => {
    const timer = setTimeout(() => onClose?.(), 5000);
    return () => clearTimeout(timer);
  });
</script>

<div class="fixed bottom-6 right-6 z-50 slide-in">
  <div class="card glow-accent flex items-center gap-4 pr-3 max-w-sm">
    <span class="text-4xl">{badge.icon}</span>
    <div class="flex-1 min-w-0">
      <p class="text-xs text-mind-accent font-semibold uppercase tracking-wider">Logro desbloqueado</p>
      <p class="font-bold text-mind-text">{badge.name}</p>
      <p class="text-xs text-mind-muted truncate">{badge.description}</p>
    </div>
    <button
      class="text-mind-muted hover:text-mind-text transition-colors cursor-pointer p-1"
      onclick={() => onClose?.()}
    >✕</button>
  </div>
</div>
