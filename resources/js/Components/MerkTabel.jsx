"use client";

import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";
import { router, useForm } from "@inertiajs/react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

// Import Komponen UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { ArrowUpDown } from "lucide-react";

// Form untuk edit data
const EditForm = ({ merk, onSuccess }) => {
    const { data, setData, patch, processing, errors, reset } = useForm({
        merk: merk.merk || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("ms-merks.update", merk.id), {
            onSuccess: () => {
                reset();
                onSuccess();
            },
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <InputLabel htmlFor="merk_edit" value="Nama Merk" />
                <TextInput
                    id="merk_edit"
                    name="merk"
                    value={data.merk}
                    onChange={(e) => setData("merk", e.target.value)}
                    className="mt-1 block w-full"
                    isFocused
                />
                <InputError message={errors.merk} className="mt-2" />
            </div>
            <PrimaryButton disabled={processing}>Update</PrimaryButton>
        </form>
    );
}


export default function MerkTable({ data }) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = useMemo(() => [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    ID <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "merk",
            header: "Merk",
        },
        {
            accessorKey: "created_at",
            header: "Dibuat",
            cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
            accessorKey: "updated_at",
            header: "Diperbarui",
            cell: ({ row }) => new Date(row.original.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => {
                const merk = row.original;
                const [editDialogOpen, setEditDialogOpen] = useState(false);
                const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

                const handleDelete = () => {
                    router.delete(route('ms-merks.destroy', merk.id), {
                        onSuccess: () => setDeleteDialogOpen(false),
                        preserveScroll: true,
                    });
                };

                return (
                    <div className="flex gap-2">
                        {/* Tombol Edit */}
                        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600">
                                    <MdEdit className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Merk</DialogTitle>
                                </DialogHeader>
                                <EditForm merk={merk} onSuccess={() => setEditDialogOpen(false)} />
                            </DialogContent>
                        </Dialog>

                        {/* Tombol Hapus */}
                        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600">
                                    <MdDeleteForever className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                    <DialogDescription>
                                        Apakah Anda yakin ingin menghapus merk "{merk.merk}"?
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Batal</Button>
                                    <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                );
            }
        }
    ], []);

    const table = useReactTable({
        data,
        columns,
        state: { sorting, columnFilters, pagination },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <Input
                    placeholder="Cari merk..."
                    value={(table.getColumn("merk")?.getFilterValue()) ?? ""}
                    onChange={(event) => table.getColumn("merk")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
            </div>
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
                                <TableRow key={row.id}>
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
                                    Tidak ada data.
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
                            <PaginationPrevious onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
                        </PaginationItem>
                        <span className="p-2 text-sm">
                            Halaman {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
                        </span>
                        <PaginationItem>
                            <PaginationNext onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}