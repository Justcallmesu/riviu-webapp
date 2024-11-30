import { createQueryKeys } from "@lukemorales/query-key-factory";

export const movieQueryKeys = createQueryKeys("movies", {
  lists: (params) => [params],
  byId: (id) => [id],
});
