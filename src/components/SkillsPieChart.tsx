"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { techIconUrl } from "@/lib/techIcons";

/* Vibrant segment colours: JS yellow, Python green, TS light blue, HTML red */
const SEGMENT_COLORS = [
  "#FFD93D", /* JavaScript – vibrant yellow */
  "#00C853", /* Python – vibrant green */
  "#29B6F6", /* TypeScript – vibrant light blue */
  "#FF5252", /* HTML – vibrant red */
];

const LABEL_FONT_SIZE = 15; /* 15% smaller than 18 */
const LABEL_ICON_SIZE = 21;

type LanguageItem = { name: string; percent: number; iconId: string };

export function SkillsPieChart({ items }: { items: readonly LanguageItem[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || items.length === 0) return;

    const chart = echarts.init(chartRef.current);

    const rich: Record<string, { backgroundColor?: { image: string }; width: number; height: number; color?: string; fontSize?: number }> = {};
    items.forEach((_, idx) => {
      rich[`icon${idx}`] = {
        backgroundColor: { image: techIconUrl(items[idx].iconId) },
        width: LABEL_ICON_SIZE,
        height: LABEL_ICON_SIZE,
      };
    });
    rich.name = {
      color: "#fff",
      fontSize: LABEL_FONT_SIZE,
      fontFamily: "var(--font-geist-sans), sans-serif",
    };

    const option: echarts.ComposeOption = {
      color: SEGMENT_COLORS,
      series: [
        {
          type: "pie",
          radius: [20, "58%"],
          center: ["52%", "50%"],
          roseType: "area",
          data: items.map((i) => ({ value: i.percent, name: i.name })),
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outside",
            formatter: (params: { dataIndex: number; name: string; value: number }) =>
              `{icon${params.dataIndex}|}\u00A0\u00A0{name|${params.name} ${params.value}%}`,
            rich,
            fontSize: LABEL_FONT_SIZE,
          },
          labelLine: {
            show: true,
            length: 14,
            length2: 12,
            lineStyle: { width: 1.5 },
          },
          emphasis: {
            scale: true,
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0,0,0,0.2)",
            },
            label: {
              formatter: (params: { dataIndex: number; name: string; value: number }) =>
                `{icon${params.dataIndex}|}\u00A0\u00A0{name|${params.name} ${params.value}%}`,
              rich,
            },
          },
        },
      ],
      legend: { show: false },
    };

    chart.setOption(option);

    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.dispose();
    };
  }, [items]);

  return (
    <div className="flex shrink-0 justify-end overflow-visible">
      <div
        ref={chartRef}
        className="h-56 w-[440px] sm:h-64 sm:w-[520px]"
        aria-label="Top languages by usage"
      />
    </div>
  );
}
