import React from 'react';
import { useTable, Column } from 'react-table';
import { InventoryDetails } from '../types/tables';

const InventoryDetailsTable = ({ data }: { data: InventoryDetails[] }) => {
  const columns: Column<InventoryDetails>[] = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        align: 'center',
      },
      {
        Header: 'Inventory ID',
        accessor: 'inventory_id',
        align: 'left',
      },
      {
        Header: 'Description',
        accessor: 'description',
        align: 'left',
      },
      {
        Header: 'Manufacturer',
        accessor: 'manufacturer',
        align: 'left',
      },
      {
        Header: 'Expiry Date',
        accessor: (row) => new Date(row.expiry_date).toLocaleDateString(),
        align: 'right',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full bg-white border border-blue-200">
        <thead className="bg-blue-50">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 border-b border-blue-200 text-black text-left text-sm uppercase font-medium"
                  style={{ textAlign: (column as any).align }}
                  key={column.id}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-blue-200">
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-blue-100" key={row.id}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm text-black"
                    style={{ textAlign: (cell.column as any).align }}
                    key={cell.column.id}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryDetailsTable;
