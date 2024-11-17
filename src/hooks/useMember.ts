import { useMutation, useQuery } from "@tanstack/react-query";

import { createMemberList, deleteMember, getMemberList } from "../api/member";
import queryClient from "../api/queryClient";
import { queryKeys } from "../constants/key";
import { UseMutationCustomOptions } from "../types/common";


function useGetMemberList(clubId: string) {
  return useQuery({
    queryFn: () => getMemberList(clubId),
    queryKey: [queryKeys.MEMBER, queryKeys.GET_MEMBERLIST]
  })
}

function useMutateCreateMemberList(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: createMemberList,
    onSuccess: newMemberList => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MEMBER, queryKeys.GET_MEMBERLIST],
      }),
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CLUB, queryKeys.GET_CLUBLIST],
      });
    },
    ...mutationOptions
  })
}

function useMutateDeleteMember(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MEMBER, queryKeys.GET_MEMBERLIST],
      }),
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CLUB, queryKeys.GET_CLUBLIST],
      });
    },
    ...mutationOptions
  })
}

export { useGetMemberList, useMutateCreateMemberList, useMutateDeleteMember };