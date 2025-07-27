"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { CiFilter } from "react-icons/ci";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Survey } from "@/types"
import { surveyData } from "./Dummmydata";
import { HiDotsVertical } from "react-icons/hi";

const StatusBadge = ({ status }: { status: Survey["status"] }) => {
  const statusConfig = {
    Active: {
      className: " text-blue-700  ",
      dotColor: "bg-blue-500"
    },
    Draft: {
      className: " text-gray-700  dark:text-gray-500",
      dotColor: "bg-gray-500 dark:bg-gray-400"
    },
    Closed: {
      className: " text-red-700  ",
      dotColor: "bg-red-500"
    }
  }

  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={`${config.className} flex items-center  gap-1.5`}>
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`}></span>
      {status}
    </Badge>
  )
}

// Format date helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// CRUD Actions
const handleEdit = (survey: Survey) => {
  console.log('Edit survey:', survey.id)
}

const handleDelete = (survey: Survey) => {
  console.log('Delete survey:', survey.id)
}

export const columns: ColumnDef<Survey>[] = [
  {
    accessorKey: "id",
    header: "Code",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "surveyName",
    header: "Survey Name",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue("surveyName")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.getValue("status")} />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 flex items-center gap-1"
        >
          Start Date
          {isSorted === "asc" ? (
            <ArrowUpDown className="h-4 w-4 rotate-180" />
          ) : isSorted === "desc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-sm">{formatDate(row.getValue("startDate"))}</div>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId))
      const dateB = new Date(rowB.getValue(columnId))
      return dateA.getTime() - dateB.getTime()
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 flex items-center gap-1"
        >
          End Date
          {isSorted === "asc" ? (
            <ArrowUpDown className="h-4 w-4 rotate-180" />
          ) : isSorted === "desc" ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-sm">{formatDate(row.getValue("endDate"))}</div>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId))
      const dateB = new Date(rowB.getValue(columnId))
      return dateA.getTime() - dateB.getTime()
    },
  },
  {
    accessorKey: "respondents",
    header: () => <div className="">Respondents</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {row.getValue("respondents")}
      </div>
    ),
  },
  {
    accessorKey: "cost",
    header: () => <div className="text-right">Cost</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("cost")}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const survey = row.original

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <HiDotsVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(survey)} className="group" >
                <Edit className=" h-4 w-4 group-hover:text-white" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(survey)}
                className="group"
                
              >
                <Trash2 className=" h-4 w-4 group-hover:text-white" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

// Custom Pagination Component
const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => {
  const renderPaginationItems = () => {
    const items = []

    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => onPageChange(1)}
          isActive={currentPage === 1}
          className="cursor-pointer"
        >
          1
        </PaginationLink>
      </PaginationItem>
    )

    // Show ellipsis if current page is far from start
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    // Show ellipsis if current page is far from end
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <Pagination className="justify-end w-auto mx-0">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={`bg-secondary text-white hover:bg-secondary/70 dark:hover:bg-secondary/70 cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={`bg-secondary text-white hover:bg-secondary/70 dark:hover:bg-secondary/70  cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default function SurveyManagementTable() {
  const [data, setData] = React.useState<Survey[]>([])
  const [loading, setLoading] = React.useState(true)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [statusFilter, setStatusFilter] = React.useState<string>("")
  const [itemsPerPage, setItemsPerPage] = React.useState(10)

  const fetchSurveyData = async (): Promise<Survey[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(surveyData)
      }, 1000)
    })
  }

  // Fetch data on component mount
  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const surveyData = await fetchSurveyData()
        setData(surveyData)
      } catch (error) {
        console.error('Error fetching survey data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  // Handle status filter change
  React.useEffect(() => {
    if (statusFilter === "" || statusFilter === "all") {
      table.getColumn("status")?.setFilterValue("")
    } else {
      table.getColumn("status")?.setFilterValue([statusFilter])
    }
  }, [statusFilter, table])

  // Get filtered and sorted data for pagination
  const filteredAndSortedData = table.getSortedRowModel().rows
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

  // Get current page data from the sorted data
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = filteredAndSortedData.slice(startIndex, endIndex)

  // Reset to first page when filters, sorting, or items per page change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [columnFilters, sorting, itemsPerPage])

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
  }

  // Get unique status values for filter
  const statusOptions = Array.from(new Set(data.map(survey => survey.status)))

  if (loading) {
    return (
      <Card >
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">Loading surveys...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="p-0 border-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex gap-4 items-center mb-4 dark:pt-4 dark:ps-4">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]  !h-10">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <CiFilter size={35} className="text-secondary" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader  className="dark:bg-zinc-700" >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} >
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="py-3 text-zinc-500 ">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {currentPageData?.length ? (
                currentPageData.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-muted/50 "
                  >
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
                    No surveys found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between pt-4 w-full px-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length} surveys
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {totalPages > 1 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}