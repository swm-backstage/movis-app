import { useMutation } from "@tanstack/react-query";

import { createEvenBill } from "../api/eventBill";
import { UseMutationCustomOptions } from "../types/common";

function useMutateCreateEventBill(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: createEvenBill,
    ...mutationOptions
  })
}

export { useMutateCreateEventBill };
