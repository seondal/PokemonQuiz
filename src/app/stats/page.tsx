"use client";

import { StatsI } from "@/interface/response";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const BAR_COLORS = [
  "#F60001",
  "#E97B2D",
  "#F0C92E",
  "#638CE8",
  "#75C24B",
  "#EF5584",
];

export default function Home() {
  const { data, isLoading } = useSWR<StatsI>("/api/stats/180", fetcher);

  return (
    <div>
      <div className="flex flex-col gap-1">
        {data?.stats.map((item, idx) => {
          const widthPercent = `${Math.round((item.value / 255) * 100)}%`;
          return (
            <div key={item.name} className="flex justify-between">
              <div className="w-20">{item.name}: </div>
              <div className="w-10">{item.value}</div>
              <div className="w-full flex flex-1">
                <div
                  className="h-5"
                  style={{
                    width: widthPercent,
                    backgroundColor: BAR_COLORS[idx],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
