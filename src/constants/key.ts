const queryKeys = {
  USER: 'user',

  CLUB: 'club',
  GET_CLUB: 'getClub',
  GET_CLUBLIST: 'getClubList',

  CLUB_USER: 'clubUser',
  GET_CLUB_USERLIST: 'getClubUserList',

  
  MEMBER: 'member',
  GET_MEMBERLIST: 'getMemberList',

  EVENT_MEMBER: 'eventMember',
  GET_EVENT_MEMBERLIST: 'getEventMemberList',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

export { queryKeys, storageKeys };

