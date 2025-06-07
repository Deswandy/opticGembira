"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { MdDeleteForever, MdEdit } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "./ui/badge";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { Button } from "./ui/button"
import React, { useState, useMemo } from "react"

export default function KacamataTable({ data }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) =>(
          <div className="flex flex-row gap-1">
            <Badge className="px-1 bg-slate-600">
              {`${row.original.laci_relasi?.laci ?? ""}`}
            </Badge>
              {row.original.newid ?? ""}
          </div>
        )
      },
      { accessorKey: "tipe", header: "Tipe" },
      { accessorKey: "bahan", header: "Bahan" },
      {
        accessorKey: "merk",
        header: "Merk",
        cell: ({ row }) => row.original.merk_relasi?.merk ?? "-",
      },
      // {
      //   accessorKey: "laci",
      //   header: "Laci",
      //   cell: ({ row }) => row.original.laci_relasi?.laci ?? "-",
      // },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => row.original.status_relasi?.status ?? "-",
      },
      {
        accessorKey: "created_at",
        header: "Dibuat",
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Aksi",
        cell: ({row}) => (
          <div className="flex flex-row gap-2">
            <Button className="bg-orange-400 hover:bg-orange-500 p-2">
              <MdEdit/>
            </Button>
            <Button variant="destructive" className="p-2">
              <MdDeleteForever/>
            </Button>
          </div>
        )
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  })

  const currentPage = table.getState().pagination.pageIndex + 1
  const pageCount = table.getPageCount()

  return (
    <div className="space-y-6 w-full">
      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="w-full table-fixed min-w-[800px]">
          <TableHeader className="bg-blue-50">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="truncate px-4 py-2 min-w-[120px]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="truncate px-4 py-2 min-w-[120px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {Array.from({
              length: pagination.pageSize - table.getRowModel().rows.length,
            }).map((_, idx) => (
              <TableRow
                key={`empty-${idx}`}
                className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                {columns.map((_, colIdx) => (
                  <TableCell
                    key={`empty-cell-${idx}-${colIdx}`}
                    className="px-4 py-2 min-w-[120px] text-muted-foreground"
                  >
                    &nbsp;
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="w-full flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={e => {
                  e.preventDefault()
                  if (table.getCanPreviousPage()) table.previousPage()
                }}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>

            {(() => {
              const maxVisiblePages = 5
              let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
              let endPage = startPage + maxVisiblePages - 1

              if (endPage > pageCount) {
                endPage = pageCount
                startPage = Math.max(endPage - maxVisiblePages + 1, 1)
              }

              const pageNumbers = []
              for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i)
              }

              return pageNumbers.map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={e => {
                      e.preventDefault()
                      table.setPageIndex(page - 1)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))
            })()}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={e => {
                  e.preventDefault()
                  if (table.getCanNextPage()) table.nextPage()
                }}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
