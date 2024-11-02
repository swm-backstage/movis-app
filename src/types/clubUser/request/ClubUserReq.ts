type ClubUserCreateReq = {
	clubId: String,
	identifier: String,
}
type ClubUserDelegateReq = {
	queryParams: Record<string, any>,
	toIdentifier: String,
}
type ClubUserDeleteReq = {
	queryParams: Record<string, any>,
	identifier: String,
}

export type { ClubUserCreateReq, ClubUserDelegateReq, ClubUserDeleteReq };
  