import { useMutation } from "@tanstack/react-query";

import { UseMutationCustomOptions } from "../types/common";
import { classifiedFee,createFee } from "../api/fee";
import { FeeClassifiedReq } from "../types/fee/FeeClassifiedReq";

type FeeClassifiedMutationVariables = {
    feeId: string;
    body: FeeClassifiedReq;
};

function useClassifiedFee(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: ({ feeId, body }: FeeClassifiedMutationVariables) => classifiedFee(feeId, body),
        ...mutationOptions
    })
}

function useMutateCreateFee(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: createFee,
    ...mutationOptions
  })
}

export { useClassifiedFee,useMutateCreateFee };

