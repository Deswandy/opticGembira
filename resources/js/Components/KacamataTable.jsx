"use client";

import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { router } from "@inertiajs/react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

// Import komponen UI
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
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
} from "@/components/ui/pagination";


export default function KacamataTable({ data }) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                cell: ({ row }) => (
                    <div className="flex flex-row gap-1">
                        <Badge className="px-1 bg-slate-600">
                            {`${row.original.laci_relasi?.laci ?? ""}`}
                        </Badge>
                        {row.original.newid ?? ""}
                    </div>
                ),
            },
            { accessorKey: "tipe", header: "Tipe" },
            { accessorKey: "bahan", header: "Bahan" },
            {
                accessorKey: "merk",
                header: "Merk",
                cell: ({ row }) => row.original.merk_relasi?.merk ?? "-",
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => row.original.status_relasi?.status ?? "-",
            },
            {
                accessorKey: "created_at",
                header: "Dibuat",
                cell: ({ getValue }) =>
                    new Date(getValue()).toLocaleDateString("id-ID"),
            },
            {
                id: "actions",
                header: "Aksi",
                cell: ({ row }) => {
                    // **STATE MANAGEMENT DIALOG DIPERBAIKI**
                    const [editDialogOpen, setEditDialogOpen] = useState(false);
                    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

                    const handleDelete = () => {
                        router.delete(route('ms-kacamatas.destroy', row.original.id), {
                            onSuccess: () => setDeleteDialogOpen(false),
                            preserveScroll: true,
                        });
                    };

                    return (
                        <div className="flex flex-row gap-2">
                            {/* --- Dialog Edit --- */}
                            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-orange-400 hover:bg-orange-500 p-2">
                                        <MdEdit />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Kacamata</DialogTitle>
                                        <DialogDescription>
                                            Edit data kacamata yang dipilih
                                        </DialogDescription>
                                    </DialogHeader>
                                    <EditForm
                                        item={row.original}
                                        kacamata={data}
                                        onSuccess={() => setEditDialogOpen(false)}
                                    />
                                </DialogContent>
                            </Dialog>

                            {/* --- Dialog Hapus --- */}
                            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" className="p-2">
                                        <MdDeleteForever />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                        <DialogDescription>
                                            Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button
                                            variant="outline"
                                            onClick={() => setDeleteDialogOpen(false)}
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={handleDelete}
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    );
                },
            },
        ],
        [data] // Dependensi ditambahkan agar re-render jika data berubah
    );

    const table = useReactTable({
        data,
        columns,
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const currentPage = table.getState().pagination.pageIndex + 1;
    const pageCount = table.getPageCount();

    // Logika untuk menampilkan nomor halaman paginasi
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        const ellipsis = <PaginationItem key="ellipsis"><span className="px-3 py-1">...</span></PaginationItem>;

        if (pageCount <= maxPagesToShow + 2) {
            for (let i = 1; i <= pageCount; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= maxPagesToShow - 1) {
                for (let i = 1; i <= maxPagesToShow; i++) pageNumbers.push(i);
                pageNumbers.push('ellipsis');
                pageNumbers.push(pageCount);
            } else if (currentPage >= pageCount - (maxPagesToShow - 2)) {
                pageNumbers.push(1);
                pageNumbers.push('ellipsis');
                for (let i = pageCount - (maxPagesToShow - 1); i <= pageCount; i++) pageNumbers.push(i);
            } else {
                pageNumbers.push(1);
                pageNumbers.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
                pageNumbers.push('ellipsis');
                pageNumbers.push(pageCount);
            }
        }

        return pageNumbers.map((page, index) =>
            page === 'ellipsis' ?
            <PaginationItem key={`${page}-${index}`}><PaginationEllipsis /></PaginationItem> :
            <PaginationItem key={page}>
                <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => { e.preventDefault(); table.setPageIndex(page - 1); }}
                >
                    {page}
                </PaginationLink>
            </PaginationItem>
        );
    };

    return (
        <div className="space-y-4 w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); table.previousPage(); }} disabled={!table.getCanPreviousPage()} />
                        </PaginationItem>
                        {renderPageNumbers()}
                        <PaginationItem>
                            <PaginationNext href="#" onClick={(e) => { e.preventDefault(); table.nextPage(); }} disabled={!table.getCanNextPage()} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}