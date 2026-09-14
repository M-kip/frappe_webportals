<template>
  <section ref="sectionRef" class="w-full bg-[#061a2d] py-6 sm:py-8">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.id"
          class="flex flex-col items-center justify-center rounded-2xl border border-cyan-200/20 bg-[#0c2946] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#123d60]"
        >
          <div class="flex items-center justify-center gap-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            <FeatherIcon :name="stat.icon" class="h-5 w-5 text-cyan-300 sm:h-6 sm:w-6" />
            <span class="tabular-nums text-white">{{ formatValue(stat) }}</span>
          </div>
          <p class="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
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
