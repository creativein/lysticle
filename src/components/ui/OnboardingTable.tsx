import { useEffect, useState, useCallback } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { onboardingService } from '../../services/onboardingService';
import Button from './Button';
import Dialog from '../../components/Dialog';

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
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const columnHelper = createColumnHelper<Onboarding>();

const columns = [
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
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('domain', {
    header: 'Domain',
    cell: info => info.getValue(),
  }),
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
  columnHelper.accessor('utm_source', {
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
  columnHelper.accessor('utm_term', {
    header: 'Search Term',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('utm_content', {
    header: 'Content',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('created_at', {
    header: 'Submitted',
    cell: info => info.getValue() || new Date(info.getValue()).toLocaleString() || '-',
  }),
];

interface FilterState {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

interface DialogState {
  isOpen: boolean;
  onboardingId: number | null;
}

export function OnboardingTable() {
  const [data, setData] = useState<Onboarding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  });
  const [deleteDialog, setDeleteDialog] = useState<DialogState>({
    isOpen: false,
    onboardingId: null,
  });

  // Add delete handling functions
  const handleDeleteClick = (id: number) => {
    setDeleteDialog({
      isOpen: true,
      onboardingId: id,
    });
  };

  const handleConfirmDelete = async () => {
    if (deleteDialog.onboardingId) {
      setIsLoading(true);
      try {
        const response = await onboardingService.deleteOnboarding(deleteDialog.onboardingId);
        if (response.success) {
          // Refresh data after successful deletion
          fetchData();
        } else {
          setError(response.message || 'Failed to delete record');
        }
      } catch (error) {
        setError('An error occurred while deleting the record');
        console.error(error);
      } finally {
        setIsLoading(false);
        // Close the dialog
        setDeleteDialog({
          isOpen: false,
          onboardingId: null,
        });
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({
      isOpen: false,
      onboardingId: null,
    });
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await onboardingService.fetchOnboardings({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        filters: {
          utm_source: filters.utm_source,
          utm_medium: filters.utm_medium,
          utm_campaign: filters.utm_campaign
        }
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
  }, [pagination.pageIndex, pagination.pageSize, filters]);

  useEffect(() => {
    fetchData();
  }, [pagination.pageIndex, filters.utm_source, filters.utm_medium, filters.utm_campaign, fetchData]);

  const columnsWithActions = [
    ...columns,
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <button
          onClick={() => handleDeleteClick(info.row.original.id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns: columnsWithActions,
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
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="utm_source" className="block text-sm font-medium text-gray-700">
              UTM Source
            </label>
            <input
              type="text"
              id="utm_source"
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
              placeholder="Filter by source"
              value={filters.utm_source}
              onChange={(e) => setFilters(prev => ({ ...prev, utm_source: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="utm_medium" className="block text-sm font-medium text-gray-700">
              UTM Medium
            </label>
            <input
              type="text"
              id="utm_medium"
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
              placeholder="Filter by medium"
              value={filters.utm_medium}
              onChange={(e) => setFilters(prev => ({ ...prev, utm_medium: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="utm_campaign" className="block text-sm font-medium text-gray-700">
              UTM Campaign
            </label>
            <input
              type="text"
              id="utm_campaign"
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
              placeholder="Filter by campaign"
              value={filters.utm_campaign}
              onChange={(e) => setFilters(prev => ({ ...prev, utm_campaign: e.target.value }))}
            />
          </div>
        </div>
      </div>
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
      {/* Add confirmation dialog */}
      {deleteDialog.isOpen && (
        <Dialog
          title="Confirm Deletion"
          isOpen={deleteDialog.isOpen}
          onClose={handleCancelDelete}
        >
          <p>Are you sure you want to delete this record? This action cannot be undone.</p>
          <div className="mt-4 flex justify-end space-x-3">
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
