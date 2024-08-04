const queryKeys = {
  CLUB: 'club',
  GET_CLUB: 'getClub',
  GET_CLUBLIST: 'getClubList',
  
  MEMBER: 'member',
  GET_MEMBERLIST: 'getMemberList',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

export { queryKeys, storageKeys };

