<script lang="ts">
  import { base } from '$app/paths';
  import { courseStore, allBadges } from '$lib/stores/course.svelte';
  import { modules } from '$lib/data/modules';

  let showReset = $state(false);

  function resetCourse() {
    courseStore.reset();
    showReset = false;
  }
</script>

<svelte:head>
  <title>Resultados — Mentes con Ruido</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-12">
  <div class="text-center mb-10 fade-in">
    <span class="text-6xl block mb-4">📊</span>
    <h1 class="text-3xl font-black">Tu Progreso</h1>
    <p class="text-mind-muted mt-2">Mentes con Ruido — Productividad para Mentes Creativas</p>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-3 gap-4 mb-10">
    <div class="card text-center">
      <p class="stat-number text-3xl">{courseStore.completedCount}</p>
      <p class="text-xs text-mind-muted mt-1">Modulos completados</p>
    </div>
    <div class="card text-center">
      <p class="text-3xl font-black text-mind-purple">{courseStore.state.badges.length}</p>
      <p class="text-xs text-mind-muted mt-1">Logros desbloqueados</p>
    </div>
    <div class="card text-center">
      <p class="text-3xl font-black text-mind-teal">{courseStore.progressPercent}%</p>
      <p class="text-xs text-mind-muted mt-1">Progreso total</p>
    </div>
  </div>

  <!-- Progress bar -->
  <div class="card mb-10">
    <div class="w-full bg-mind-border/30 rounded-full h-3">
      <div
        class="bg-gradient-to-r from-mind-accent to-mind-purple h-3 rounded-full transition-all duration-700"
        style="width: {courseStore.progressPercent}%"
      ></div>
    </div>
    <p class="text-sm text-mind-muted mt-3 text-center">
      {courseStore.completedCount} de 20 modulos completados
    </p>
  </div>

  <!-- Badges -->
  <div class="mb-10">
    <h2 class="text-xl font-bold mb-4">🏆 Logros</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {#each allBadges as badge}
        {@const earned = courseStore.state.badges.find(b => b.id === badge.id)}
        <div class="card text-center {earned ? '' : 'opacity-30'}">
          <span class="text-3xl block">{badge.icon}</span>
          <p class="font-bold text-sm mt-2">{badge.name}</p>
          <p class="text-xs text-mind-muted mt-1">{badge.description}</p>
          {#if earned?.unlockedAt}
            <p class="text-xs text-mind-success mt-2">✓ Desbloqueado</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Module scores -->
  <div class="mb-10">
    <h2 class="text-xl font-bold mb-4">📋 Detalle por Modulo</h2>
    <div class="space-y-2">
      {#each modules as mod}
        {@const progress = courseStore.state.modules[mod.id]}
        <div class="flex items-center gap-3 p-3 rounded-lg bg-mind-card/50">
          <span class="text-xl">{mod.icon}</span>
          <span class="flex-1 text-sm {progress?.completed ? 'text-mind-text' : 'text-mind-muted'}">{mod.title}</span>
          {#if progress?.completed}
            <span class="badge-pill bg-mind-success/20 text-mind-success">✓ {progress.score}/{progress.maxScore}</span>
          {:else}
            <span class="text-xs text-mind-border">Pendiente</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Actions -->
  <div class="flex flex-col sm:flex-row gap-3 justify-center">
    <a href="{base}/" class="btn-primary justify-center">← Volver al curso</a>
    <button class="btn-secondary justify-center" onclick={() => showReset = true}>🔄 Reiniciar curso</button>
  </div>

  {#if showReset}
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div class="card max-w-md w-full text-center space-y-4">
        <p class="text-lg font-bold">Estas seguro?</p>
        <p class="text-sm text-mind-muted">Se van a borrar todos tus avances, logros y diagnosticos.</p>
        <div class="flex gap-3 justify-center">
          <button class="btn-secondary" onclick={() => showReset = false}>Cancelar</button>
          <button class="bg-mind-danger/20 hover:bg-mind-danger/40 text-mind-danger border border-mind-danger/30 font-bold py-3 px-6 rounded-xl cursor-pointer text-sm" onclick={resetCourse}>Si, reiniciar</button>
        </div>
      </div>
    </div>
  {/if}
</div>
