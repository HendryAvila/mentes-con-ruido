<script lang="ts">
  import { courseStore, allBadges } from '$lib/stores/course.svelte';
  import { modules } from '$lib/data/modules';
  import ModuleNav from '$lib/components/ModuleNav.svelte';
  import SourcesSection from '$lib/components/SourcesSection.svelte';
  import VocabularyFloat from '$lib/components/VocabularyFloat.svelte';
  import BadgeNotification from '$lib/components/BadgeNotification.svelte';
  import Quiz from '$lib/components/Quiz.svelte';
  import type { Badge } from '$lib/stores/course.svelte';

  const mod = modules.find(m => m.id === 1)!;

  let showBadge = $state(false);
  let earnedBadge = $state<Badge | null>(null);
  let selfInterruptCount = $state(0);
  let showSelfAssessment = $state(false);
  let assessmentDone = $state(false);
  let showCostCalculator = $state(false);
  let dailyInterruptions = $state(8);
  let moduleCompleted = $state(false);

  const dailyCostMinutes = $derived(dailyInterruptions * 23);
  const dailyCostHours = $derived(Math.round(dailyCostMinutes / 60 * 10) / 10);
  const yearlyCostDays = $derived(Math.round(dailyCostMinutes * 250 / 60 / 8));

  const quizQuestions = [
    {
      question: 'Segun la investigacion de Gloria Mark (20 anios de datos), cual es el span atencional promedio en pantalla?',
      options: [
        { text: '2 minutos 30 segundos', correct: false, explanation: 'Ese era el promedio en 2003. Desde entonces, bajo drasticamente.' },
        { text: '47 segundos', correct: true, explanation: 'Correcto. Mark midio el declive desde 2.5 min (2003) hasta 47 seg (2016), replicado en 5+ estudios posteriores.' },
        { text: '5 minutos', correct: false, explanation: 'Nunca fue tan alto en las mediciones de Mark. Incluso el dato de 2003 era de solo 2.5 minutos.' },
        { text: '75 segundos', correct: false, explanation: 'Ese fue el dato de 2012 — un punto intermedio en el declive. Para 2016 ya habia bajado a 47 seg.' }
      ],
      source: 'Gloria Mark — Attention Span (2023)',
      sourceUrl: 'https://gloriamark.com/attention-span/'
    },
    {
      question: 'Despues de una interrupcion, cuanto tiempo tarda en promedio una persona en volver a enfocarse completamente en la tarea original?',
      options: [
        { text: '5 minutos', correct: false, explanation: 'Seria lindo, pero no. El cerebro necesita mucho mas tiempo para reconstruir el contexto mental de la tarea abandonada.' },
        { text: '23 minutos y 15 segundos', correct: true, explanation: 'Exacto. Mark, Gudith & Klocke (2008) midieron este costo con precision. Y la gente compensa trabajando MAS rapido, lo que genera mas estres.' },
        { text: '10 minutos', correct: false, explanation: 'Subestimado. El residuo atencional (Sophie Leroy) persiste mucho mas de lo que intuimos.' },
        { text: '45 minutos', correct: false, explanation: 'Sobreestimado. Aunque se siente asi, el dato empirico es de ~23 minutos.' }
      ],
      source: 'Mark, Gudith & Klocke (2008)',
      sourceUrl: 'https://dl.acm.org/doi/10.1145/1357054.1357072'
    },
    {
      question: 'Segun la investigacion, cual es la fuente PRINCIPAL de interrupciones en tu dia laboral?',
      options: [
        { text: 'Companeros de trabajo y reuniones', correct: false, explanation: 'Son una fuente real, pero no la principal. La investigacion muestra un culpable mas cercano.' },
        { text: 'Notificaciones del telefono', correct: false, explanation: 'Contribuyen, pero no son el enemigo #1. Incluso con notificaciones silenciadas, el problema persiste.' },
        { text: 'Vos mismo (auto-interrupcion)', correct: true, explanation: 'Correcto. Gloria Mark descubrio que nos interrumpimos a nosotros mismos MAS que las interrupciones externas. El enemigo esta adentro.' },
        { text: 'Emails y mensajes de trabajo', correct: false, explanation: 'Son un factor, pero la auto-interrupcion los supera. Revisamos el mail porque NOSOTROS decidimos hacerlo, no porque llego una notificacion.' }
      ],
      source: 'Gloria Mark — Regaining Focus (UC Irvine)',
      sourceUrl: 'https://www.informatics.uci.edu/regaining-focus-in-a-world-of-digital-distractions/'
    },
    {
      question: 'Sophie Leroy acunio el termino "residuo atencional". Que significa exactamente?',
      options: [
        { text: 'La fatiga mental que se acumula al final del dia', correct: false, explanation: 'La fatiga es real pero es otro fenomeno. El residuo atencional es especifico al cambio de tarea.' },
        { text: 'La persistencia de actividad cognitiva sobre la Tarea A cuando ya estas haciendo la Tarea B', correct: true, explanation: 'Exacto. Tu cerebro sigue procesando la tarea anterior en segundo plano, degradando tu rendimiento en la actual. Peor cuando dejaste la tarea A sin terminar.' },
        { text: 'El olvido que ocurre despues de una distraccion prolongada', correct: false, explanation: 'El residuo es lo contrario del olvido — es la persistencia no deseada del procesamiento cognitivo previo.' },
        { text: 'La perdida de informacion entre sesiones de trabajo', correct: false, explanation: 'Eso seria un problema de memoria a largo plazo. El residuo atencional opera en minutos, no horas.' }
      ],
      source: 'Sophie Leroy — Attention Residue (2009)',
      sourceUrl: 'https://www.researchgate.net/publication/46489122'
    }
  ];

  function handleQuizComplete(score: number, total: number) {
    moduleCompleted = true;
    courseStore.completeModule(1, score, total);
    const badge = courseStore.unlockBadge('primer-paso');
    if (badge) {
      earnedBadge = badge;
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
    <div class="flex justify-center gap-4 mt-4 text-sm text-mind-muted">
      <span>⏱️ {mod.duration}</span>
      <span>·</span>
      <span>{mod.type}</span>
    </div>
  </div>

  <!-- DATO PROVOCADOR -->
  <div class="provocative-data mb-12 fade-in">
    <p class="text-mind-muted text-sm uppercase tracking-widest mb-3">Dato provocador</p>
    <p class="stat-number">47</p>
    <p class="stat-number text-3xl">segundos</p>
    <p class="text-mind-muted mt-4 max-w-xl mx-auto leading-relaxed">
      Eso es lo que dura tu atencion en pantalla. No es una opinion — es el resultado de
      <strong class="text-mind-text">20 anios de investigacion</strong> de Gloria Mark,
      Chancellor's Professor en UC Irvine.
    </p>
    <p class="text-xs text-mind-muted mt-3">
      📖 <a href="https://gloriamark.com/attention-span/" target="_blank" class="text-mind-accent hover:underline">Mark, G. — Attention Span (2023)</a>
    </p>
  </div>

  <!-- CONCEPTO + ANALOGIA -->
  <div class="space-y-8 mb-12">
    <div class="card fade-in">
      <h2 class="text-2xl font-bold mb-4">🎭 La Analogia del Director de Orquesta Borracho</h2>
      <p class="text-mind-muted leading-relaxed mb-4">
        Imaginate un director de orquesta que cada 47 segundos se da vuelta, mira al publico,
        revisa su telefono, se acuerda de que tiene que comprar leche, y despues intenta volver
        a dirigir la sinfonia. Eso es tu cerebro en una pantalla.
      </p>
      <p class="text-mind-muted leading-relaxed">
        Pero aca viene lo peor: cada vez que se da vuelta, necesita
        <strong class="text-mind-accent">23 minutos y 15 segundos</strong> para recordar en que
        compas iba. Y no estoy exagerando — esa es la cifra exacta de
        <em>Mark, Gudith & Klocke (2008)</em>.
      </p>
    </div>

    <!-- CIENCIA FULL NERD -->
    <div class="science-callout fade-in">
      <h3 class="text-lg font-bold text-mind-purple mb-4">🔬 La Ciencia (Full Nerd Mode)</h3>

      <div class="space-y-6">
        <div>
          <h4 class="font-semibold text-mind-text mb-2">El Declive del Span Atencional</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-mind-muted border-b border-mind-purple/20">
                  <th class="py-2 pr-4">Anio</th>
                  <th class="py-2 pr-4">Span promedio</th>
                  <th class="py-2">Fuente</th>
                </tr>
              </thead>
              <tbody class="text-mind-muted">
                <tr class="border-b border-mind-border/20">
                  <td class="py-2 pr-4 font-semibold text-mind-text">2003</td>
                  <td class="py-2 pr-4">2 min 30 seg</td>
                  <td class="py-2">Gloria Mark, UC Irvine</td>
                </tr>
                <tr class="border-b border-mind-border/20">
                  <td class="py-2 pr-4 font-semibold text-mind-text">2012</td>
                  <td class="py-2 pr-4">75 segundos</td>
                  <td class="py-2">Replicacion Mark</td>
                </tr>
                <tr class="border-b border-mind-border/20">
                  <td class="py-2 pr-4 font-semibold text-mind-accent">2016</td>
                  <td class="py-2 pr-4 font-bold text-mind-accent">47 segundos</td>
                  <td class="py-2">5+ estudios replicados</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-mind-text mb-2">El Costo Real de Cada Interrupcion</h4>
          <ul class="space-y-2 text-sm text-mind-muted">
            <li class="flex items-start gap-2">
              <span class="text-mind-accent mt-0.5">→</span>
              <span><strong class="text-mind-text">23 min 15 seg</strong> para volver a la tarea original (Mark, Gudith & Klocke, 2008)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-mind-accent mt-0.5">→</span>
              <span>Las personas compensan trabajando <strong class="text-mind-text">mas rapido</strong>, pero el precio es mayor estres, frustracion y cortisol elevado</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-mind-accent mt-0.5">→</span>
              <span>El <strong class="text-mind-text">40% del tiempo productivo</strong> se pierde en cambio de contexto (estimaciones basadas en investigacion)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-mind-accent mt-0.5">→</span>
              <span>Costo global estimado: <strong class="text-mind-text">$450 mil millones/anio</strong> en productividad perdida</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-mind-text mb-2">El Descubrimiento mas Incomodo</h4>
          <p class="text-sm text-mind-muted leading-relaxed">
            Gloria Mark descubrio que <strong class="text-mind-accent">te interrumpis a vos mismo MAS
            de lo que te interrumpen los demas</strong>. Leiste bien. El enemigo no esta afuera —
            esta adentro. Cada vez que "rapidito reviso el mail" o "voy a ver que hay en Instagram
            un segundo", sos vos eligiendo destruir tu propio foco.
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-mind-text mb-2">Residuo Atencional (Sophie Leroy, 2009)</h4>
          <p class="text-sm text-mind-muted leading-relaxed">
            Cuando cambias de tarea SIN terminar la anterior, parte de tu cerebro sigue procesando
            la tarea vieja. Leroy llamo a esto <em>"residuo atencional"</em> — como si tu mente
            dejara un fantasma en la tarea anterior. Mientras mas fuerte el residuo,
            <strong class="text-mind-text">peor tu rendimiento</strong> en la tarea nueva.
          </p>
          <p class="text-xs text-mind-muted mt-2">
            📖 <a href="https://www.researchgate.net/publication/46489122" target="_blank" class="text-mind-accent hover:underline">Leroy, S. (2009) — Why is it so Hard to do My Work? ResearchGate</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- EJERCICIO INTERACTIVO 1: Auto-observacion -->
  <div class="exercise-card mb-12 fade-in">
    <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
      <span>✏️</span> Ejercicio: Tu Propia Matematica del Desastre
    </h3>
    <p class="text-mind-muted text-sm mb-6">
      Vamos a calcular cuanto te cuesta el cambio de contexto. No te voy a decir un numero generico —
      vamos a calcularlo con TUS datos.
    </p>

    {#if !showCostCalculator}
      <button class="btn-primary" onclick={() => showCostCalculator = true}>
        Calcular mi costo personal →
      </button>
    {:else}
      <div class="space-y-6 slide-in">
        <div>
          <label for="interruptions-slider" class="block text-sm font-semibold text-mind-text mb-2">
            En un dia tipico de trabajo, cuantas veces estimas que cambias de tarea o te interrumpis?
          </label>
          <p class="text-xs text-mind-muted mb-3">
            Incluye: revisar el telefono, abrir redes sociales, responder un mensaje, ir a buscar cafe, una notificacion...
          </p>
          <input
            id="interruptions-slider"
            type="range"
            min="2"
            max="40"
            bind:value={dailyInterruptions}
            class="w-full accent-mind-accent"
          />
          <div class="flex justify-between text-sm text-mind-muted mt-1">
            <span>2</span>
            <span class="text-2xl font-black text-mind-accent">{dailyInterruptions}</span>
            <span>40</span>
          </div>
        </div>

        <div class="bg-mind-darker rounded-xl p-5 space-y-3">
          <h4 class="font-bold text-mind-accent text-sm uppercase tracking-wider">Tu Costo Personal</h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-3xl font-black text-mind-accent">{dailyCostMinutes}</p>
              <p class="text-xs text-mind-muted">minutos/dia perdidos</p>
            </div>
            <div>
              <p class="text-3xl font-black text-mind-purple">{dailyCostHours}</p>
              <p class="text-xs text-mind-muted">horas/dia en re-enfoque</p>
            </div>
            <div>
              <p class="text-3xl font-black text-mind-rose">{yearlyCostDays}</p>
              <p class="text-xs text-mind-muted">dias laborales/anio</p>
            </div>
          </div>
          <p class="text-xs text-mind-muted mt-3 text-center">
            Calculo: {dailyInterruptions} interrupciones x 23 min cada una = {dailyCostMinutes} min/dia.
            Sobre 250 dias laborales al anio = <strong class="text-mind-accent">{yearlyCostDays} dias completos</strong> perdidos solo en re-enfocarte.
          </p>
        </div>
      </div>
    {/if}
  </div>

  <!-- EJERCICIO ANALOGICO: Cuaderno -->
  <div class="notebook-exercise mb-12 fade-in">
    <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
      <span>📓</span> Ejercicio Analogico: Diario de Interrupciones
    </h3>
    <p class="text-mind-muted text-sm mb-4">
      Agarra tu cuaderno y durante las proximas 2 horas (o manana durante la manana), registra
      CADA vez que cambias de tarea. No juzgues, solo anota.
    </p>
    <div class="bg-mind-darker rounded-xl p-4 text-sm space-y-2">
      <p class="font-semibold text-mind-rose">En tu cuaderno, dibuja una tabla con estas columnas:</p>
      <ul class="text-mind-muted space-y-1 ml-4">
        <li>• <strong class="text-mind-text">Hora</strong> — cuando cambiaste</li>
        <li>• <strong class="text-mind-text">De que</strong> — que estabas haciendo</li>
        <li>• <strong class="text-mind-text">A que</strong> — a que cambiaste</li>
        <li>• <strong class="text-mind-text">Tipo</strong> — externa (alguien te interrumpio) o interna (vos decidiste cambiar)</li>
      </ul>
      <p class="text-mind-muted mt-3">
        Al final, conta cuantas fueron <strong class="text-mind-accent">internas vs externas</strong>.
        Preparate para la sorpresa.
      </p>
    </div>
  </div>

  <!-- QUIZ -->
  <div class="mb-12">
    <h3 class="text-xl font-bold mb-4 text-center">🧪 Comprobemos que entendiste</h3>
    <Quiz questions={quizQuestions} onComplete={handleQuizComplete} />
  </div>

  <!-- REFLEXION -->
  {#if moduleCompleted}
    <div class="card bg-gradient-to-b from-mind-accent/5 to-transparent border-mind-accent/20 mb-8 fade-in">
      <h3 class="text-xl font-bold mb-3">💭 Reflexion</h3>
      <p class="text-mind-muted leading-relaxed mb-4">
        Ahora sabes el numero: <strong class="text-mind-accent">47 segundos</strong>.
        Sabes que te cuesta <strong class="text-mind-accent">23 minutos</strong> cada interrupcion.
        Y sabes que la mayoria de esas interrupciones <strong class="text-mind-accent">las elegis vos</strong>.
      </p>
      <p class="text-mind-muted leading-relaxed">
        Pero aca viene lo importante: <strong class="text-mind-text">esto no es tu culpa</strong>.
        Tu cerebro no fue disenado para el mundo de 2026. El siguiente modulo te va a explicar
        por que — y te va a dar la mejor noticia que escuchaste en mucho tiempo.
      </p>
    </div>
  {/if}

  <SourcesSection sources={mod.sources} />
  <ModuleNav currentModule={1} />
</div>

<VocabularyFloat moduleId={1} />

{#if showBadge && earnedBadge}
  <BadgeNotification badge={earnedBadge} onClose={() => showBadge = false} />
{/if}
