import { LOADING_SET } from "./types";
export const loadingSetter = (isLoading, place, itemId, process, success) => {
  return {
    type: LOADING_SET,
    loading: isLoading,
    place: place,
    itemId: itemId,
    process: process,
    success: success,
  };
};
