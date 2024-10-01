import { useMutation } from "@tanstack/react-query";

import { createFee } from "../api/fee";
import { UseMutationCustomOptions } from "../types/common";

function useMutateCreateFee(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: createFee,
    ...mutationOptions
  })
}

export { useMutateCreateFee };
