"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useTheme } from "next-themes";

const AXIS_LABELS = [
  "Pentest +",
  "Linux Administration",
  "CySA +",
  "A +",
  "Security +",
  "Network +",
] as const;

const VALUES = [88, 70, 78, 65, 84, 60] as const;
const LABEL_POSITIONS = [
  { top: "12%", left: "50%", translate: "-translate-x-1/2", align: "text-center" },
  { top: "31%", left: "74%", translate: "translate-x-0", align: "text-left" },
  { top: "65%", left: "74%", translate: "translate-x-0", align: "text-left" },
  { top: "88%", left: "50%", translate: "-translate-x-1/2", align: "text-center" },
  { top: "65%", left: "26%", translate: "-translate-x-full", align: "text-right" },
  { top: "31%", left: "26%", translate: "-translate-x-full", align: "text-right" },
] as const;

export function AboutSkillsRadar() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const indicator = AXIS_LABELS.map(() => ({
      // HTML labels are rendered around the chart for crisp, selectable text.
      name: "",
      max: 100,
    }));
    const neon = "#c084fc";
    const neonSoft = "rgba(192,132,252,0.16)";
    const isDarkMode =
      resolvedTheme === "dark" ||
      (resolvedTheme == null && document.documentElement.classList.contains("dark"));
    const labelColor = isDarkMode ? "#ffffff" : "#111124";

    chart.setOption({
      animation: true,
      animationDuration: 1250,
      animationEasing: "cubicOut",
      radar: {
        center: ["50%", "52%"],
        radius: "50%",
        startAngle: 90,
        splitNumber: 4,
        shape: "polygon",
        indicator,
        axisNameGap: 26,
        axisName: { show: false, color: labelColor, fontSize: 14, fontWeight: 700 },
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

    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.dispose();
    };
  }, [resolvedTheme]);

  return (
    <div className="mt-6">
      <p className="mb-3 text-center font-nulshock text-lg font-semibold text-foreground sm:text-xl dark:text-white">
        6 Courses
      </p>
      <div className="relative h-[20rem] w-full">
        <div
          ref={chartRef}
          className="absolute inset-0"
          aria-label="Cyber security course radar chart"
        />
        {AXIS_LABELS.map((label, idx) => {
          const pos = LABEL_POSITIONS[idx];
          const isBottomCenter = idx === 3;
          return (
            <span
              key={label}
              className={`absolute z-10 max-w-[10rem] -translate-y-1/2 text-sm font-semibold leading-5 text-foreground dark:text-white ${pos.translate} ${pos.align} ${isBottomCenter ? "min-w-[3rem]" : ""}`}
              style={{ top: pos.top, left: pos.left }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
