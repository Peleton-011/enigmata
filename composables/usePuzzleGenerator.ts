import { generateBattleshipBoard } from "@/puzzles/battleship/generate";

export function usePuzzleGenerator(slug: string, config: any) {
  try {
    switch (slug) {
      case "battleship":
        return generateBattleshipBoard(); // Safe to fail
      default:
        throw new Error(`No generator for puzzle type: ${slug}`);
    }
  } catch (err: any) {
    console.error(`[Enigmata] Puzzle generation failed for "${slug}":`, err);
    return null; // Or return a fallback board if you prefer
  }
}
