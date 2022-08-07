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
import {
  bankitTenants,
  mosaicTenants,
  mosaicTestTenants,
  TENANTS,
  TENANT_IDs,
} from "../utils/constants";
import { useAuthState } from "react-firebase-hooks/auth";

const OrderPage = ({ subDomain }) => {
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
      Cell: (value, data) => {
        return formatDateString(value.value);
      },
    },
    {
      Header: "Settlement Date",
      accessor: "pg_setl_date",
      Cell: (value, data) => {
        return formatDateString(value.value);
      },
    },
    {
      Header: "Payout Date",
      accessor: "pg_pout_process_date",
      Cell: (value, data) => {
        return formatDateString(value.value);
      },
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

  const visibleColumnsBankit = [
    {
      Header: "RR No",
      accessor: "RRN_NO",
    },
    {
      Header: "Txn Date",
      accessor: "Transaction_Effective_Date",
      Cell: (value, data) => {
        return formatDateString(value.value);
      },
    },
    {
      Header: "Processing Date",
      accessor: "System_Processing_Date",
      Cell: (value, data) => {
        return formatDateString(value.value);
      },
    },
    {
      Header: "Debit Amount",
      accessor: "Debits",
      Cell: (value, data) =>
        formatCurrency(
          value.cell.row.original.Debits !== null
            ? value.cell.row.original.Debits
            : 0
        ),
    },
    {
      Header: "Credit Amount",
      accessor: "Credits",
      Cell: (value, data) =>
        formatCurrency(
          value.cell.row.original.Credits !== null
            ? value.cell.row.original.Credits
            : 0
        ),
    },
    // {
    //   Header: "Txn Status",
    //   accessor: "pg_pay_captured",
    //   Cell: (value, data) => (value.value === false ? "Other" : "Captured"),
    // },
    // {
    //   Header: "A/C Amnt Status",
    //   accessor: "Accont_Number",
    //   Cell: (value, data) => {
    //     if (
    //       value.cell.row.original.pg_pay_agent_status !== null ||
    //       value.cell.row.original.pg_pay_api_status !== null
    //     ) {
    //       return "Captured";
    //     } else {
    //       return "Other";
    //     }
    //   },
    // },

    {
      Header: "Fino Status",
      accessor: "Transaction_Status", //change
      Cell: (value, data) => {
        let result =
          value.cell.value &&
          value.cell.value
            .split(``)
            .map((e, i) => (i === 0 ? e : e.toLowerCase()))
            .join(``);
        return result;
      },
    },
    {
      Header: "Bankit Status",
      accessor: "pg_pay_agent_status", //change
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Reconciled Status",
      accessor: "Branch_Code",
      Cell: (value, data) => {
        if (
          (value.cell.row.original.pg_pay_agent_status?.toLowerCase() ===
            value.cell.row.original.Transaction_Status?.toLowerCase() ||
            value.cell.row.original.pg_pay_api_status?.toLowerCase() ===
              value.cell.row.original.Transaction_Status?.toLowerCase()) &&
          value.cell.row.original.Transaction_Status !== null
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
    //           value.cell.row.original.Transaction_Status?.toLowerCase() ||
    //           value.cell.row.original.pg_pay_api_status?.toLowerCase() ===
    //             value.cell.row.original.Transaction_Status?.toLowerCase()) &&
    //         value.cell.row.original.Transaction_Status !== null ? (
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
  const visibleColumnsMosaic = [
    {
      Header: "Order ID",
      accessor: "order_id",
    },
    {
      Header: "Order Status",
      accessor: "sale_order_status",
    },
    {
      Header: "Date",
      accessor: "posted_date",
    },
    {
      Header: "Channel",
      accessor: "channel_name",
    },
    {
      Header: "Customer Payable",
      accessor: "total_price",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Commissions & Charges",
      accessor: "negative_sum",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },

    {
      Header: "Taxes",
      accessor: "product_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Net Receivable",
      accessor: "positive_sum",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(
          value.cell.row.original.principal +
            value.cell.row.original.product_tax +
            value.cell.row.original.negative_sum
        );
      },
    },
    {
      Header: "Reconcile Status",
      accessor: "is_cod",
      style: { textAlign: "center" },
      Cell: (value, data) => {
        if (
          Math.abs(
            value.cell.row.original.principal - value.cell.row.original.subtotal
          ) < 0.01
        ) {
          return (
            <>
              <span
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Reconciled
              </span>
            </>
          );
        } else if (
          Math.abs(
            value.cell.row.original.principal - value.cell.row.original.subtotal
          ) >= 0.01 &&
          value.cell.row.original.principal > value.cell.row.original.subtotal
        ) {
          return (
            <>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#D6181D",
                }}
              >
                Short Received
              </span>
            </>
          );
        } else {
          return (
            <>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#DB9D3E",
                }}
              >
                Excess Received
              </span>
            </>
          );
        }
      },
    },
    // {
    //   Header: "Payment Status",
    //   accessor: "sku",
    //   style: { textAlign: "center" },
    //   Cell: (value, data) => {
    //     if (
    //       value.cell.row.original.present_in_uniware === true &&
    //       value.cell.row.original.present_in_channel_amazon === true &&
    //       value.cell.row.original.principal -
    //         value.cell.row.original.total_price <
    //         0.01
    //     ) {
    //       return <>{"Reconciled"}</>;
    //     } else if (
    //       value.cell.row.original.present_in_uniware === true &&
    //       value.cell.row.original.present_in_channel_amazon === true &&
    //       value.cell.row.original.principal -
    //         value.cell.row.original.total_price >=
    //         0.01 &&
    //       value.cell.row.original.principal >
    //         value.cell.row.original.total_price
    //     ) {
    //       return <>{"Overpaid"}</>;
    //     } else if (
    //       value.cell.row.original.present_in_uniware === true &&
    //       value.cell.row.original.present_in_channel_amazon === true &&
    //       value.cell.row.original.principal -
    //         value.cell.row.original.total_price >=
    //         0.01 &&
    //       value.cell.row.original.principal >
    //         value.cell.row.original.total_price
    //     ) {
    //       return <>{"Underpaid"}</>;
    //     }
    //   },
    // },
  ];
  const visibleColumnsMosaicTest = [
    {
      Header: "Order ID",
      accessor: "order_id",
      style: { color: "#0F88E0" },
    },
    {
      Header: "Order Status",
      accessor: "sale_order_status",
    },
    {
      Header: "Date",
      accessor: "order_date_timestamp",
    },
    {
      Header: "Channel",
      accessor: "channel_name",
    },
    {
      Header: "Customer Payable",
      accessor: "total_price",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Commissions",
      accessor: "negative_sum",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Charges",
      accessor: "charges",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },

    {
      Header: "Taxes",
      accessor: "product_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Net Receivable",
      accessor: "product_tax1",
      style: { textAlign: "right" },
    },
    {
      Header: "Reconcile Status",
      accessor: "is_cod",
      style: { textAlign: "center" },
      Cell: (value, data) => {
        return <img width="15px" src={value.value} alt={value.value} />;
      },
      // Cell: (value, data) => {
      //   if (value.cell.row.original.recon_status === `matching`) {
      //     return (
      //       <>
      //         <span
      //           style={{
      //             color: "green",
      //             fontWeight: "bold",
      //           }}
      //         >
      //           Reconciled
      //         </span>
      //       </>
      //     );
      //   } else if (value.cell.row.original.recon_status === `overpaid`) {
      //     return (
      //       <>
      //         <span
      //           style={{
      //             fontWeight: "bold",
      //             color: "#D6181D",
      //           }}
      //         >
      //           Short Received
      //         </span>
      //       </>
      //     );
      //   } else {
      //     return (
      //       <>
      //         <span
      //           style={{
      //             fontWeight: "bold",
      //             color: "#DB9D3E",
      //           }}
      //         >
      //           Excess Received
      //         </span>
      //       </>
      //     );
      //   }
      // },
    },
    // {
    //   Header: "Payment Status",
    //   accessor: "sku",
    //   style: { textAlign: "center" },
    //   Cell: (value, data) => {
    //     if (
    //       value.cell.row.original.present_in_uniware === true &&
    //       value.cell.row.original.present_in_channel_amazon === true &&
    //       value.cell.row.original.principal -
    //         value.cell.row.original.total_price <
    //         0.01
    //     ) {
    //       return <>{"Reconciled"}</>;
    //     } else if (
    //       value.cell.row.original.present_in_uniware === true &&
    //       value.cell.row.original.present_in_channel_amazon === true &&
    //       value.cell.row.original.principal -
    //         value.cell.row.original.total_price >=
    //         0.01 &&
    //       value.cell.row.original.principal >
    //         value.cell.row.original.total_price
    //     ) {
    //       return <>{"Overpaid"}</>;
    //     } else if (
    //       value.cell.row.original.present_in_uniware === true &&
    //       value.cell.row.original.present_in_channel_amazon === true &&
    //       value.cell.row.original.principal -
    //         value.cell.row.original.total_price >=
    //         0.01 &&
    //       value.cell.row.original.principal >
    //         value.cell.row.original.total_price
    //     ) {
    //       return <>{"Underpaid"}</>;
    //     }
    //   },
    // },
  ];

  const columnMap = {
    //attention
    // default: visibleColumns,
    [TENANT_IDs.mosaictest]: visibleColumnsMosaicTest,
    [TENANT_IDs.mosaic]: visibleColumnsMosaic,
    // [TENANT_IDs.bankit]: visibleColumnsBankit,
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
    if (mosaicTenants.includes(TENANTS(subDomain))) {
      config = getQueryConfig("MosaicReconciliation");
    }
    if (mosaicTestTenants.includes(TENANTS(subDomain))) {
      config = getQueryConfig("MosaicTestReconciliation");
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
      let config = {};
      if (mosaicTenants.includes(TENANTS(subDomain))) {
        config = getQueryConfig("MosaicReconciliation");
      }
      if (mosaicTestTenants.includes(TENANTS(subDomain))) {
        config = getQueryConfig("MosaicTestReconciliation");
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
            console.log("toyota", columns, TENANTS(subDomain), json);
            columns.unshift({
              // Make an expander cell
              Header: () => null, // No header
              id: "expander", // It needs an ID
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
  let jdata = [
    {
      channel_name: "Swiggy",
      cost_price: null,
      discount: 0,
      index: 0,
      negative_sum: "₹20.0",
      charges: "₹89.62",
      order_date_timestamp: "26 Dec 2021",
      order_id: "xxxxxxxxxxxxxxxxx",
      pagination_total_rows: 5933,
      present_in_uniware: true,
      principal: null,
      product_tax: "₹20.42",
      product_tax1: "₹298.75",
      recon_status: null,
      sale_order_status: "Delivered",
      subtotal: 804.24,
      total_amount: null,
      total_price: "₹428.79",
      Cells: [
        { channel_name: "Swiggy" },
        { cost_price: null },
        { discount: 0 },
        { index: 0 },
        { negative_sum: 20.0 },
        { charges: 89.62 },
        { order_date_timestamp: "26 Dec 2021" },
        { order_id: "xxxxxxxxxxxxxxxxx" },
        { pagination_total_rows: 5933 },
        { present_in_uniware: true },
        { principal: null },
        { product_tax: 20.42 },
        { product_tax1: 298.75 },
        { recon_status: null },
        { sale_order_status: "Delivered" },
        { subtotal: 804.24 },
        { total_amount: null },
        { total_price: 428.79 },
        {
          is_cod:
            "https://i.pinimg.com/originals/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg",
        },
      ],
      is_cod:
        "https://i.pinimg.com/originals/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg",
    },
    {
      channel_name: "Swiggy",
      cost_price: null,
      discount: 0,
      index: 0,
      negative_sum: "₹20.0",
      charges: "₹89.62",
      order_date_timestamp: "26 Dec 2021",
      order_id: "xxxxxxxxxxxxxxxxx",
      pagination_total_rows: 5933,
      present_in_uniware: true,
      principal: null,
      product_tax: "₹20.42",
      product_tax1: "₹298.75",
      recon_status: null,
      sale_order_status: "Delivered",
      subtotal: 804.24,
      total_amount: null,
      total_price: "₹428.79",
      Cells: [
        { channel_name: "Swiggy" },
        { cost_price: null },
        { discount: 0 },
        { index: 0 },
        { negative_sum: 20.0 },
        { charges: 89.62 },
        { order_date_timestamp: "26 Dec 2021" },
        { order_id: "xxxxxxxxxxxxxxxxx" },
        { pagination_total_rows: 5933 },
        { present_in_uniware: true },
        { principal: null },
        { product_tax: 20.42 },
        { product_tax1: 298.75 },
        { recon_status: null },
        { sale_order_status: "Delivered" },
        { subtotal: 804.24 },
        { total_amount: null },
        { total_price: 428.79 },
        {
          is_cod:
            "https://i.pinimg.com/originals/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg",
        },
      ],
      is_cod:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVicQF1uZBZWXLVkXze-VzccneNQN6zZO4IA&usqp=CAU",
    },
    {
      channel_name: "Swiggy",
      cost_price: null,
      discount: 0,
      index: 0,
      negative_sum: "₹20.0",
      charges: "₹89.62",
      order_date_timestamp: "26 Dec 2021",
      order_id: "xxxxxxxxxxxxxxxxx",
      pagination_total_rows: 5933,
      present_in_uniware: true,
      principal: null,
      product_tax: "₹20.42",
      product_tax1: "₹298.75",
      recon_status: null,
      sale_order_status: "Delivered",
      subtotal: 804.24,
      total_amount: null,
      total_price: "₹428.79",
      Cells: [
        { channel_name: "Swiggy" },
        { cost_price: null },
        { discount: 0 },
        { index: 0 },
        { negative_sum: "₹20.0" },
        { charges: 89.62 },
        { order_date_timestamp: "26 Dec 2021" },
        { order_id: "xxxxxxxxxxxxxxxxx" },
        { pagination_total_rows: 5933 },
        { present_in_uniware: true },
        { principal: null },
        { product_tax: 20.42 },
        { product_tax1: 298.75 },
        { recon_status: null },
        { sale_order_status: "Delivered" },
        { subtotal: 804.24 },
        { total_amount: null },
        { total_price: 428.79 },
        {
          is_cod:
            "https://i.pinimg.com/originals/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg",
        },
      ],
      is_cod:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WvdVXQpLExxEBAElxsegwP7o6sg_ChiOK80jah6wyxR100cBVfrJeaHXCB8KzK5n8DY&usqp=CAU",
    },
  ];
  let pageCount1 = 1;

  console.log(jdata, pageCount, "jdata");
  return (
    <div style={{ overflow: "auto", height: "100%" }}>
      {loading ? (
        <Dimmer active inverted>
          <Loader inverted size="large" />
        </Dimmer>
      ) : null}

      <DataTable
        columns={data.columns}
        data={jdata}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount1}
        renderRowSubComponent={renderRowSubComponent}
        onDownload={onDownload}
        pageSize={200}
      />
      {/* <BasicList columns={columns} data={[{"date": "September 14, 2013", "txnStatus": "captured", "gateway": "razorpay", "amount": "15,000", "requestId": ""}]}/> */}
    </div>
  );
};

export default OrderPage;
