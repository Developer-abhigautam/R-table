import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrAdd } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';


import { deleteData, mainData } from '../server/Api';
import { Link } from 'react-router-dom';

const columnHelper = createColumnHelper();

function Table() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['data'],
    queryFn: mainData,
    staleTime:10000  // stale time means chache time.......................................
  });

  const deleteMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries(['data']);
    },
    onError: (error) => {
      console.error('Error deleting user:', error);
    },
  });


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      toast.success("deleted successfully")
      deleteMutation.mutate(id);
    }
  }
 
  // setPaginationState function...................................................... 
  const setPaginationState = (updater) => {
    if (typeof updater === 'function') {
      const newPaginationState = updater({ pageIndex, pageSize });
      setPageIndex(newPaginationState.pageIndex);
      setPageSize(newPaginationState.pageSize);
    } else {
      setPageIndex(updater.pageIndex);
      setPageSize(updater.pageSize);
    }
  };

//column.................................................................................

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => 'First-name',
      // cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => 'Email-address',
      // cell: info => info.getValue(),
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: () => 'Contact-Number',
      // cell: info => info.getValue(),
    }),
    columnHelper.accessor('profile', {
      id: 'profile',
      header: () => 'Profile-img',
      // cell: info => <img src={info.getValue()} alt="Profile" style={{ width: '50px', height: '50px' }} />,
    }),
   
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className='flex gap-5'>
          <Link to="/create"><button
           type='button'
          ><GrAdd/></button></Link>
          <Link to={`/edit/${row.original.id}`}><button><MdEdit/></button></Link>
          <button onClick={() => handleDelete(row.original.id)}><MdDelete/></button>
        </div>
      ),
    }),
  ];


  // table ..............................................................................
  const table = useReactTable({
    data: Array.isArray(data) ? data : [],
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      
      globalFilter,
    },
    onPaginationChange: setPaginationState,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });


  //error handle............................................................................
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!Array.isArray(data) || data.length === 0) return <div>No data available</div>;

  return (
    <div>
      <ToastContainer />
      <h1>React TanStack Table</h1>
      <div>
        <input
          type="text"
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="mb-4 p-2 rounded outline-none border border-black"
        />


<h1>

</h1>
      </div>
      <table className="w-full">
        <thead className="border border-red-500 px-5">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border border-red-500 px-5">
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border border-red-500 px-5">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border border-black">
          {table.getRowModel().rows.map(row => (
            <React.Fragment key={row.id}>
              <tr className="border border-black">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border border-black">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>


      {/* //pagination.................................................................... */}
      <div className="flex items-center justify-center gap-5 mt-5">
        <button
          className="border bg-gray-400 p-2 rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <button
          className="border bg-gray-400 p-2 rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Table;
