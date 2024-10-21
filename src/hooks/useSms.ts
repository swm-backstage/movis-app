import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "../types/common";
import { sendSms, verifySmsCode } from "../api/sms";

function useSendSms(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: (phoneNumber: string) => sendSms(phoneNumber),
        ...mutationOptions
    })
}

function useVerifyCode(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: ({ phoneNumber, verifyCode }: { phoneNumber: string; verifyCode: string }) => verifySmsCode(phoneNumber, verifyCode),
        ...mutationOptions
    })
}

export { useSendSms, useVerifyCode };