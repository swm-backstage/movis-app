import { useMutation, useQuery } from "@tanstack/react-query";

import { createClub, getClub, getClubList } from "../api/club";
import queryClient from "../api/queryClient";
import { queryKeys } from "../constants/key";
import { UseMutationCustomOptions } from "../types/common";


function useGetClub(
  clubId: string,
) {
  return useQuery({
    queryFn: () => getClub(clubId),
    queryKey: [queryKeys.CLUB, queryKeys.GET_CLUB, clubId]
  })
}

function useGetClubList() {
  return useQuery({
    queryFn: () => getClubList(),
    queryKey: [queryKeys.CLUB, queryKeys.GET_CLUBLIST]
  })
}

function useMutateCreateClub(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: createClub,
    onSuccess: newClub => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CLUB, queryKeys.GET_CLUBLIST],
      });
    },
    ...mutationOptions
  })
}

export { useGetClub, useGetClubList, useMutateCreateClub };
