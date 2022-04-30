import { useCallback, useReducer } from "react";

enum UndoAction {
  UNDO = "UNDO",
  REDO = "REDO",
  SET = "SET",
  RESET = "RESET",
}

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: UndoAction;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent } = action;

  switch (action.type) {
    case UndoAction.UNDO: {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case UndoAction.REDO: {
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case UndoAction.SET: {
      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case UndoAction.RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
  return state;
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({ type: UndoAction.UNDO }), []);

  const redo = useCallback(() => dispatch({ type: UndoAction.REDO }), []);

  const set = useCallback(
    (newPresent: T) => dispatch({ type: UndoAction.SET, newPresent }),
    []
  );

  const reset = useCallback(
    (newPresent: T) => dispatch({ type: UndoAction.RESET, newPresent }),
    []
  );

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
