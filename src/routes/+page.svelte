<script lang="ts">
  import { base } from '$app/paths';
  import { modules } from '$lib/data/modules';
  import { courseStore } from '$lib/stores/course.svelte';

  // Group modules by pillar
  const pillars = $derived(
    modules.reduce((acc, mod) => {
      if (!acc.find(p => p.name === mod.pillar)) {
        acc.push({ name: mod.pillar, modules: [] });
      }
      acc.find(p => p.name === mod.pillar)!.modules.push(mod);
      return acc;
    }, [] as { name: string; modules: typeof modules }[])
  );

  function isModuleAccessible(id: number): boolean {
    return id <= courseStore.state.currentModule + 1;
  }

  function isModuleCompleted(id: number): boolean {
    return courseStore.state.modules[id]?.completed ?? false;
  }
</script>

<svelte:head>
  <title>Mentes con Ruido — Productividad para Mentes Creativas</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-12">
  <!-- Hero -->
  <div class="text-center space-y-6 mb-16 fade-in">
    <span class="text-7xl block">🧠</span>
    <h1 class="text-4xl sm:text-5xl font-black leading-tight">
      Mentes con <span class="text-mind-accent">Ruido</span>
    </h1>
    <p class="text-lg text-mind-muted max-w-2xl mx-auto leading-relaxed">
      Productividad para mentes creativas. Un curso interactivo basado en neurociencia,
      ciencia de habitos y tecnicas de aprendizaje modernas.
      <strong class="text-mind-text">Para quienes ya probaron todo y nada les duro.</strong>
    </p>
    <div class="flex flex-wrap justify-center gap-3 text-sm">
      <span class="badge-pill bg-mind-accent/15 text-mind-accent">📚 20 Modulos</span>
      <span class="badge-pill bg-mind-purple/15 text-mind-purple">🔬 Base cientifica</span>
      <span class="badge-pill bg-mind-teal/15 text-mind-teal">💎 Obsidian + Cuaderno</span>
      <span class="badge-pill bg-mind-rose/15 text-mind-rose">🎨 Para creativos</span>
    </div>
  </div>

  <!-- Module Map -->
  <div class="space-y-10">
    {#each pillars as pillar, pillarIndex}
      <div class="fade-in" style="animation-delay: {pillarIndex * 0.1}s">
        <h2 class="text-xl font-bold text-mind-muted mb-4 flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-mind-accent/10 flex items-center justify-center text-sm text-mind-accent font-bold">
            {pillarIndex}
          </span>
          {pillar.name}
        </h2>

        <div class="grid gap-3 sm:grid-cols-2">
          {#each pillar.modules as mod}
            {#if isModuleAccessible(mod.id)}
              <a
                href="{base}/modulo/{mod.id}"
                class="card-interactive flex items-start gap-4 group relative overflow-hidden"
              >
                {#if isModuleCompleted(mod.id)}
                  <div class="absolute top-3 right-3">
                    <span class="badge-pill bg-mind-success/20 text-mind-success">✓</span>
                  </div>
                {/if}
                <span class="text-3xl mt-1 group-hover:scale-110 transition-transform">{mod.icon}</span>
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-mind-text group-hover:text-mind-accent transition-colors">{mod.title}</h3>
                  <p class="text-sm text-mind-muted mt-1">{mod.subtitle}</p>
                  <div class="flex items-center gap-3 mt-2 text-xs text-mind-muted">
                    <span>⏱️ {mod.duration}</span>
                    <span>·</span>
                    <span>{mod.type}</span>
                  </div>
                </div>
              </a>
            {:else}
              <div class="card opacity-40 flex items-start gap-4 relative">
                <span class="text-3xl mt-1 grayscale">{mod.icon}</span>
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-mind-muted">{mod.title}</h3>
                  <p class="text-sm text-mind-border mt-1">{mod.subtitle}</p>
                  <div class="flex items-center gap-3 mt-2 text-xs text-mind-border">
                    <span>🔒 Completa el modulo anterior</span>
                  </div>
                </div>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- Results link -->
  <div class="text-center mt-16">
    <a href="{base}/resultados" class="btn-secondary">
      📊 Ver mi progreso y resultados
    </a>
  </div>
</div>
