import React, { Component, useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Step,
  Icon,
  Label,
  Dropdown,
  Input,
  Button,
  Segment,
  Grid,
  Divider,
  Search,
  Popup,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { getAuth } from "firebase/auth";
import {
  getQueryDataAction,
  setFilterAction,
} from "../actions/queryDataActions";
import { getQueryConfig } from "../container/ApplicationsCache";
import BasicList from "./DataList/basicList";
import DataTable from "./DataList/dataTable";
import {
  getDataListData,
  getDataListDownload,
} from "../services/queryDataService";
import { formatCurrency, formatDateString } from "../utils/formatingUtil";
import { indifiTenants, TENANTS, TENANT_IDs } from "../utils/constants";
import { useAuthState } from "react-firebase-hooks/auth";

const ReconciliationPage = ({ subDomain }) => {
  console.log("SUBDOMAIN:: " + subDomain);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.queryData.filter);
  // const auth = getAuth(firebaseApp);
  // const [user, error] = useAuthState(auth);

  // We'll start our table without any data
  const [data, setData] = React.useState({ data: [], columns: [] });
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const visibleColumns = [
    {
      Header: "Is Reconciled",
      accessor: "is_captured",
      Cell: (value, data) => {
        return (
          <Popup
            flowing
            hoverable
            wide
            trigger={
              value.cell.row.original.is_captured &&
              value.cell.row.original.is_receipt_generated &&
              value.cell.row.original.is_settled &&
              value.cell.row.original.is_paid_out ? (
                <Icon
                  name="check"
                  size="tiny"
                  color="green"
                  style={{ fontSize: "1em" }}
                />
              ) : (
                <Icon
                  name="exclamation"
                  size="tiny"
                  color="red"
                  style={{ fontSize: "1em" }}
                />
              )
            }
          >
            <Step.Group>
              <Step>
                {value.cell.row.original.is_captured ? (
                  <Icon
                    name="check"
                    size="tiny"
                    color="green"
                    style={{ fontSize: "1em" }}
                  />
                ) : (
                  ""
                )}
                Captured
              </Step>
              <Step>
                {value.cell.row.original.is_receipt_generated ? (
                  <Icon
                    name="check"
                    size="tiny"
                    color="green"
                    style={{ fontSize: "1em" }}
                  />
                ) : (
                  ""
                )}
                Receipt
              </Step>
              <Step>
                {value.cell.row.original.is_settled ? (
                  <Icon
                    name="check"
                    size="tiny"
                    color="green"
                    style={{ fontSize: "1em" }}
                  />
                ) : (
                  ""
                )}
                Settled
              </Step>
              <Step>
                {value.cell.row.original.is_paid_out ? (
                  <Icon
                    name="check"
                    size="tiny"
                    color="green"
                    style={{ fontSize: "1em" }}
                  />
                ) : (
                  ""
                )}
                PaidOut
              </Step>
            </Step.Group>
          </Popup>
        );
      },
    },
    {
      Header: "TxnID",
      accessor: "txnid",
    },
    {
      Header: "Txn Date",
      accessor: "pg_pay_date",
    },
    {
      Header: "Settlement Date",
      accessor: "pg_setl_date",
    },
    {
      Header: "Payout Date",
      accessor: "pg_pout_process_date",
    },
    {
      Header: "Amount",
      accessor: "pg_pay_total_amount",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Receipt Amount",
      accessor: "merc_pay_total_amount",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Payout Amount",
      accessor: "pg_pout_total_amount",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Txn Status",
      accessor: "pg_pay_status",
    },
    {
      Header: "Txn Type",
      accessor: "merc_pout_type",
    },
    {
      Header: "Payout Status",
      accessor: "merc_pout_status",
    },
    {
      Header: "Receipt",
      accessor: "merc_pay_receipt_no",
    },
  ];

  const visibleColumnsIndifi = [
    {
      Header: "Txn ID",
      accessor: "transaction_id",
      style: {
        textAlign: "center",
        borderLeft: "none",
        borderRight: "none",
      },
    },
    {
      Header: "UTR No.",
      accessor: "utr",
      style: { borderLeft: "none", borderRight: "none" },
    },
    {
      Header: "Credit Date",
      accessor: "tran_date",
      style: { borderLeft: "none", borderRight: "none" },
    },
    {
      Header: "Debit Date",
      accessor: "value_date",
      style: { borderLeft: "none", borderRight: "none" },
    },
    {
      Header: "Credit Amount",
      accessor: "amount_credit",
      style: { textAlign: "right", borderLeft: "none" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },

    {
      Header: "Debit Amount",
      accessor: "amount_debit", //change
      style: { textAlign: "right", borderLeft: "none" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Settlement Duration",
      accessor: "settlement_duration", //change
      style: { textAlign: "right", borderLeft: "none" },
      Cell: (value, data) => {
        return value.value === null ? value.value : `${value.value} Days`;
      },
    },
    {
      Header: "Reconcile Status",
      accessor: "van", //change
      style: {
        textAlign: "center",
        borderLeft: "none",
        borderRight: "1px solid #dfe1e6",
      },
      Cell: (value, data) => {
        if (
          value.cell.row.original.amount_credit -
            value.cell.row.original.amount_debit <
            0.01 &&
          value.cell.row.original.flag_found === true &&
          value.cell.row.original.found_in_debit === true
        ) {
          return (
            <>
              <Icon name="check circle" color="green" /> {"Reconciled"}
            </>
          );
        } else {
          return (
            <>
              <Icon name="times circle" color="red" /> {"Not Reconciled"}
            </>
          );
        }
      },
    },

    // {
    //   Header: "Overall",
    //   accessor: "pg_pay_api_status",
    //   Cell: (value, data) => {
    //     return (
    //       <>
    //         {value.cell.row.original.pg_pay_captured !== false ? (
    //           <Icon name="check circle" color="green" />
    //         ) : (
    //           <Icon name="times circle" color="red" />
    //         )}
    //         Captured |{" "}
    //         {value.cell.row.original.pg_pay_agent_status !== null ||
    //         value.cell.row.original.pg_pay_api_status !== null ? (
    //           <Icon name="check circle" color="green" />
    //         ) : (
    //           <Icon name="times circle" color="red" />
    //         )}
    //         In A/C Stmnt |{" "}
    //         {(value.cell.row.original.pg_pay_agent_status?.toLowerCase() ===
    //           value.cell.row.original.pg_pay_status_2?.toLowerCase() ||
    //           value.cell.row.original.pg_pay_api_status?.toLowerCase() ===
    //             value.cell.row.original.pg_pay_status_2?.toLowerCase()) &&
    //         value.cell.row.original.pg_pay_status_2 !== null ? (
    //           <Icon name="check circle" color="green" />
    //         ) : (
    //           <Icon name="times circle" color="red" />
    //         )}
    //         Reconciled
    //       </>
    //     );
    //   },
    // },
  ];
  const columnMap = {
    //attention
    // default: visibleColumns,
    [TENANT_IDs.indifitest]: visibleColumnsIndifi,
    [TENANT_IDs.indifi]: visibleColumnsIndifi,
  };

  //const responseData = useSelector(state => state.queryData.response['transactionsList']);
  // useEffect(() => {
  //   dispatch(getQueryDataAction('transactionsList'));
  // }, [])

  const onDownload = () => {
    setLoading(true);
    let filterBody = { ...filter };
    delete filterBody.whereClause;
    let config = {};
    if (indifiTenants.includes(TENANTS(subDomain))) {
      config = getQueryConfig("indifiReconciliation");
      console.log(config);
    }
    getDataListDownload(
      false,
      {
        ...config,
        filter: { ...config.filter, ...filterBody },
        whereClause:
          config.whereClause ||
          "" + " " + Object.values(filter.whereClause || {}).join(" "),
      },
      (url) => {
        setLoading(false);
        window.open(url, "_blank");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      // This will get called when the table needs new data
      // You could fetch your data from literally anywhere,
      // even a server. But for this example, we'll just fake it.

      // Give this fetch an ID
      const fetchId = ++fetchIdRef.current;

      // Set the loading state
      setLoading(true);
      let filterBody = { ...filter };
      delete filterBody.whereClause;
      console.log(filter);
      let config = {};
      if (indifiTenants.includes(TENANTS(subDomain))) {
        config = getQueryConfig("indifiReconciliation");
      }
      getDataListData(
        {
          ...config,
          filter: { ...config.filter, ...filterBody },
          whereClause:
            (config.whereClause || "") +
            " " +
            Object.values(filter.whereClause || {}).join(" "),
          pageNumber: pageIndex,
          limit: pageSize,
        },
        (json) => {
          console.log(json.data, `hello`);
          //let resultJson = {};
          //resultJson['transactionsList'] = json
          if (fetchId === fetchIdRef.current) {
            // let columns = json.data.length ? json.schema.fields.filter(field => visibleColumns[field.name] ? true : false).map(field => {
            //   if (visibleColumns[field.name].cell) {
            //     return { Header: visibleColumns[field.name].header, accessor: field.name, Cell: visibleColumns[field.name].cell, id: visibleColumns[field.name].id };
            //   }
            //   return { Header: visibleColumns[field.name].header, accessor: field.name };
            // }) : []
            let columns =
              columnMap[TENANTS(subDomain) || "default"] || columnMap.default;
            console.log("toyota", columns, TENANTS(subDomain), json.data);
            columns.unshift({
              // Make an expander cell
              Header: () => null, // No header
              id: "expander", // It needs an ID

              style: {
                borderLeft: `${`1px solid #dfe1e6`}`,
              },
              Cell: ({ row }) => (
                // Use Cell to render an expander for each row.
                // We can use the getToggleRowExpandedProps prop-getter
                // to build the expander.
                <span {...row.getToggleRowExpandedProps()}>
                  {row.isExpanded ? (
                    <Icon name="angle down" />
                  ) : (
                    <Icon name="angle right" />
                  )}
                </span>
              ),
            });
            setData({ data: json.data, columns: columns });

            setPageCount(
              Math.ceil(
                (json.data?.[0]?.pagination_total_rows || pageSize) / pageSize
              )
            );
            setLoading(false);
          }
          return;
        },
        (error) => {
          setLoading(false);
        }
      );
    },
    [filter]
  );

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: "10px",
        }}
      >
        <code>{JSON.stringify({ values: row.original }, null, 2)}</code>
      </pre>
    ),
    []
  );
  return (
    <div style={{ overflow: "auto", height: "100%" }}>
      {loading ? (
        <Dimmer active inverted>
          <Loader inverted size="large" />
        </Dimmer>
      ) : null}

      <DataTable
        columns={data.columns}
        data={data.data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        renderRowSubComponent={renderRowSubComponent}
        onDownload={onDownload}
        pageSize={200}
        subDomain={subDomain}
      />
      {/* <BasicList columns={columns} data={[{"date": "September 14, 2013", "txnStatus": "captured", "gateway": "razorpay", "amount": "15,000", "requestId": ""}]}/> */}
    </div>
  );
};

export default ReconciliationPage;
