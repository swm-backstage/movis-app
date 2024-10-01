import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../constants/key";
import { getEventMemberList } from "../api/eventMember";


function useGetEventMemberList(eventId: string) {
  return useQuery({
    queryFn: () => getEventMemberList({eventId}),
    queryKey: [queryKeys.EVENT_MEMBER, queryKeys.GET_EVENT_MEMBERLIST]
  })
}

export { useGetEventMemberList };
