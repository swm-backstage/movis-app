import { useMutation, useQuery } from "@tanstack/react-query";

import { createClubUser, delegateClubUser, getClubUserList } from "../api/clubUser";
import queryClient from "../api/queryClient";
import { queryKeys } from "../constants/key";
import { UseMutationCustomOptions } from "../types/common";

function useGetClubUserList(clubId: string) {
  return useQuery({
    queryFn: () => getClubUserList({'clubId': clubId}),
    queryKey: [queryKeys.CLUB_USER, queryKeys.GET_CLUB_USERLIST, clubId]
  })
}

function useMutateCreateClubUser(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createClubUser,
    onSuccess: newClubUser => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CLUB_USER, queryKeys.GET_CLUB_USERLIST],
      });
    },
    ...mutationOptions
  })
}

function useMutateDelegateClubUser(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: delegateClubUser,
    onSuccess: newClubUser => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CLUB_USER, queryKeys.GET_CLUB_USERLIST],
      });
    },
    ...mutationOptions
  })
}

export { useGetClubUserList, useMutateCreateClubUser, useMutateDelegateClubUser };
