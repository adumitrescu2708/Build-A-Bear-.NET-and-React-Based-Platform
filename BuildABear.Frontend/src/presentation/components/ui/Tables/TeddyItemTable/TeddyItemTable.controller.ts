import { useTableController } from "../Table.controller";
import { useTeddyItemApi } from "@infrastructure/apis/api-management/teddyItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { usePaginationController } from "../Pagination.controller";
import { downloadDocument, openDocument } from "@infrastructure/utils/downloadUtils";
/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useTeddyItemApiController = () => {
    const { getTeddyItems: { key: queryKey, query }, updateTeddyItem: {key: downKey, query: updateTeddyItems}, deleteTeddyItem: { key: deleteTeddyItemKey, mutation: deleteTeddyItemFn },
    downloadTeddyItem: {key: downloadTeddyItemKey, mutation: downloadTeddyItem}} = useTeddyItemApi(); // Use the API hook.
    const queryClient = useQueryClient(); // Get the query client.
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize],
        queryFn: () => query({ page, pageSize })
    }); // Retrieve the table page from the backend via the query hook.
    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]); // Create a callback to try reloading the data for the table via query invalidation.

    const tableController = useTableController(setPagination, data?.response?.pageSize); // Adapt the pagination for the table.
    
    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteTeddyItemKey],
        mutationFn: deleteTeddyItemFn
    }); 

    const { mutateAsync: downloadMutation } = useMutation({
        mutationKey: [downloadTeddyItemKey],
        mutationFn: downloadTeddyItem
    }); 
    
    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })),
        [queryClient, deleteMutation, queryKey]); // Create the callback to remove an entry.

    const download = useCallback(
        (id: string, filename:string) => downloadMutation(id).then((data) => downloadDocument(data, filename)),
        [downloadMutation]); // Create the callback to remove an entry.
    
    return { // Return the controller state and actions.
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        remove,
        download
    };
}