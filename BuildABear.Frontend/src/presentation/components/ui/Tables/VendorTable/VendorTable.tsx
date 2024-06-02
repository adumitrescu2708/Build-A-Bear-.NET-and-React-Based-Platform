import React, { useState } from 'react';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    Toolbar,
    Typography
} from "@mui/material";
import { useIntl } from "react-intl";
import { isUndefined } from "lodash";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { EdgesensorHighSharp, EditAttributesOutlined } from "@mui/icons-material";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { useVendorController } from "./VendorTable.controller";
import { BriefTeddyItemDTO, VendorBriefView } from "@infrastructure/apis/client";
import { useAppSelector } from "@application/store";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { useOwnUserHasRole } from '@infrastructure/hooks/useOwnUser';
import { UserRoleEnum } from '@infrastructure/apis/client';
import { useNavigate } from 'react-router-dom';

/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof VendorBriefView, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "email", name: formatMessage({ id: "globals.email" }) },
        { key: "address", name: formatMessage({ id: "globals.address" }) },
        { key: "contractStartDate", name: formatMessage({ id: "globals.contractStartDate" }) }
    ];
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
    user: (value) => value.name,
    contractStartDate: (value) => new Date(value).toLocaleDateString() // Format date as needed
};

const format = (value: any) => {
    if (typeof value.value === 'object' && value.value !== null && 'name' in value.value && 'value' in value.value) {
        return value.value.value;
    }
    if (renders[value.key]) {
        return renders[value.key](value.value);
    }
    return value.value;
}

/**
 * Creates the user table.
 */
export const VendorTable = () => {
    const navigate = useNavigate();
    const { redirectToVendorContractEdit } = useAppRouter();
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };

    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove, handleSearch } = useVendorController();
    const rowValues = getRowValues(pagedData?.data, orderMap);

    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const onSearch = () => {
        handleSearch(searchTerm);
    };

    const handleOpen = (id: string) => {
        setDeleteId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDeleteId(null);
    };

    const handleConfirmDelete = () => {
        if (deleteId) {
            remove(deleteId);
        }
        handleClose();
    };

    const handleAddVendor = () => {
        navigate('/register/vendor'); // Redirecționează către pagina de adăugare a vendorului
    };

    return (
        <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
            <Box display="flex" justifyContent="center" alignItems="center" marginBottom="16px">
                <TextField
                    label={formatMessage({ id: "labels.search" })}
                    value={searchTerm}
                    onChange={onSearchChange}
                    variant="outlined"
                    size="small"
                    style={{ marginRight: '8px' }}
                />
                <Button variant="contained" color="primary" onClick={onSearch}>
                    {formatMessage({ id: "labels.search" })}
                </Button>
            </Box>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {formatMessage({ id: "globals.vendorList" })}
                </Typography>
                {isAdmin && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddVendor}
                    >
                        {formatMessage({ id: "globals.addVendor" })}
                    </Button>
                )}
            </Toolbar>
            {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
                <TablePagination
                    component="div"
                    count={pagedData.totalCount}
                    page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0}
                    onPageChange={handleChangePage}
                    rowsPerPage={pagedData.pageSize}
                    onRowsPerPageChange={handleChangePageSize}
                    labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                    labelDisplayedRows={labelDisplay}
                    showFirstButton
                    showLastButton
                />}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
                            {isAdmin && <TableCell>{formatMessage({ id: "labels.edit" })}</TableCell>}
                            {isAdmin && <TableCell>{formatMessage({ id: "labels.delete" })}</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowValues?.map(({ data, entry }, rowIndex) =>
                            <TableRow key={`row_${rowIndex + 1}`}>
                                {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{format(keyValue)}</TableCell>)}
                                {isAdmin &&
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => redirectToVendorContractEdit(entry.id)}>
                                            <EditAttributesOutlined color="primary" fontSize='small' />
                                        </IconButton>
                                    </TableCell>}
                                {isAdmin &&
                                    <TableCell>
                                        <IconButton color="error" onClick={() => handleOpen(entry.id || '')}>
                                            <DeleteIcon color="error" fontSize='small' />
                                        </IconButton>
                                    </TableCell>}
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{formatMessage({ id: "globals.confirmation" })}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {formatMessage({ id: "globals.confirmDelete" })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {formatMessage({ id: "globals.cancel" })}
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        {formatMessage({ id: "globals.confirm" })}
                    </Button>
                </DialogActions>
            </Dialog>
        </DataLoadingContainer>
    );
};
