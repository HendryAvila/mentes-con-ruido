<script lang="ts">
  interface QuizOption {
    text: string;
    correct: boolean;
    explanation: string;
  }

  interface QuizQuestion {
    question: string;
    options: QuizOption[];
    source?: string;
    sourceUrl?: string;
  }

  let { questions, onComplete }: { questions: QuizQuestion[]; onComplete?: (score: number, total: number) => void } = $props();

  let currentIndex = $state(0);
  let selectedIndex = $state<number | null>(null);
  let showExplanation = $state(false);
  let score = $state(0);
  let finished = $state(false);

  const current = $derived(questions[currentIndex]);

  function selectOption(index: number) {
    if (showExplanation) return;
    selectedIndex = index;
    showExplanation = true;
    if (current.options[index].correct) {
      score++;
    }
  }

  function next() {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      selectedIndex = null;
      showExplanation = false;
    } else {
      finished = true;
      onComplete?.(score, questions.length);
    }
  }
</script>

{#if !finished}
  <div class="card space-y-5">
    <div class="flex items-center justify-between text-sm text-mind-muted">
      <span>Pregunta {currentIndex + 1} de {questions.length}</span>
      <span class="text-mind-accent font-semibold">{score} correctas</span>
    </div>

    <div class="w-full bg-mind-border/30 rounded-full h-1.5">
      <div
        class="bg-mind-accent h-1.5 rounded-full transition-all duration-500"
        style="width: {((currentIndex + 1) / questions.length) * 100}%"
      ></div>
    </div>

    <h3 class="text-lg font-semibold text-mind-text leading-relaxed">
      {current.question}
    </h3>

    <div class="space-y-3">
      {#each current.options as option, i}
        <button
          class="w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer
            {selectedIndex === null
              ? 'border-mind-border hover:border-mind-accent/50 hover:bg-mind-accent/5'
              : option.correct
                ? 'border-mind-success bg-mind-success/10'
                : selectedIndex === i
                  ? 'border-mind-danger bg-mind-danger/10'
                  : 'border-mind-border/30 opacity-50'
            }"
          onclick={() => selectOption(i)}
          disabled={showExplanation}
        >
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-7 h-7 rounded-full border border-mind-border flex items-center justify-center text-xs font-bold
              {selectedIndex !== null && option.correct ? 'bg-mind-success text-mind-darker border-mind-success' : ''}
              {selectedIndex === i && !option.correct ? 'bg-mind-danger text-white border-mind-danger' : ''}
            ">
              {String.fromCharCode(65 + i)}
            </span>
            <span class="text-sm leading-relaxed">{option.text}</span>
          </div>
        </button>

        {#if showExplanation && (selectedIndex === i || option.correct)}
          <div class="ml-10 text-sm text-mind-muted slide-in px-3 pb-1">
            {option.explanation}
          </div>
        {/if}
      {/each}
    </div>

    {#if showExplanation && current.source}
      <p class="text-xs text-mind-muted mt-2">
        📖 Fuente:
        {#if current.sourceUrl}
          <a href={current.sourceUrl} target="_blank" rel="noopener" class="text-mind-accent hover:underline">{current.source}</a>
        {:else}
          {current.source}
        {/if}
      </p>
    {/if}

    {#if showExplanation}
      <button class="btn-primary w-full justify-center mt-4" onclick={next}>
        {currentIndex < questions.length - 1 ? 'Siguiente pregunta →' : 'Ver resultado'}
      </button>
    {/if}
  </div>
{:else}
  <div class="card text-center space-y-4">
    <div class="stat-number">{score}/{questions.length}</div>
    <p class="text-mind-muted">
      {score === questions.length
        ? '¡Perfecto! Dominaste este tema. 🔬'
        : score >= questions.length * 0.7
          ? '¡Muy bien! Tenes una base solida. 💪'
          : 'Hay espacio para profundizar. Volve a revisar las fuentes. 📚'
      }
    </p>
  </div>
{/if}
