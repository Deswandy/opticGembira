"use client";

import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import { router } from "@inertiajs/react";
import { MdDeleteForever, MdEdit, MdInfoOutline } from "react-icons/md";

// UI components
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "@/components/ui/input";
import EditForm from "@/Pages/Kacamata/EditForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

export default function KacamataTable({ data }) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [globalFilter, setGlobalFilter] = useState("");

    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [logItem, setLogItem] = useState(null);
    const [logs, setLogs] = useState([]);

    const handleShowLogs = async (item) => {
        try {
            const response = await fetch(route("ms-kacamatas.logs", item.id));
            const json = await response.json();
            setLogs(json);
            setLogItem(item);
        } catch (err) {
            console.error("Failed to fetch logs", err);
        }
    };

    const handleDelete = () => {
        if (!deleteItem) return;
        router.delete(route("ms-kacamatas.destroy", deleteItem.id), {
            onSuccess: () => setDeleteItem(null),
            preserveScroll: true,
        });
    };

    const columns = useMemo(
        () => [
            {
                id: "custom_id_display",
                header: "ID",
                accessorFn: (row) =>
                    `${row.laci_relasi?.laci ?? ""} ${row.newid ?? ""}`,
                enableGlobalFilter: true,
                cell: ({ row }) => (
                    <div className="flex flex-row gap-1">
                        <Badge className="px-1 bg-slate-600">
                            {row.original.laci_relasi?.laci ?? ""}
                        </Badge>
                        {row.original.newid ?? ""}
                    </div>
                ),
            },
            {
                accessorKey: "tipe",
                header: "Tipe",
                enableGlobalFilter: true,
            },
            {
                accessorKey: "bahan",
                header: "Bahan",
                enableGlobalFilter: true,
            },
            {
                accessorKey: "merk",
                header: "Merk",
                accessorFn: (row) => row.merk_relasi?.merk ?? "-",
                enableGlobalFilter: true,
                cell: ({ row }) => row.original.merk_relasi?.merk ?? "-",
            },
            {
                accessorKey: "status",
                header: "Status",
                accessorFn: (row) => row.status_relasi?.status ?? "-",
                enableGlobalFilter: true,
                cell: ({ row }) => row.original.status_relasi?.status ?? "-",
            },
            {
                accessorKey: "created_at",
                header: "Dibuat",
                enableGlobalFilter: true,
                cell: ({ getValue }) =>
                    new Date(getValue()).toLocaleDateString("id-ID"),
            },
            {
                id: "actions",
                header: "Aksi",
                cell: ({ row }) => (
                    <div className="flex flex-row gap-2">
                        <Button
                            variant="secondary"
                            className="p-2 bg-sky-500 hover:bg-sky-700"
                            onClick={() => handleShowLogs(row.original)}
                        >
                            <MdInfoOutline className="invert" />
                        </Button>
                        <Button
                            className="bg-orange-400 hover:bg-orange-500 p-2"
                            onClick={() => setEditItem(row.original)}
                        >
                            <MdEdit />
                        </Button>
                        <Button
                            variant="destructive"
                            className="p-2"
                            onClick={() => setDeleteItem(row.original)}
                        >
                            <MdDeleteForever />
                        </Button>
                    </div>
                ),
            },
        ],
        [data]
    );

    const table = useReactTable({
        data,
        columns,
        state: { pagination, globalFilter },
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: (row, columnId, filterValue) => {
            return String(row.getValue(columnId))
                .toLowerCase()
                .includes(String(filterValue).toLowerCase());
        },
    });

    const currentPage = table.getState().pagination.pageIndex + 1;
    const pageCount = table.getPageCount();

    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (pageCount <= maxPagesToShow + 2) {
            for (let i = 1; i <= pageCount; i++) pages.push(i);
        } else {
            if (currentPage <= maxPagesToShow - 1) {
                for (let i = 1; i <= maxPagesToShow; i++) pages.push(i);
                pages.push("ellipsis", pageCount);
            } else if (currentPage >= pageCount - (maxPagesToShow - 2)) {
                pages.push(1, "ellipsis");
                for (
                    let i = pageCount - (maxPagesToShow - 1);
                    i <= pageCount;
                    i++
                )
                    pages.push(i);
            } else {
                pages.push(1, "ellipsis");
                for (let i = currentPage - 1; i <= currentPage + 1; i++)
                    pages.push(i);
                pages.push("ellipsis", pageCount);
            }
        }

        return pages.map((page, i) =>
            page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                </PaginationItem>
            ) : (
                <PaginationItem key={page}>
                    <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                            e.preventDefault();
                            table.setPageIndex(page - 1);
                        }}
                    >
                        {page}
                    </PaginationLink>
                </PaginationItem>
            )
        );
    };

    return (
        <div className="space-y-4 w-full">
            {/* Global Search */}
            <div className="flex justify-start pb-2">
                <Input
                    placeholder="Cari kacamata..."
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-full max-w-sm"
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Tidak ada hasil ditemukan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    table.previousPage();
                                }}
                                disabled={!table.getCanPreviousPage()}
                            />
                        </PaginationItem>
                        {renderPageNumbers()}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    table.nextPage();
                                }}
                                disabled={!table.getCanNextPage()}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            {/* Log Dialog */}
            <Dialog
                open={!!logItem}
                onOpenChange={(open) => !open && setLogItem(null)}
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Riwayat Perubahan Status</DialogTitle>
                        <DialogDescription>
                            Log status untuk kacamata ini.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                                    {logItem?.foto && (
                <div className="mb-1 flex justify-center">
                    <img
                        src={`/storage/${logItem.foto}`}
                        alt="Foto kacamata"
                        className="rounded-md max-h-64 object-contain border"
                    />
                </div>
            )}
                        {logs.length > 0 ? (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="p-1">Tanggal</th>
                                        <th className="p-1">Status</th>
                                        <th className="p-1">User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log, index) => (
                                        <tr key={index}>
                                            <td className="p-1">
                                                {new Date(
                                                    log.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="p-1">
                                                {log.status}
                                                {console.log(log.status)}
                                            </td>
                                            <td className="p-1">{log.user}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Tidak ada log ditemukan.</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog
                open={!!editItem}
                onOpenChange={(open) => !open && setEditItem(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Kacamata</DialogTitle>
                        <DialogDescription>
                            Edit data kacamata yang dipilih
                        </DialogDescription>
                    </DialogHeader>
                    {editItem && (
                        <EditForm
                            item={editItem}
                            kacamata={data}
                            onSuccess={() => setEditItem(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog
                open={!!deleteItem}
                onOpenChange={(open) => !open && setDeleteItem(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus data ini? Tindakan
                            ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteItem(null)}
                        >
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
