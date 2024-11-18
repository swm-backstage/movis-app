import { useQuery } from "@tanstack/react-query";

import { getEventMemberList, getEventMemberListNotPaid } from "../api/eventMember";

function useQueryGetEventMemberList(eventId: string | null) {
    return useQuery({
        queryFn: () => getEventMemberList(eventId!),
        queryKey: ["eventMemberList", eventId],
        refetchOnMount: 'always', // 추가 옵션
        enabled: !!eventId
    });
}

function useQueryGetEventMemberListNotPaid(eventId: string | null) {
    return useQuery({
        queryFn: () => getEventMemberListNotPaid(eventId!),
        queryKey: ["eventMemberListNotPaid", eventId],
        refetchOnMount: 'always', // 추가 옵션
        enabled: !!eventId
    });
}


export { useQueryGetEventMemberList, useQueryGetEventMemberListNotPaid }

