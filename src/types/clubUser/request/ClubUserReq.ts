type ClubUserCreateReq = {
	clubId: String,
	identifier: String,
}
type ClubUserDelegateReq = {
	queryParams: Record<string, any>,
	toIdentifier: String,
}

export type { ClubUserCreateReq, ClubUserDelegateReq };
  