type MemberCreateReq = {
  name: String,
  phoneNo: String,
}

type MemberCreateListReq = {
  clubId: string,
  memberList: MemberCreateReq[],
}

export type { MemberCreateReq, MemberCreateListReq };