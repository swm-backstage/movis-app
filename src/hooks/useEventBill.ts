import { useMutation } from "@tanstack/react-query";

import { UseMutationCustomOptions } from "../types/common";
import { EventBilClassifiedReq } from "../types/eventBill/EventBIllClassifiedReq";
import { classifiedEventBill, createEventBill } from "../api/eventBill";

type EventBillClassifiedMutationVariables = {
    eventBillId: string;
    body: EventBilClassifiedReq
}

function useClassifiedEventBill(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: ({ eventBillId, body }: EventBillClassifiedMutationVariables) => classifiedEventBill(eventBillId, body),
        ...mutationOptions
    })
}

function useMutateCreateEventBill(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: createEvenBill,
    ...mutationOptions
  })
}

export { useClassifiedEventBill, useMutateCreateEventBill };
