import { useQuery } from "@tanstack/react-query";
import { getEventMemberList } from "../api/eventMember";

function useQueryGetEventMemberList(eventId: string | null) {
    return useQuery({
        queryFn: () => getEventMemberList(eventId!),
        queryKey: ["eventMemberList", eventId],
        refetchOnMount: 'always', // 추가 옵션
        enabled: !!eventId
    });
}

export { useQueryGetEventMemberList }