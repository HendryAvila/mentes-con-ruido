<script lang="ts">
  import { courseStore } from '$lib/stores/course.svelte';
</script>

<div class="flex items-center gap-3">
  <div class="flex-1 bg-mind-border/30 rounded-full h-2">
    <div
      class="bg-gradient-to-r from-mind-accent to-mind-purple h-2 rounded-full transition-all duration-700"
      style="width: {courseStore.progressPercent}%"
    ></div>
  </div>
  <span class="text-xs text-mind-muted font-semibold">{courseStore.progressPercent}%</span>
</div>
