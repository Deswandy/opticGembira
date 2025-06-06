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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table"
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
        cell: ({ row }) =>
          `${row.original.laci_relasi?.laci ?? ""} - ${row.original.newid ?? ""}`,
      },
      { accessorKey: "tipe", header: "Tipe" },
      { accessorKey: "bahan", header: "Bahan" },
      {
        accessorKey: "merk",
        header: "Merk",
        cell: ({ row }) => row.original.merk_relasi?.merk ?? "-",
      },
      {
        accessorKey: "laci",
        header: "Laci",
        cell: ({ row }) => row.original.laci_relasi?.laci ?? "-",
      },
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
          <TableHeader>
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="truncate px-4 py-2 min-w-[120px]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Pad empty rows if less than pageSize */}
              {Array.from({
                length: pagination.pageSize - table.getRowModel().rows.length,
              }).map((_, idx) => (
                <TableRow key={`empty-${idx}`}>
                  {columns.map((_, colIdx) => (
                    <TableCell
                      key={`empty-cell-${idx}-${colIdx}`}
                      className="px-4 py-2 min-w-[120px] text-muted-foreground"
                    >
                      {/* Optional: Add a non-breaking space or leave empty */}
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
                  table.previousPage()
                }}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>

            {(() => {
              const maxVisiblePages = 5
              const totalPages = pageCount
              const current = currentPage
              let startPage = Math.max(current - Math.floor(maxVisiblePages / 2), 1)
              let endPage = startPage + maxVisiblePages - 1

              if (endPage > totalPages) {
                endPage = totalPages
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
                    isActive={page === current}
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
                  table.nextPage()
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
