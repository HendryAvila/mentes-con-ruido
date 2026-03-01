<script lang="ts">
  import { base } from '$app/paths';
  import { modules } from '$lib/data/modules';

  let { currentModule }: { currentModule: number } = $props();

  const totalModules = modules.length;
  const prevModule = currentModule > 1 ? currentModule - 1 : null;
  const nextModule = currentModule < totalModules ? currentModule + 1 : null;
</script>

<nav class="mt-12 flex items-center justify-between">
  {#if prevModule}
    <a href="{base}/modulo/{prevModule}" class="btn-secondary">
      ← Anterior
    </a>
  {:else}
    <a href="{base}/" class="btn-secondary">
      ← Inicio
    </a>
  {/if}

  <span class="text-mind-muted text-sm">
    {currentModule} / {totalModules}
  </span>

  {#if nextModule}
    <a href="{base}/modulo/{nextModule}" class="btn-primary">
      Siguiente →
    </a>
  {:else}
    <a href="{base}/resultados" class="btn-primary">
      Ver Resultados 🎯
    </a>
  {/if}
</nav>
