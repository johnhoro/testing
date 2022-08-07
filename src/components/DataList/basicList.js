import React from "react";
import { Header, Table, Rating } from "semantic-ui-react";
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

const BasicList = (params) => {
  let columns = params.columns;
  let data = params.data;
  let subDomain = params.subDomain;

  let tableHeader = columns.map((column, i) => {
    return (
      <Table.HeaderCell
        style={{
          borderLeft: `${
            (demoTenants.includes(TENANTS(subDomain)) ||
              mygateTestTenants.includes(TENANTS(subDomain)) ||
              kiviTenants.includes(TENANTS(subDomain))) &&
            i === 0
              ? `1px solid rgba(34,36,38,.1)`
              : ` `
          }`,
          borderRight: `${
            (demoTenants.includes(TENANTS(subDomain)) ||
              kiviTenants.includes(TENANTS(subDomain))) &&
            i === columns.length - 1
              ? `1px solid rgba(34,36,38,.1)`
              : ` `
          }`,
        }}
        key={column.key}
      >
        {column.name}
      </Table.HeaderCell>
    );
  });

  let getRowCells = (columns, row) => {
    let cells = [];
    for (let columnIndex in columns) {
      let cellValue = row[columns[columnIndex].key];
      cells.push(
        <Table.Cell
          style={{
            borderLeft: `${
              (demoTenants.includes(TENANTS(subDomain)) ||
                mygateTestTenants.includes(TENANTS(subDomain)) ||
                kiviTenants.includes(TENANTS(subDomain))) &&
              columnIndex === `0`
                ? `1px solid rgba(34,36,38,.1)`
                : ` `
            }`,
            borderRight: `${
              (demoTenants.includes(TENANTS(subDomain)) ||
                mygateTestTenants.includes(TENANTS(subDomain)) ||
                kiviTenants.includes(TENANTS(subDomain))) &&
              columnIndex === String(columns.length - 1)
                ? `1px solid rgba(34,36,38,.1)`
                : ` `
            }`,
          }}
          key={columnIndex}
        >
          {columns[columnIndex].template
            ? columns[columnIndex].template(row, cellValue)
            : cellValue}
        </Table.Cell>
      );
    }
    return cells;
  };
  let tableRows = data.map((row, i) => {
    return (
      <Table.Row
        key={i}
        style={{
          backgroundColor: `${
            (demoTenants.includes(TENANTS(subDomain)) ||
              mygateTestTenants.includes(TENANTS(subDomain)) ||
              kiviTenants.includes(TENANTS(subDomain))) &&
            i % 2 !== 0
              ? `rgba(247, 248, 250, 0.5)`
              : ``
          }`,
          // borderLeft: `${
          //   demoTenants.includes(TENANTS(subDomain)) && i === 0
          //     ? `1px solid #cccfd9`
          //     : `none`
          // }`,
        }}
      >
        {getRowCells(columns, row)}
      </Table.Row>
    );
  });
  return (
    <Table
      style={{
        border: "0",
        borderBottom: `1px solid #dfe1e6`,
      }}
      celled
      padded
    >
      <Table.Header>
        {params.headerRow ?? ""}
        <Table.Row>{tableHeader}</Table.Row>
      </Table.Header>

      <Table.Body>{tableRows}</Table.Body>
    </Table>
  );
};

export default BasicList;
