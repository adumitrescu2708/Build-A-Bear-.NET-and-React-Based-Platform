import { useIntl } from "react-intl";
import { isUndefined } from "lodash";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { useTeddyItemApiController } from "./TeddyItemTable.controller";
import { BriefTeddyItemDTO, BriefTeddyItemDTOPagedResponseRequestResponse } from "@infrastructure/apis/client";
import DeleteIcon from '@mui/icons-material/Delete';
import { UserAddDialog } from "../../Dialogs/UserAddDialog";
import { useAppSelector } from "@application/store";
import {TeddyItemCategoryEnum, TeddyItemValability } from "infrastructure/apis/client/models"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { useAppDispatch } from '@application/store';
import { useOwnUserHasRole } from '@infrastructure/hooks/useOwnUser';
import { UserRoleEnum } from '@infrastructure/apis/client';
import { EdgesensorHighSharp, EditAttributesOutlined, EditAttributesRounded, AddCircleOutline } from "@mui/icons-material";
/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof BriefTeddyItemDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "price", name: formatMessage({ id: "globals.price" }) },
        { key: "valability", name: formatMessage({ id: "globals.valability" })},
        { key: "description", name: formatMessage({ id: "globals.description" })},
        { key: "category", name: formatMessage({ id: "globals.category" })},
    ]
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: BriefTeddyItemDTO[] | null | undefined, orderMap: { [key: string]: number }) => {
    console.log("entries", entries);
    return entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return { key, value } })
            }
        });
}
   
const renders: { [key: string]: (value: any) => string | null } = {
    user: (value) => value.name
};

const format = (value : any) => 
{

    if(typeof value.value === 'object' && value.value !== null && 'name' in value.value && 'value' in value.value) {
        return value.value.value;
    }

    return value.value;
}

/**
 * Creates the user table.
 */
export const TeddyItemTable = () => {
    const { redirectToAddTeddyItem } = useAppRouter();
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay } = useTeddyItemApiController(); // Use the controller hook.
    const rowValues = getRowValues(pagedData?.data, orderMap); // Get the row values.
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const isVendor = useOwnUserHasRole(UserRoleEnum.Vendor);
    
    console.log("sf ", getRowValues(pagedData?.data, orderMap))
    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
            <TablePagination // Use the table pagination to add the navigation between the table pages.
                component="div"
                count={pagedData.totalCount} // Set the entry count returned from the backend.
                page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0} // Set the current page you are on.
                onPageChange={handleChangePage} // Set the callback to change the current page.
                rowsPerPage={pagedData.pageSize} // Set the current page size.
                onRowsPerPageChange={handleChangePageSize} // Set the callback to change the current page size. 
                labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                labelDisplayedRows={labelDisplay}
                showFirstButton
                showLastButton
            />}
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>) // Add the table header.
                        }
                        <TableCell>{formatMessage({ id: "labels.download" })}</TableCell>
                        {
                            (isAdmin || isVendor) && 
                            <TableCell>{formatMessage({ id: "labels.edit" })}</TableCell>
                        }
                        {
                            (isVendor) && 
                            <TableCell>{formatMessage({ id: "labels.addItem" })}</TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        
                        rowValues?.map(({ data, entry }, rowIndex) => 
                        <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{format(keyValue)}</TableCell>)} 
                            {
                               <TableCell>
                                    <IconButton color="primary" onClick={() => redirectToAddTeddyItem()}>
                                        <CloudDownloadIcon color="primary" fontSize='small' />
                                    </IconButton>
                               </TableCell> 
                            } 
                            {
                                (isAdmin || isVendor)  && 
                                <TableCell>
                                {
                                    <IconButton color="primary" onClick={() => redirectToAddTeddyItem()}>
                                        <EditAttributesOutlined color="primary" fontSize='small' />
                                    </IconButton>
                                }
                                </TableCell>
                            }
                            {
                                (isVendor)  && 
                                <TableCell>
                                {
                                    <IconButton color="primary" onClick={() => redirectToAddTeddyItem()}>
                                        <AddCircleOutline  color="primary" fontSize='small' />
                                    </IconButton>
                                }
                                </TableCell>
                            }
                        </TableRow>)

                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer >
}