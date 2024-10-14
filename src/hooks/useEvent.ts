import { useMutation, useQuery } from "@tanstack/react-query";

import { createEvent, getEventList } from "../api/event";
import { UseMutationCustomOptions } from "../types/common";

function useMutateCreateEvent(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: createEvent,
    ...mutationOptions
  })
}

function useQueryGetEventList(clubId: string, lastId: string, size: number) {
  return useQuery({
    queryFn: () => getEventList(clubId, lastId, size),
    queryKey: ["getEventList", clubId],
    refetchOnMount: 'always',
  })
}

export { useMutateCreateEvent, useQueryGetEventList };
