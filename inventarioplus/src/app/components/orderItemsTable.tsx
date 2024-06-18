import React from 'react';
import { useTable, Column } from 'react-table';
import { OrderItems } from '../types/tables';

const OrderItemsTable = ({ data }: { data: OrderItems[] }) => {
  const columns: Column<OrderItems>[] = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        align: 'center',
      },
      {
        Header: 'Order ID',
        accessor: 'order_id',
        align: 'left',
      },
      {
        Header: 'Product ID',
        accessor: 'product_id',
        align: 'left',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        align: 'right',
      },
      {
        Header: 'Price',
        accessor: 'price',
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

export default OrderItemsTable;
