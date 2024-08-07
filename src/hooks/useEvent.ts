import { useMutation } from "@tanstack/react-query";

import { createEvent } from "../api/event";
import { UseMutationCustomOptions } from "../types/common";

function useMutateCreateEvent(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: createEvent,
    ...mutationOptions
  })
}

export { useMutateCreateEvent };
