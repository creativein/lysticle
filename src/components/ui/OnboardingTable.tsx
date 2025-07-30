import { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { onboardingService } from '../../services/onboardingService';
import Button from './Button';

interface Onboarding {
  id: number;
  company_name: string;
  industry: string;
  company_size: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  job_title: string;
  domain: string;
  created_at?: string;
}

const columnHelper = createColumnHelper<Onboarding>();

const columns = [
  columnHelper.accessor('company_name', {
    header: 'Company Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('industry', {
    header: 'Industry',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('company_size', {
    header: 'Company Size',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('first_name', {
    header: 'First Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('last_name', {
    header: 'Last Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('domain', {
    header: 'Domain',
    cell: info => info.getValue(),
  }),
];

export function OnboardingTable() {
  const [data, setData] = useState<Onboarding[]>([]);
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
      const response = await onboardingService.fetchOnboardings();
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
    } catch (err) {
      setError('An error occurred while fetching data');
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
