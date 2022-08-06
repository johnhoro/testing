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

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    if (pageIndex !== 0) {
      fetchData({ pageIndex, pageSize });
    }
  }, [pageIndex]);

  useEffect(() => {
    //reset to first page when filter changes, filter changes -> fetchdata function changes
    if (pageIndex !== 0) {
      gotoPage(0);
      fetchData({ pageIndex: 0, pageSize });
    } else {
      fetchData({ pageIndex, pageSize });
    }
  }, [fetchData]);

  return (
    <>
      <Table
        style={{
          border: `${
            demoTenants.includes(TENANTS(subDomain)) ||
            mygateTestTenants.includes(TENANTS(subDomain)) ||
            intldemoTenants.includes(TENANTS(subDomain)) ||
            indifiTenants.includes(TENANTS(subDomain)) ||
            rotaryTenants.includes(TENANTS(subDomain)) ||
            treeboTenants.includes(TENANTS(subDomain)) ||
            kiviTenants.includes(TENANTS(subDomain))
              ? `0`
              : ``
          }`,
          borderBottom: `${
            demoTenants.includes(TENANTS(subDomain)) ||
            mygateTestTenants.includes(TENANTS(subDomain)) ||
            intldemoTenants.includes(TENANTS(subDomain)) ||
            indifiTenants.includes(TENANTS(subDomain)) ||
            rotaryTenants.includes(TENANTS(subDomain)) ||
            treeboTenants.includes(TENANTS(subDomain)) ||
            kiviTenants.includes(TENANTS(subDomain))
              ? `1px solid #dfe1e6`
              : ``
          }`,
        }}
        {...getTableProps()}
        celled
        compact
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{
                backgroundColor: `${
                  demoTenants.includes(TENANTS(subDomain)) ||
                  mygateTestTenants.includes(TENANTS(subDomain)) ||
                  intldemoTenants.includes(TENANTS(subDomain)) ||
                  indifiTenants.includes(TENANTS(subDomain)) ||
                  rotaryTenants.includes(TENANTS(subDomain)) ||
                  treeboTenants.includes(TENANTS(subDomain)) ||
                  kiviTenants.includes(TENANTS(subDomain))
                    ? `white`
                    : ``
                }`,
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
              {onDownload &&
              (demoTenants.includes(TENANTS(subDomain)) ||
                mygateTestTenants.includes(TENANTS(subDomain)) ||
                intldemoTenants.includes(TENANTS(subDomain)) ||
                indifiTenants.includes(TENANTS(subDomain)) ||
                rotaryTenants.includes(TENANTS(subDomain)) ||
                treeboTenants.includes(TENANTS(subDomain)) ||
                kiviTenants.includes(TENANTS(subDomain))) ? (
                <Button
                  floated="right"
                  icon
                  //   color={"violet"}
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
                  {/* <Icon name='cloud download' /> */}
                  <Image
                    src="images/download.png"
                    size="mini"
                    style={{ width: "16px", height: "16px", margin: "10px" }}
                  />
                  <span>Download</span>
                </Button>
              ) : (
                <>
                  {onDownload ? (
                    <Button
                      floated="right"
                      icon
                      color={"violet"}
                      as="a"
                      onClick={onDownload}
                    >
                      <Icon name="cloud download" />
                    </Button>
                  ) : (
                    " "
                  )}
                </>
              )}

              {groupByOptions ? (
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
              )}
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
        <Table.Body {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <>
                <tr
                  style={{
                    // backgroundColor: `${i % 2 !== 0 && demoTenants.includes(TENANTS(subDomain)) : `rgba(247, 248, 250, 0.5)` : ``}`,
                    backgroundColor: `${
                      (demoTenants.includes(TENANTS(subDomain)) ||
                        mygateTestTenants.includes(TENANTS(subDomain)) ||
                        intldemoTenants.includes(TENANTS(subDomain)) ||
                        indifiTenants.includes(TENANTS(subDomain)) ||
                        rotaryTenants.includes(TENANTS(subDomain)) ||
                        treeboTenants.includes(TENANTS(subDomain)) ||
                        kiviTenants.includes(TENANTS(subDomain))) &&
                      i % 2 !== 0
                        ? `rgba(247, 248, 250, 0.5)`
                        : ``
                    }`,
                  }}
                  key={i}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        key={i}
                        // style={{
                        //   borderLeft: "none",
                        // }}
                        {...cell.getCellProps([
                          {
                            style: cell.column.style,
                          },
                        ])}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {/*
                                      Inside it, call our renderRowSubComponent function. In reality,
                                      you could pass whatever you want as props to
                                      a component like this, including the entire
                                      table instance. But for this example, we'll just
                                      pass the row
                                    */}
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </>
            );
          })}
        </Table.Body>
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
