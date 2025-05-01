export function useBoardState<T>(initial: T) {
    const board = ref<T>(structuredClone(initial))
  
    function reset() {
      board.value = structuredClone(initial)
    }
  
    function updateCell(x: number, y: number, value: any) {
      // Example of setting a cell in the board
      board.value[y][x] = value
    }
  
    return {
      board,
      reset,
      updateCell
    }
  }
  