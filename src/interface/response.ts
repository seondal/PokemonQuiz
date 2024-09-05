export interface StatsI {
  name: string;
  image: string;
  stats: { name: string; value: number }[];
  total: number;
}
