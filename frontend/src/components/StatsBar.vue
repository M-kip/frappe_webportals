<template>
  <section ref="sectionRef" class="bg-sky-700 py-10">
    <div class="container mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        <div v-for="stat in stats" :key="stat.id" class="text-white">
          <div class="flex items-center justify-center text-3xl font-extrabold sm:text-4xl">
            <FeatherIcon :name="stat.icon" class="mr-2 h-7 w-7 text-sky-200" />
            <span class="tabular-nums">{{ formatValue(stat) }}</span>
          </div>
          <p class="mt-2 text-sm font-medium uppercase tracking-wide text-sky-100">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue";
import { FeatherIcon } from "frappe-ui";

interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
  /** Numeric target for the count-up animation. Use 0 to skip. */
  numericValue?: number;
  /** Decimal places when formatted. */
  decimals?: number;
  /** Optional prefix (e.g. "+") or suffix (e.g. "/5"). */
  prefix?: string;
  suffix?: string;
}

const props = defineProps<{
  stats: Stat[];
}>();

const sectionRef = ref<HTMLElement | null>(null);
const displayValues = reactive<Record<number, number>>({});
let observer: IntersectionObserver | null = null;
let animationFrame: number | null = null;
let hasAnimated = false;

// Parse a stat value like "10+", "5,000+", "4.9", "24/7" into numeric target + suffix
function parseStat(stat: Stat): { target: number; prefix: string; suffix: string; decimals: number } {
  if (stat.numericValue !== undefined) {
    return {
      target: stat.numericValue,
      prefix: stat.prefix ?? "",
      suffix: stat.suffix ?? "",
      decimals: stat.decimals ?? 0,
    };
  }
  // Auto-parse string values
  const raw = stat.value.trim();
  const match = raw.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (match) {
    const prefix = match[1] ?? "";
    const numeric = parseFloat((match[2] ?? "0").replace(/,/g, ""));
    const suffix = match[3] ?? "";
    const decimals = (match[2] ?? "").includes(".") ? 1 : 0;
    return { target: numeric, prefix, suffix, decimals };
  }
  return { target: 0, prefix: "", suffix: raw, decimals: 0 };
}

function formatValue(stat: Stat): string {
  const parsed = parseStat(stat);
  if (!hasAnimated && stat.numericValue === undefined && !/^\d/.test(stat.value)) {
    // Non-numeric values like "24/7" — show as-is before animation
    return stat.value;
  }
  const current = displayValues[stat.id] ?? 0;
  const num = parsed.decimals > 0 ? current.toFixed(parsed.decimals) : Math.round(current).toLocaleString();
  return `${parsed.prefix}${num}${parsed.suffix}`;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function animate() {
  const duration = 1800;
  const start = performance.now();
  const targets: Record<number, { target: number; decimals: number }> = {};
  for (const stat of props.stats) {
    const parsed = parseStat(stat);
    if (parsed.target > 0) {
      targets[stat.id] = { target: parsed.target, decimals: parsed.decimals };
    }
  }

  function step(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    for (const id in targets) {
      const { target, decimals } = targets[id]!;
      displayValues[+id] = decimals > 0 ? target * eased : Math.round(target * eased);
    }
    if (progress < 1) {
      animationFrame = requestAnimationFrame(step);
    }
  }
  animationFrame = requestAnimationFrame(step);
}

onMounted(() => {
  // Pre-populate so non-numeric stats show their full value
  for (const stat of props.stats) {
    displayValues[stat.id] = 0;
  }

  if (!sectionRef.value) return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animate();
          observer?.disconnect();
          break;
        }
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(sectionRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>
