<script lang="ts">
  import { courseStore, allBadges } from '$lib/stores/course.svelte';
  import { modules } from '$lib/data/modules';
  import ModuleNav from '$lib/components/ModuleNav.svelte';
  import SourcesSection from '$lib/components/SourcesSection.svelte';
  import VocabularyFloat from '$lib/components/VocabularyFloat.svelte';
  import BadgeNotification from '$lib/components/BadgeNotification.svelte';
  import type { Badge } from '$lib/stores/course.svelte';

  const mod = modules.find(m => m.id === 2)!;

  let showBadge = $state(false);
  let earnedBadge = $state<Badge | null>(null);
  let moduleCompleted = $state(false);

  // Auto-diagnostico state
  let currentQuestion = $state(0);
  let scores = $state<Record<string, number>>({ groupHug: 0, slash: 0, einstein: 0, phoenix: 0 });
  let diagStarted = $state(false);
  let diagFinished = $state(false);
  let selectedOption = $state<number | null>(null);

  interface DiagOption {
    text: string;
    scores: Record<string, number>;
  }

  interface DiagQuestion {
    question: string;
    options: DiagOption[];
  }

  const diagQuestions: DiagQuestion[] = [
    {
      question: 'Cuando empezas un proyecto nuevo, que sentis?',
      options: [
        { text: 'Me emociona pensar como puedo combinar todas mis habilidades en este proyecto', scores: { groupHug: 3, slash: 0, einstein: 0, phoenix: 1 } },
        { text: 'Ya estoy pensando en como dividir mi tiempo entre esto y mis otros proyectos', scores: { groupHug: 0, slash: 3, einstein: 1, phoenix: 0 } },
        { text: 'Lo encaro con ganas pero necesito que no interfiera con mi trabajo principal', scores: { groupHug: 0, slash: 1, einstein: 3, phoenix: 0 } },
        { text: 'Me sumerjo completamente — dejo todo lo demas de lado hasta dominarlo', scores: { groupHug: 0, slash: 0, einstein: 0, phoenix: 3 } }
      ]
    },
    {
      question: 'Cuando alguien te pregunta "a que te dedicas?", que sentis?',
      options: [
        { text: 'Lo explico facil — mi trabajo integra varias cosas que me gustan', scores: { groupHug: 3, slash: 1, einstein: 0, phoenix: 0 } },
        { text: 'Depende del dia — hoy soy programador, manana soy artista, siempre soy las dos cosas', scores: { groupHug: 0, slash: 3, einstein: 0, phoenix: 1 } },
        { text: 'Digo mi trabajo formal, pero tengo una vida paralela de hobbies intensos', scores: { groupHug: 0, slash: 0, einstein: 3, phoenix: 1 } },
        { text: 'Me cuesta responder porque cambio de "dedicacion" cada cierto tiempo', scores: { groupHug: 0, slash: 1, einstein: 0, phoenix: 3 } }
      ]
    },
    {
      question: 'Si pudieras disenar tu semana ideal, como seria?',
      options: [
        { text: 'Un trabajo que me deje usar dibujo, escritura Y tecnologia — todo junto', scores: { groupHug: 3, slash: 0, einstein: 1, phoenix: 0 } },
        { text: 'Lunes-miercoles hago una cosa, jueves-viernes hago otra completamente distinta', scores: { groupHug: 0, slash: 3, einstein: 0, phoenix: 1 } },
        { text: 'Trabajo estable de 9 a 5 y despues me dedico a mis pasiones con toda la energia', scores: { groupHug: 1, slash: 0, einstein: 3, phoenix: 0 } },
        { text: 'Tres meses haciendo solo pintura, tres meses solo programando, tres meses escribiendo...', scores: { groupHug: 0, slash: 0, einstein: 0, phoenix: 3 } }
      ]
    },
    {
      question: 'Que pasa cuando "dominas" algo?',
      options: [
        { text: 'Lo integro a mi toolkit — ahora es una herramienta mas que combino con las otras', scores: { groupHug: 3, slash: 1, einstein: 0, phoenix: 0 } },
        { text: 'Sigue siendo parte de mi rotacion pero le doy espacio a otras cosas', scores: { groupHug: 0, slash: 3, einstein: 1, phoenix: 0 } },
        { text: 'Lo mantengo como hobby satisfactorio — no necesita ser mi vida', scores: { groupHug: 0, slash: 1, einstein: 3, phoenix: 0 } },
        { text: 'Pierdo interes y busco algo nuevo que me desafie', scores: { groupHug: 0, slash: 0, einstein: 0, phoenix: 3 } }
      ]
    },
    {
      question: 'Que frase te representa mas?',
      options: [
        { text: '"Encontre la forma de hacer todo lo que amo en un solo lugar"', scores: { groupHug: 3, slash: 0, einstein: 0, phoenix: 0 } },
        { text: '"Soy muchas cosas a la vez y no pienso elegir una sola"', scores: { groupHug: 0, slash: 3, einstein: 0, phoenix: 1 } },
        { text: '"Tengo un trabajo que paga las cuentas y pasiones que alimentan el alma"', scores: { groupHug: 0, slash: 0, einstein: 3, phoenix: 0 } },
        { text: '"Cada etapa de mi vida tiene un tema — y cuando se termina, empiezo otra"', scores: { groupHug: 0, slash: 0, einstein: 0, phoenix: 3 } }
      ]
    }
  ];

  const profiles: Record<string, { name: string; emoji: string; description: string; examples: string; advice: string }> = {
    groupHug: {
      name: 'Group Hug',
      emoji: '🤗',
      description: 'Integras todas tus habilidades e intereses en un solo trabajo, negocio o proyecto. Sos el tipo de persona que dice "hice un trabajo donde puedo dibujar, programar Y escribir al mismo tiempo".',
      examples: 'Disenador UX que combina arte + psicologia + codigo. Emprendedor creativo. Profesor que integra multiples disciplinas.',
      advice: 'Tu desafio: encontrar o crear ese "trabajo integrador". Tu ventaja: cuando lo encontras, la productividad explota porque TODO te motiva.'
    },
    slash: {
      name: 'Slash',
      emoji: '⚡',
      description: 'Mantenes multiples roles activos simultaneamente. Sos programador/artista/escritor. No elegis uno — los mantenes todos vivos, dedicandole tiempo a cada uno en tu semana.',
      examples: 'Desarrollador de dia, musico de noche. Persona que tiene un trabajo freelance + un proyecto personal + un hobby serio.',
      advice: 'Tu desafio: gestionar la energia entre roles sin agotarte. Tu ventaja: la variedad te mantiene fresco y creativo en cada area.'
    },
    einstein: {
      name: 'Einstein',
      emoji: '🧪',
      description: 'Tenes un trabajo estable ("suficientemente bueno") que te da seguridad, y al costado perseguis tus pasiones con toda la energia. Einstein trabajaba en la oficina de patentes mientras revolucionaba la fisica.',
      examples: 'Empleado de 9 a 5 que pinta los fines de semana. Persona con trabajo corporate que escribe novelas por la noche.',
      advice: 'Tu desafio: no dejar que el trabajo "principal" te chupe toda la energia. Tu ventaja: la seguridad financiera te da libertad creativa sin presion.'
    },
    phoenix: {
      name: 'Phoenix',
      emoji: '🔥',
      description: 'Te sumerges completamente en algo, lo dominas, y cuando sentis que ya lo exploraste suficiente, renacias en algo nuevo. Como el fenix — destruis para volver a crear.',
      examples: 'Persona que fue chef 3 anios, despues programador 5 anios, despues artista. Cada etapa es intensa y completa.',
      advice: 'Tu desafio: la transicion entre etapas puede sentirse como "fracaso" cuando en realidad es tu naturaleza. Tu ventaja: llegas profundo en cada cosa porque le das todo.'
    }
  };

  const currentDiagQuestion = $derived(diagQuestions[currentQuestion]);

  function selectDiagOption(optionIndex: number) {
    selectedOption = optionIndex;
  }

  function confirmDiagOption() {
    if (selectedOption === null) return;
    const option = currentDiagQuestion.options[selectedOption];
    const newScores = { ...scores };
    for (const [key, value] of Object.entries(option.scores)) {
      newScores[key] = (newScores[key] || 0) + value;
    }
    scores = newScores;
    selectedOption = null;

    if (currentQuestion < diagQuestions.length - 1) {
      currentQuestion++;
    } else {
      diagFinished = true;
      const topProfile = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      courseStore.setMultipotentialProfile(topProfile);
      completeModule();
    }
  }

  function getTopProfile() {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
  }

  function getSecondProfile() {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted[1][0];
  }

  function completeModule() {
    moduleCompleted = true;
    courseStore.completeModule(2, 1, 1);

    // Check if Pilar 0 is complete
    const mod1Done = courseStore.state.modules[1]?.completed;
    if (mod1Done) {
      const badge = courseStore.unlockBadge('despertar');
      if (badge) {
        earnedBadge = badge;
        showBadge = true;
      }
    }

    const mpBadge = courseStore.unlockBadge('multipotencial');
    if (mpBadge && !earnedBadge) {
      earnedBadge = mpBadge;
      showBadge = true;
    }
  }
</script>

<svelte:head>
  <title>{mod.title} — Mentes con Ruido</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
  <!-- Module Header -->
  <div class="text-center mb-10 fade-in">
    <span class="badge-pill bg-mind-accent/15 text-mind-accent mb-4 inline-block">{mod.pillar}</span>
    <span class="text-6xl block mb-4">{mod.icon}</span>
    <h1 class="text-3xl sm:text-4xl font-black leading-tight">{mod.title}</h1>
    <p class="text-mind-muted mt-2 text-lg">{mod.subtitle}</p>
  </div>

  <!-- DATO PROVOCADOR -->
  <div class="provocative-data mb-12 fade-in">
    <p class="text-mind-muted text-sm uppercase tracking-widest mb-3">Dato provocador</p>
    <p class="text-2xl sm:text-3xl font-black text-mind-accent leading-tight max-w-2xl mx-auto">
      "Las personas altamente creativas tienen atencion <em>permeable</em> —
      captan mas del mundo, pero les cuesta mas filtrar"
    </p>
    <p class="text-mind-muted mt-4 max-w-xl mx-auto text-sm leading-relaxed">
      Tu dificultad para enfocarte no es un defecto — es el lado oscuro de tu superpoder creativo.
    </p>
    <p class="text-xs text-mind-muted mt-3">
      📖 <a href="https://psychology.northwestern.edu/people/faculty/core/profiles/zabelina-saporta-beeman-2015-flexible-or-leaky-attention-in-creative-people-preprint.pdf" target="_blank" class="text-mind-accent hover:underline">Zabelina et al. — Northwestern University (2015)</a>
    </p>
  </div>

  <!-- CONCEPTO + ANALOGIA -->
  <div class="space-y-8 mb-12">
    <div class="card fade-in">
      <h2 class="text-2xl font-bold mb-4">🎨 La Analogia del Artista en la Feria</h2>
      <p class="text-mind-muted leading-relaxed mb-4">
        Imaginate dos personas en una feria artesanal. La primera camina por el pasillo, mirando
        solo al frente, directo al puesto que busca. La segunda ve los colores de cada puesto,
        nota la textura del mantel de la abuela que vende pan, escucha la melodia del musico callejero,
        y conecta mentalmente el patron del tejido con un algoritmo que vio ayer.
      </p>
      <p class="text-mind-muted leading-relaxed">
        La primera persona llega mas rapido. La segunda persona <strong class="text-mind-accent">crea cosas que la primera
        jamas imaginaria</strong>. Esa segunda persona sos vos.
      </p>
    </div>

    <!-- CIENCIA FULL NERD -->
    <div class="science-callout fade-in">
      <h3 class="text-lg font-bold text-mind-purple mb-4">🔬 La Ciencia (Full Nerd Mode)</h3>

      <div class="space-y-6">
        <div>
          <h4 class="font-semibold text-mind-text mb-2">Atencion Permeable (Leaky Attention)</h4>
          <p class="text-sm text-mind-muted leading-relaxed">
            Zabelina et al. (2015, Northwestern University) descubrieron que las personas con
            logros creativos altos muestran una atencion menos enfocada — lo que llamaron
            <strong class="text-mind-text">"leaky attention"</strong> (atencion permeable).
          </p>
          <p class="text-sm text-mind-muted leading-relaxed mt-2">
            Esta atencion "con fugas" es <strong class="text-mind-accent">beneficiosa</strong>:
            permite detectar focos alternativos, combinar ideas de diferentes dominios, y generar
            conexiones novedosas. Pero tambien exige <strong class="text-mind-text">mas control cognitivo</strong>
            para mantener el foco cuando se necesita.
          </p>
          <p class="text-xs text-mind-muted mt-2">
            📖 <a href="https://psychology.northwestern.edu/people/faculty/core/profiles/zabelina-saporta-beeman-2015-flexible-or-leaky-attention-in-creative-people-preprint.pdf" target="_blank" class="text-mind-accent hover:underline">Zabelina et al. (2015) — Flexible or Leaky Attention in Creative People, Northwestern</a>
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-mind-text mb-2">La Paradoja del Hiperfoco</h4>
          <p class="text-sm text-mind-muted leading-relaxed">
            Un estudio de 2025 (PMC) encontro que el <strong class="text-mind-accent">68%</strong> de
            personas con rasgos creativos/ADHD reportan hiperfoco frecuente. La paradoja: el mismo
            mecanismo (niveles bajos de dopamina) que dificulta la concentracion, tambien causa
            inmersion total cuando encontras algo interesante.
          </p>
          <p class="text-sm text-mind-muted leading-relaxed mt-2">
            El hiperfoco aumento la productividad en un <strong class="text-mind-text">30%</strong>,
            particularmente en roles creativos. Pero tambien correlaciono con plazos perdidos y
            auto-cuidado descuidado.
          </p>
          <p class="text-xs text-mind-muted mt-2">
            📖 <a href="https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2022.909202/full" target="_blank" class="text-mind-accent hover:underline">Frontiers in Psychiatry — Creative Thinking and ADHD (2022)</a>
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-mind-text mb-2">Multipotencialidad: No es Falta de Foco</h4>
          <p class="text-sm text-mind-muted leading-relaxed">
            Emilie Wapnick (2015) acunio el termino <strong class="text-mind-text">"multipotencialita"</strong>
            para personas con multiples intereses y busquedas creativas. La confusio con ADHD es comun,
            pero Wapnick aclara: los multipotencialitas son <strong class="text-mind-accent">realmente buenos
            enfocandose</strong> — cuando estan interesados, van profundo y aprenden rapido.
          </p>
          <p class="text-sm text-mind-muted leading-relaxed mt-2">
            El problema no es falta de enfoque, sino <strong class="text-mind-text">exceso de variedad</strong>:
            invitan demasiadas cosas a sus vidas, impulsados por un deseo intenso de aprender y experimentar.
          </p>
          <p class="text-xs text-mind-muted mt-2">
            📖 <a href="https://puttylike.com/" target="_blank" class="text-mind-accent hover:underline">Emilie Wapnick — Puttylike & How to Be Everything (2017)</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="bg-mind-info/10 border border-mind-info/30 rounded-xl p-4 text-sm text-mind-muted">
      <p><strong class="text-mind-info">⚕️ Nota importante:</strong> Este modulo habla de rasgos creativos y
      multipotencialidad, no de trastornos clinicos. Si sospechas que podes tener ADHD u otra condicion,
      consulta con un profesional. Este curso no sustituye diagnostico ni tratamiento.</p>
    </div>
  </div>

  <!-- AUTO-DIAGNOSTICO MULTIPOTENCIAL -->
  <div class="exercise-card mb-12 fade-in">
    <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
      <span>🧭</span> Auto-Diagnostico: Tu Modelo Multipotencial
    </h3>
    <p class="text-mind-muted text-sm mb-4">
      Emilie Wapnick identifico 4 modelos de como las personas multipotenciales organizan sus vidas.
      No hay uno mejor que otro — cada uno tiene sus fortalezas. Descubri cual es el tuyo.
    </p>

    {#if !diagStarted}
      <button class="btn-primary" onclick={() => diagStarted = true}>
        Empezar diagnostico (5 preguntas) →
      </button>
    {:else if !diagFinished}
      <div class="space-y-6 slide-in">
        <div class="flex items-center justify-between text-sm text-mind-muted">
          <span>Pregunta {currentQuestion + 1} de {diagQuestions.length}</span>
        </div>
        <div class="w-full bg-mind-border/30 rounded-full h-1.5">
          <div
            class="bg-mind-accent h-1.5 rounded-full transition-all duration-500"
            style="width: {((currentQuestion + 1) / diagQuestions.length) * 100}%"
          ></div>
        </div>

        <h4 class="text-lg font-semibold">{currentDiagQuestion.question}</h4>

        <div class="space-y-3">
          {#each currentDiagQuestion.options as option, i}
            <button
              class="w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer
                {selectedOption === i
                  ? 'border-mind-accent bg-mind-accent/10'
                  : 'border-mind-border hover:border-mind-accent/50'}"
              onclick={() => selectDiagOption(i)}
            >
              <span class="text-sm leading-relaxed">{option.text}</span>
            </button>
          {/each}
        </div>

        {#if selectedOption !== null}
          <button class="btn-primary w-full justify-center" onclick={confirmDiagOption}>
            {currentQuestion < diagQuestions.length - 1 ? 'Siguiente →' : 'Ver mi perfil'}
          </button>
        {/if}
      </div>
    {:else}
      {@const topKey = getTopProfile()}
      {@const secondKey = getSecondProfile()}
      {@const topProfile = profiles[topKey]}
      {@const secondProfile = profiles[secondKey]}
      <div class="space-y-6 slide-in">
        <div class="text-center py-6">
          <span class="text-6xl block mb-3">{topProfile.emoji}</span>
          <h4 class="text-2xl font-black text-mind-accent">{topProfile.name}</h4>
          <p class="text-sm text-mind-muted mt-1">con rasgos de {secondProfile.emoji} {secondProfile.name}</p>
        </div>

        <div class="bg-mind-darker rounded-xl p-5 space-y-4">
          <div>
            <h5 class="font-semibold text-mind-text text-sm mb-1">Que significa</h5>
            <p class="text-sm text-mind-muted leading-relaxed">{topProfile.description}</p>
          </div>
          <div>
            <h5 class="font-semibold text-mind-text text-sm mb-1">Ejemplos</h5>
            <p class="text-sm text-mind-muted leading-relaxed">{topProfile.examples}</p>
          </div>
          <div>
            <h5 class="font-semibold text-mind-accent text-sm mb-1">Tu desafio y ventaja</h5>
            <p class="text-sm text-mind-muted leading-relaxed">{topProfile.advice}</p>
          </div>
        </div>

        <!-- Score breakdown -->
        <div class="grid grid-cols-2 gap-3">
          {#each Object.entries(scores).sort((a, b) => b[1] - a[1]) as [key, score]}
            <div class="bg-mind-card rounded-lg p-3 text-center">
              <span class="text-2xl">{profiles[key].emoji}</span>
              <p class="text-xs text-mind-muted mt-1">{profiles[key].name}</p>
              <div class="w-full bg-mind-border/30 rounded-full h-1.5 mt-2">
                <div
                  class="bg-mind-accent h-1.5 rounded-full"
                  style="width: {(score / 15) * 100}%"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <!-- OBSIDIAN TEMPLATE -->
  {#if diagFinished}
    {@const topKey = getTopProfile()}
    {@const topProfile = profiles[topKey]}
    <div class="obsidian-template mb-12 fade-in">
      <h3 class="text-lg font-bold mb-3 flex items-center gap-2 text-mind-teal">
        <span>💎</span> Template para Obsidian
      </h3>
      <p class="text-mind-muted text-sm mb-4">
        Copia esto en una nota nueva de Obsidian llamada <code class="bg-mind-darker px-2 py-0.5 rounded text-mind-teal">Mi Modelo Multipotencial.md</code>
      </p>
      {@html `<pre class="bg-mind-darker rounded-lg p-4 text-sm text-mind-teal/80 overflow-x-auto whitespace-pre-wrap"># Mi Modelo Multipotencial

## Resultado: ${topProfile.emoji} ${topProfile.name}

**Fecha:** ${new Date().toLocaleDateString('es-AR')}

## Que significa para mi
${topProfile.description}

## Mis intereses actuales
- [ ] (lista tus intereses activos)
- [ ]
- [ ]

## Mi desafio principal
${topProfile.advice}

## Proximos pasos
- [ ] En el Pilar 5 voy a diseñar mi sistema de rotacion basado en este modelo
- [ ] Registrar como distribuyo mi tiempo entre intereses esta semana

#multipotencial #mentes-con-ruido</pre>`}
    </div>
  {/if}

  <!-- EJERCICIO ANALOGICO -->
  <div class="notebook-exercise mb-12 fade-in">
    <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
      <span>📓</span> Ejercicio Analogico: Mapa de Tus Intereses
    </h3>
    <p class="text-mind-muted text-sm mb-4">
      Agarra tu cuaderno y dibuja un circulo grande en el centro de la pagina.
      Adentro escribi tu nombre.
    </p>
    <div class="bg-mind-darker rounded-xl p-4 text-sm space-y-2">
      <p class="font-semibold text-mind-rose">Instrucciones:</p>
      <ol class="text-mind-muted space-y-2 ml-4 list-decimal">
        <li>Dibuja ramas que salgan del circulo central — una por cada interes o pasion que tengas (dibujar, programar, leer, escribir, etc.)</li>
        <li>En cada rama, escribi <strong class="text-mind-text">cuanto tiempo llevas</strong> haciendo esa actividad</li>
        <li>Conecta con lineas las ramas que se <strong class="text-mind-accent">alimentan entre si</strong> (ej: leer alimenta escribir, dibujar alimenta disenar)</li>
        <li>Marcac con una estrella las que te generan <strong class="text-mind-text">hiperfoco</strong> (esas en las que te perdes horas sin darte cuenta)</li>
      </ol>
      <p class="text-mind-muted mt-3">
        Este mapa es la evidencia visual de que no sos una persona dispersa — sos una persona
        <strong class="text-mind-accent">conectada</strong>. Lo vas a usar en el Pilar 5 para disenar
        tu sistema de rotacion.
      </p>
    </div>
  </div>

  <!-- REFLEXION -->
  {#if moduleCompleted}
    <div class="card bg-gradient-to-b from-mind-accent/5 to-transparent border-mind-accent/20 mb-8 fade-in">
      <h3 class="text-xl font-bold mb-3">💭 Reflexion</h3>
      <p class="text-mind-muted leading-relaxed mb-4">
        Ahora sabes algo que cambia todo: <strong class="text-mind-accent">no estas roto</strong>.
        Tu atencion permeable es la misma caracteristica que te permite ver patrones donde otros no ven nada,
        conectar ideas de diferentes mundos, y crear cosas originales.
      </p>
      <p class="text-mind-muted leading-relaxed mb-4">
        El problema nunca fue tu cerebro — fue que nadie te enseño como <strong class="text-mind-text">trabajar
        CON el</strong> en lugar de contra el.
      </p>
      <p class="text-mind-muted leading-relaxed">
        En los proximos pilares vamos a construir exactamente eso: un sistema que respeta tu naturaleza creativa.
        Empezando por entender como funciona tu cerebro (Pilar 1), como construir habitos que duren (Pilar 2),
        y como usar tu energia de manera inteligente (Pilar 3).
      </p>
    </div>
  {/if}

  <SourcesSection sources={mod.sources} />
  <ModuleNav currentModule={2} />
</div>

<VocabularyFloat moduleId={2} />

{#if showBadge && earnedBadge}
  <BadgeNotification badge={earnedBadge} onClose={() => showBadge = false} />
{/if}
