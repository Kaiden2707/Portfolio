"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const LABELS = [
  "Pentest +",
  "Network +",
  "CySA +",
  "A +",
  "Security +",
  "Linux Administration",
] as const;

const VALUES = [88, 83, 78, 65, 84, 76] as const;

export function AboutSkillsRadar() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const indicator = LABELS.map((name) => ({ name, max: 100 }));
    const neon = "#c084fc";
    const neonSoft = "rgba(192,132,252,0.16)";
    const labelVisible = "rgba(232, 224, 255, 0.92)";

    chart.setOption({
      animation: true,
      animationDuration: 1250,
      animationEasing: "cubicOut",
      radar: {
        center: ["50%", "56%"],
        radius: "66%",
        startAngle: 90,
        splitNumber: 4,
        shape: "polygon",
        indicator,
        axisName: {
          color: "rgba(232, 224, 255, 0)",
          fontSize: 11,
          fontWeight: 500,
        },
        axisLine: {
          lineStyle: {
            color: "rgba(192,132,252,0.25)",
            width: 1,
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(192,132,252,0.22)",
            width: 1,
          },
        },
        splitArea: {
          areaStyle: {
            color: [
              "rgba(255,255,255,0.01)",
              "rgba(168,85,247,0.02)",
              "rgba(255,255,255,0.01)",
              "rgba(168,85,247,0.03)",
            ],
          },
        },
      },
      series: [
        {
          type: "radar",
          symbol: "circle",
          symbolSize: 3,
          lineStyle: {
            color: neon,
            width: 2,
            shadowBlur: 14,
            shadowColor: "rgba(192,132,252,0.75)",
          },
          itemStyle: {
            color: neon,
            borderColor: neon,
            shadowBlur: 8,
            shadowColor: "rgba(192,132,252,0.6)",
          },
          areaStyle: {
            color: neonSoft,
          },
          data: [{ value: VALUES }],
        },
      ],
    });

    const labelTimer = window.setTimeout(() => {
      chart.setOption({
        radar: {
          axisName: { color: labelVisible },
        },
      });
    }, 500);

    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(labelTimer);
      window.removeEventListener("resize", onResize);
      chart.dispose();
    };
  }, []);

  return (
    <div className="mt-6 rounded-2xl border border-accent/35 bg-[#0d0b17]/95 p-4 shadow-[0_0_22px_rgba(var(--accent-rgb)/0.24)]">
      <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.16em] text-white/75">
        6 Courses
      </p>
      <div ref={chartRef} className="h-[18rem] w-full" aria-label="Cyber security course radar chart" />
    </div>
  );
}
