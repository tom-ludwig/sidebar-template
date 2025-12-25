import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@api/generated/users/models";
import { userColumns } from "./user-columns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface UserDataTableProps {
  data: User[];
  pagination: {
    total_records: number;
    current_page: number;
    total_pages: number;
    limit: number;
    next_page?: number;
    prev_page?: number;
  };
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function UserDataTable({
  data,
  pagination,
  onPageChange,
  isLoading = false,
}: UserDataTableProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {userColumns.map((column) => (
                <TableHead key={column.id}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={userColumns.length}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Loading users...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={userColumns.length}
                  className="h-24 text-center"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <TableRow key={user.user_id}>
                  {userColumns.map((column) => (
                    <TableCell key={column.id}>
                      {column.accessor(user)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {data.length > 0 ? (pagination.current_page - 1) * pagination.limit + 1 : 0} to{" "}
          {Math.min(pagination.current_page * pagination.limit, pagination.total_records)} of{" "}
          {pagination.total_records} users
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.current_page - 1)}
            disabled={!pagination.prev_page || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {pagination.current_page} of {pagination.total_pages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.current_page + 1)}
            disabled={!pagination.next_page || isLoading}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

