"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import type { Activity } from "react-activity-calendar";

const API_BASE = "https://github-contributions-api.jogruber.de/v4";

const greenTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export interface GitHubContributionsCalendarProps {
  username: string;
  year?: number | "last";
  className?: string;
}

interface ApiResponse {
  total?: Record<string, number>;
  contributions: Activity[];
}

function getLast7Days(year: number): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (d.getFullYear() === year) {
      dates.push(d.toISOString().slice(0, 10));
    }
  }
  return dates;
}

export function GitHubContributionsCalendar({
  username,
  year = 2026,
  className = "",
}: GitHubContributionsCalendarProps) {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<Activity | null>(null);

  const yearNum = typeof year === "number" ? year : new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/${username}?y=${year}`)
      .then((res) => res.json())
      .then((json: ApiResponse) => {
        if (!json.contributions) throw new Error("Invalid response");
        setData(json);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => setLoading(false));
  }, [mounted, username, year]);

  const renderBlock = useCallback(
    (block: React.ReactElement, activity: Activity) => {
      return React.cloneElement(block, {
        onMouseEnter: () => setHovered(activity),
        onMouseLeave: () => setHovered(null),
      } as Record<string, unknown>);
    },
    []
  );

  if (!mounted) {
    return (
      <div className={className} style={{ minHeight: 200 }} aria-hidden>
        <div className="animate-pulse rounded-lg bg-surface/50" style={{ height: 200 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <p className="text-sm text-muted">
          Error – Fetching GitHub contribution data for &quot;{username}&quot; failed.
        </p>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className={className} style={{ minHeight: 200 }} aria-hidden>
        <div className="animate-pulse rounded-lg bg-surface/50" style={{ height: 200 }} />
      </div>
    );
  }

  const contributions = data.contributions;
  const total =
    (typeof year === "number" && data.total?.[String(year)]) ??
    contributions.reduce((s, c) => s + c.count, 0);
  const last7Dates = getLast7Days(yearNum);
  const byDate = Object.fromEntries(contributions.map((c) => [c.date, c]));
  const thisWeek = last7Dates.reduce(
    (s, d) => s + (byDate[d]?.count ?? 0),
    0
  );
  const bestDay =
    contributions.length > 0
      ? Math.max(...contributions.map((c) => c.count))
      : 0;
  const statBlocks = [
    { label: "Total", value: total },
    { label: "This Week", value: thisWeek },
    { label: "Best Day", value: bestDay },
  ];

  return (
    <div className={className}>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {statBlocks.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-surface/80 px-4 py-3 text-center"
          >
            <div className="text-[10px] uppercase tracking-wider text-muted">
              {label}
            </div>
            <div className="mt-0.5 text-lg font-semibold tabular-nums text-foreground">
              {value}
            </div>
          </div>
        ))}
      </div>
      <ActivityCalendar
        data={contributions}
        theme={greenTheme}
        blockSize={14}
        blockMargin={5}
        fontSize={13}
        maxLevel={4}
        renderBlock={renderBlock}
        labels={{
          totalCount: "{{count}} contributions in {{year}}",
          legend: { less: "Less", more: "More" },
        }}
      />
      <div
        className="mt-3 min-h-[1.5rem] text-right text-sm text-muted"
        aria-live="polite"
      >
        {hovered
          ? `${hovered.count} contribution${hovered.count !== 1 ? "s" : ""} on ${hovered.date}`
          : "\u00A0"}
      </div>
    </div>
  );
}
