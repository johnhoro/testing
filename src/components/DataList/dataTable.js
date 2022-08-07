import React, { useEffect } from "react";
import { useTable, usePagination, useExpanded } from "react-table";
import {
  Button,
  Dropdown,
  Icon,
  Image,
  Label,
  Menu,
  Table,
} from "semantic-ui-react";
import {
  demoTenants,
  intldemoTenants,
  mygateTestTenants,
  rotaryTenants,
  treeboTenants,
  kiviTenants,
  TENANTS,
  indifiTenants,
} from "../../utils/constants";

const DataTable = ({
  columns,
  data,
  fetchData,
  loading,
  subDomain,
  pageCount: controlledPageCount,
  renderRowSubComponent,
  onDownload,
  groupByOptions,
  onGroupByChange,
  pageSize: controlledPageSize = 200,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize, expanded },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: controlledPageSize },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useExpanded,
    usePagination
  );

  console.log(page, data, headerGroups, "dataTable");

  // Listen for changes in pagination and use the state to fetch our new data
  // React.useEffect(() => {
  //   if (pageIndex !== 0) {
  //     fetchData({ pageIndex, pageSize });
  //   }
  // }, [pageIndex]);

  // useEffect(() => {
  //   //reset to first page when filter changes, filter changes -> fetchdata function changes
  //   if (pageIndex !== 0) {
  //     gotoPage(0);
  //     fetchData({ pageIndex: 0, pageSize });
  //   } else {
  //     fetchData({ pageIndex, pageSize });
  //   }
  // }, [fetchData]);

  return (
    <>
      <Table
        style={{
          border: "0",
          borderBottom: `1px solid #dfe1e6`,
        }}
        {...getTableProps()}
        celled
        compact
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{
                backgroundColor: "white",
              }}
              colSpan={columns.length}
            >
              <Menu floated="left" size="tiny">
                <Menu.Item>
                  Page {pageIndex + 1} of {pageOptions.length}{" "}
                </Menu.Item>
                <Menu.Item
                  as="a"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item
                  as="a"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
              <Button
                floated="right"
                icon
                as="a"
                onClick={onDownload}
                style={{
                  backgroundColor: "#6A4C93",
                  display: "flex",
                  alignItems: "center",
                  padding: "0",
                  paddingRight: "1em",
                  color: "white",
                }}
              >
                <Image
                  src="images/download.png"
                  size="mini"
                  style={{ width: "16px", height: "16px", margin: "10px" }}
                />
                <span>Download</span>
              </Button>

              {/* {groupByOptions ? (
                <Menu
                  floated="right"
                  pagination
                  size="tiny"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <Menu.Item>Group by</Menu.Item>
                  <Menu.Item>
                    <Dropdown
                      inline
                      options={groupByOptions}
                      onChange={onGroupByChange}
                    />
                  </Menu.Item>
                </Menu>
              ) : (
                ""
              )} */}
            </Table.HeaderCell>
          </Table.Row>
          {headerGroups.map((headerGroup) => (
            <Table.Row {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <Table.HeaderCell
                  style={{
                    borderLeft: `${
                      (demoTenants.includes(TENANTS(subDomain)) ||
                        mygateTestTenants.includes(TENANTS(subDomain)) ||
                        intldemoTenants.includes(TENANTS(subDomain)) ||
                        indifiTenants.includes(TENANTS(subDomain)) ||
                        rotaryTenants.includes(TENANTS(subDomain)) ||
                        treeboTenants.includes(TENANTS(subDomain)) ||
                        kiviTenants.includes(TENANTS(subDomain))) &&
                      i === 0
                        ? `1px solid #DFE1E6`
                        : `none`
                    }`,
                    borderRight: `${
                      (demoTenants.includes(TENANTS(subDomain)) ||
                        mygateTestTenants.includes(TENANTS(subDomain)) ||
                        intldemoTenants.includes(TENANTS(subDomain)) ||
                        indifiTenants.includes(TENANTS(subDomain)) ||
                        rotaryTenants.includes(TENANTS(subDomain)) ||
                        treeboTenants.includes(TENANTS(subDomain)) ||
                        kiviTenants.includes(TENANTS(subDomain))) &&
                      i === headerGroup.headers.length - 1
                        ? `1px solid rgba(34,36,38,.1)`
                        : `none`
                    }`,
                    fontSize: `${
                      demoTenants.includes(TENANTS(subDomain)) ||
                      mygateTestTenants.includes(TENANTS(subDomain)) ||
                      intldemoTenants.includes(TENANTS(subDomain)) ||
                      indifiTenants.includes(TENANTS(subDomain)) ||
                      rotaryTenants.includes(TENANTS(subDomain)) ||
                      kiviTenants.includes(TENANTS(subDomain)) ||
                      treeboTenants.includes(TENANTS(subDomain))
                        ? `12px`
                        : ``
                    }`,
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <table id="table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#C4C4C4" }}>
            <tr>
              <td> </td>
              <td>Order ID</td>
              <td>Order Status</td>
              <td>Date</td>
              <td style={{ textAlign: "center" }}>Channel</td>
              <td style={{ width: "131px" }}>Customer Payable</td>
              <td style={{ width: "110px", textAlign: "right" }}>Commission</td>
              <td style={{ textAlign: "right" }}>Charges</td>
              <td style={{ textAlign: "right" }}>Taxes</td>
              <td style={{ textAlign: "right", width: "150px" }}>
                Net-Receivable
              </td>
              <td style={{ textAlign: "center" }}>Reconcile Status</td>
            </tr>
          </thead>
          <tbody>
            {data.map((elm, i) => (
              <tr key={i}>
                <td className="order-id">{elm.id} </td>
                <td style={{ color: "#0F88E0" }}> {elm.order_id}</td>
                <td> {elm.sale_order_status}</td>
                <td>{elm.order_date_timestamp}</td>
                <td style={{ textAlign: "center" }}>{elm.channel_name}</td>
                <td style={{ textAlign: "right" }}> {elm.total_price}</td>
                <td style={{ textAlign: "right" }}>{elm.negative_sum}</td>
                <td style={{ textAlign: "right" }}>{elm.charges}</td>
                <td style={{ textAlign: "right" }}> {elm.product_tax}</td>
                <td style={{ textAlign: "right" }}> {elm.product_tax1}</td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  <img width="15px" src={elm.is_cod} />
                </td>
                {/* <td> {elm.subtotal}</td> */}
                {/* <td> {elm.is_cod}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <Table.Footer></Table.Footer>
      </Table>
      {/* <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}

            </div> */}
    </>
  );
};

export default DataTable;
