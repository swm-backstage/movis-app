const queryKeys = {
  CLUB: 'club',
  GET_CLUB: 'getClub',
  GET_CLUBLIST: 'getClubList',
  
  MEMBER: 'member',
  GET_MEMBERLIST: 'getMemberList',

  EVENT_MEMBER: 'eventMember',
  GET_EVENT_MEMBERLIST: 'getEventMemberList',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

export { queryKeys, storageKeys };

