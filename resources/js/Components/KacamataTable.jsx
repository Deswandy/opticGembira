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
import React from "react"

export default function KacamataTable({ data }) {
  const columns = [
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
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex + 1

  return (
    <div className="space-y-4 overflow-x-auto">
      <div className="rounded-md border w-full max-w-[1200px] mx-auto">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="truncate">
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
                  <TableCell key={cell.id} className="truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent className="transition-all duration-200 ease-in-out">
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

            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      table.setPageIndex(0)
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}

            {/* Current, Previous, Next */}
            {[...Array(3)].map((_, i) => {
              const page = currentPage - 2 + i
              if (page < 1 || page > pageCount) return null
              return (
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
              )
            })}

            {currentPage < pageCount - 1 && (
              <>
                {currentPage < pageCount - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      table.setPageIndex(pageCount - 1)
                    }}
                  >
                    {pageCount}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

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
