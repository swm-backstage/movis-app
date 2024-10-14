import { useQuery } from "@tanstack/react-query";
import { getUnclassifiedTransaction } from "../api/transactionHistory";


function useGetUnclassifiedTransaction(clubId: string){
    return useQuery({
        queryFn: () => getUnclassifiedTransaction(clubId),
        queryKey: ["getUnClassifiedTransaction",clubId],
        refetchOnMount: 'always', // 추가 옵션
        staleTime: 0, // 데이터가 즉시 stale 상태로 간주되도록 설정
        refetchOnWindowFocus: true, // 화면 포커스 시 데이터를 다시 가져오도록 설정
      })
}

export {useGetUnclassifiedTransaction};