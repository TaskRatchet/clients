import { Goal, GoalVerbose } from "./types";

export type AutodialSettings = {
  autodial: boolean;
  min: number;
  max: number;
  strict: boolean;
  add: number;
  times: number;
  from?: string;
  fromGoal?: GoalVerbose;
};

function parseOptionFloat(
  haystack: string,
  hashtag: string,
  fallback: number
): number {
  const match = parseHashtag(haystack, hashtag, "(-?\\d*\\.?\\d+)");

  return match ? parseFloat(match) : fallback;
}

function parseHashtag(
  haystack: string,
  hashtag: string,
  pattern: string
): string | undefined {
  const matches = haystack.match(new RegExp(`#${hashtag}=${pattern}`, "i"));

  return matches?.[1];
}

function parseBoolean(haystack: string, hashtag: string): boolean {
  return haystack.toLowerCase().includes(`#${hashtag}`.toLowerCase());
}

export function getSettings(g: Goal): AutodialSettings {
  const t = `${g.fineprint} ${g.title}`;

  return {
    autodial: parseBoolean(t, "autodial"),
    min: parseOptionFloat(t, "autodialMin", -Infinity),
    max: parseOptionFloat(t, "autodialMax", Infinity),
    strict: parseBoolean(t, "autodialStrict"),
    add: parseOptionFloat(t, "autodialAdd", 0),
    times: parseOptionFloat(t, "autodialTimes", 1),
    from: parseHashtag(t, "autodialFrom", "(-?[\\w-]+)"),
  };
}
