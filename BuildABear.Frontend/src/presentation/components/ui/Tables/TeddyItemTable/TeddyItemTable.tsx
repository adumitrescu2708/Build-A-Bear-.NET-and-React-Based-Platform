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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EditAttributesOutlined from '@mui/icons-material/EditAttributesOutlined';
import { DataLoadingContainer } from "../../LoadingDisplay";
import { useTeddyItemApiController } from "./TeddyItemTable.controller";
import { BriefTeddyItemDTO } from "@infrastructure/apis/client";
import { useAppSelector } from "@application/store";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { useOwnUserHasRole } from '@infrastructure/hooks/useOwnUser';
import { UserRoleEnum } from '@infrastructure/apis/client';
import { useNavigate } from 'react-router-dom';

/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof BriefTeddyItemDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "price", name: formatMessage({ id: "globals.price" }) },
        { key: "valability", name: formatMessage({ id: "globals.valability" }) },
        { key: "description", name: formatMessage({ id: "globals.description" }) },
        { key: "category", name: formatMessage({ id: "globals.category" }) },
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
            };
        });
};

const renders: { [key: string]: (value: any) => string | null } = {
    user: (value) => value.name
};

const format = (value: any) => {
    if (typeof value.value === 'object' && value.value !== null && 'name' in value.value && 'value' in value.value) {
        return value.value.value;
    }

    return value.value;
};

/**
 * Creates the user table.
 */
export const TeddyItemTable = () => {
    const navigate = useNavigate();
    const { redirectToEditTeddyItem } = useAppRouter();
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };

    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove, download, handleSearch } = useTeddyItemApiController();
    const rowValues = getRowValues(pagedData?.data, orderMap);
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const isVendor = useOwnUserHasRole(UserRoleEnum.Vendor);

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

    const handleAddTeddyItem = () => {
        navigate('/teddyItem'); // Redirecționează către pagina de adăugare a TeddyItem
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
                    {formatMessage({ id: "globals.teddyItemList" })}
                </Typography>
                {isVendor && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddTeddyItem}
                    >
                        {formatMessage({ id: "globals.addTeddyItem" })}
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
                            <TableCell>{formatMessage({ id: "labels.download" })}</TableCell>
                            {(isAdmin || isVendor) && <TableCell>{formatMessage({ id: "labels.edit" })}</TableCell>}
                            {isAdmin && <TableCell>{formatMessage({ id: "labels.delete" })}</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowValues?.map(({ data, entry }, rowIndex) =>
                            <TableRow key={`row_${rowIndex + 1}`}>
                                {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{format(keyValue)}</TableCell>)}
                                <TableCell>
                                    <IconButton color="primary" onClick={() => download(entry.id || '', entry.filename || '')}>
                                        <CloudDownloadIcon color="primary" fontSize='small' />
                                    </IconButton>
                                </TableCell>
                                {(isAdmin || isVendor) &&
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => redirectToEditTeddyItem(entry.id)}>
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
                        {formatMessage({ id: "globals.confirmDeleteTeddy" })}
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
