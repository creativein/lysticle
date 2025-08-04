import { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { contactService } from '../../services/contactService';
import Button from './Button';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  source?: string;
  submitted_at: string;
  created_at: string;
}

const columnHelper = createColumnHelper<Contact>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('message', {
    header: 'Message',
    cell: info => (
      <div className="max-w-xs truncate" title={info.getValue()}>
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('source', {
    header: 'Source',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('utm_medium', {
    header: 'Medium',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('utm_campaign', {
    header: 'Campaign',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('submitted_at', {
    header: 'Submitted',
    cell: info => new Date(info.getValue()).toLocaleString(),
  }),
];

export function ContactTable() {
  const [data, setData] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  });

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await contactService.fetchContacts({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });
      if (response.success && response.data) {
        setData(response.data.data || []);
        setPagination(prev => ({
          ...prev,
          pageCount: response.data.pagination.pages,
          total: response.data.pagination.total,
        }));
      } else {
        setError(response.message || 'Failed to fetch data');
      }
    } catch (error) {
      setError('An error occurred while fetching data');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.pageIndex]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        });
        setPagination(prev => ({
          ...prev,
          pageIndex: newState.pageIndex,
          pageSize: newState.pageSize,
        }));
      }
    },
    manualPagination: true,
    pageCount: pagination.pageCount,
  });

  if (error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {isLoading ? (
        <div className="p-4 text-center">Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                pagination.total
              )}{' '}
              of {pagination.total} results
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
