import { useMutation } from "@tanstack/react-query";

import { UseMutationCustomOptions } from "../types/common";
import { EventBilClassifiedReq } from "../types/eventBill/EventBIllClassifiedReq";
import { classifiedEventBill, createEventBill, updateEventBill } from "../api/eventBill";

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

function useMutateUpdateEventBill(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateEventBill,
    ...mutationOptions
  })
}

function useMutateCreateEventBill(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: createEventBill,
    ...mutationOptions
  })
}

export { useClassifiedEventBill, useMutateUpdateEventBill, useMutateCreateEventBill };