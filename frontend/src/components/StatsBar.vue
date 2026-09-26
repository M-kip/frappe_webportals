<template>
  <section ref="sectionRef" class="w-full bg-transparent py-10 sm:py-14">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-sm md:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.id"
          class="group relative flex min-h-36 items-center gap-3 border-slate-200/80 px-4 py-6 transition-colors duration-300 even:border-l md:border-l md:px-6 md:py-8 md:first:border-l-0 hover:bg-sky-50/65"
        >
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-50 text-sky-700 ring-1 ring-sky-200/80 transition-transform duration-300 group-hover:scale-105">
            <Icon :icon="stat.icon ? `lucide-${stat.icon}` : 'lucide-activity'" class="h-5 w-5" />
          </div>
          <div class="min-w-0 text-left">
            <div class="text-2xl font-black leading-none tracking-tight text-slate-950 sm:text-3xl">
              <span class="tabular-nums">{{ formatValue(stat) }}</span>
            </div>
            <p class="mt-2 truncate text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue";
import { Icon } from "frappe-ui";

interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
  numericValue?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

const props = defineProps<{ stats: Stat[] }>();

const sectionRef = ref<HTMLElement | null>(null);
const displayValues = reactive<Record<number, number>>({});
let observer: IntersectionObserver | null = null;
let animationFrame: number | null = null;
let hasAnimated = false;

function parseStat(stat: Stat): { target: number; prefix: string; suffix: string; decimals: number } {
  if (stat.numericValue !== undefined) {
    return {
      target: stat.numericValue,
      prefix: stat.prefix ?? "",
      suffix: stat.suffix ?? "",
      decimals: stat.decimals ?? 0,
    };
  }

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
    { threshold: 0.3 },
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