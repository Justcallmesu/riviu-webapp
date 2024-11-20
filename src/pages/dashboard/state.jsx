import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({ price: 0 });

export { setGlobalState, useGlobalState };
