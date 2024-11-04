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
            <b className="w-20 text-center">{item.name}</b>
            <kbd className="w-10 text-center">{item.value}</kbd>
            <div className="w-full flex flex-1 items-center">
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
        <b className="w-20 text-center">총합</b>
        <kbd className="w-10 text-center">{total}</kbd>
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
