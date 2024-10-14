type EventCreateReq = {
    clubId: String,
    eventName: String,
    gatherFeeInfo: GatherFeeInfo | null,
    eventMemberIdList: String[],
}

type GatherFeeInfo = {
    totalPaymentAmount: number,
    paymentDeadline: String,
}
  
export type { EventCreateReq, GatherFeeInfo };