// resources/js/Components/KacamataTable.jsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import React from "react"

export default function KacamataTable({ data }) {
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) =>
        `${row.original.laci_relasi?.laci ?? ""} - ${row.original.newid ?? ""}`,
    },
    {
      accessorKey: "tipe",
      header: "Tipe",
    },
    {
      accessorKey: "bahan",
      header: "Bahan",
    },
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
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
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
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
