import { useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginationController } from "../Pagination.controller";
import { useVendorApi } from "@infrastructure/apis/api-management/vendor";

/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useVendorController = () => {
    const { getVendors: { key: queryKey, query }, deleteVendor: { key: deleteVendorKey, mutation: deleteVendorFn } } = useVendorApi();
    const queryClient = useQueryClient(); // Get the query client.
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize, searchTerm],
        queryFn: () => query({ page, pageSize, search: searchTerm })
    }); // Retrieve the table page from the backend via the query hook.

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]); // Create a callback to try reloading the data for the table via query invalidation.

    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteVendorKey],
        mutationFn: deleteVendorFn
    });

    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })),
        [queryClient, deleteMutation, queryKey]); // Create the callback to remove an entry.

    const handleSearch = useCallback(
        (search: string) => {
            setSearchTerm(search);
            setPagination(1, pageSize); // Reset to first page on new search
        },
        [setPagination, pageSize]
    );

    return { // Return the controller state and actions.
        handleChangePage: (event: unknown, newPage: number) => setPagination(newPage + 1, pageSize),
        handleChangePageSize: (event: React.ChangeEvent<HTMLInputElement>) => setPagination(1, parseInt(event.target.value, 10)),
        handleSearch,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        remove
    };
}
