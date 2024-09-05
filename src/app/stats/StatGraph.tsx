import { StatI } from "@/interface/response";

interface StatGraphI {
  stats: StatI[];
  total: number;
}

const BAR_COLORS = [
  "#F60001",
  "#E97B2D",
  "#F0C92E",
  "#638CE8",
  "#75C24B",
  "#EF5584",
];

export default function StatGraph({ stats, total }: StatGraphI) {
  return (
    <div className="flex flex-col gap-1">
      {stats.map((item, idx) => {
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
      <div key={"총합"} className="flex justify-between">
        <div className="w-20">총합: </div>
        <div className="w-10">{total}</div>
        <div className="w-full flex flex-1">
          <div
            className="h-5 bg-purple-600"
            style={{
              width: `${(total / 1530) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
