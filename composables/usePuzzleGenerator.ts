import { generateBattleshipBoard } from "@/puzzles/battleship/generate";

export function usePuzzleGenerator(slug: string, difficulty: "easy" | "medium" | "hard") {
  switch (slug) {
    case 'battleship':
      return generateBattleshipBoard(difficulty)
    default:
      throw new Error(`No generator for puzzle type: ${slug}`)
  }
}
