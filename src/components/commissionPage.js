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
  Image,
  Popup,
  Dimmer,
  Loader,
} from "semantic-ui-react";
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
  getQueryData,
  getQueryDataWithCallback,
} from "../services/queryDataService";
import { formatCurrency, formatDateString } from "../utils/formatingUtil";
import {
  demoTenants,
  intldemoTenants,
  mygateTestTenants,
  TENANTS,
} from "../utils/constants";

const CommissionPage = (props) => {
  const subDomain = props.subDomain;
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.queryData.filter);
  const [data, setData] = React.useState({ data: [], columns: [] });
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [groupBy, setGroupBy] = useState("");
  const fetchIdRef = React.useRef(0);
  const groupByOptions = [
    {
      key: "",
      text: "None",
      value: "",
    },
    {
      key: "pg_pay_method",
      text: "Payment Method",
      value: "pg_pay_method",
    },
    {
      key: "pg_pay_card_network",
      text: "Card Network",
      value: "pg_pay_card_network",
    },
    {
      key: "pg_pay_bank",
      text: "Bank",
      value: "pg_pay_bank",
    },
    {
      key: "pg_pay_card_type",
      text: "Card Type",
      value: "pg_pay_card_type",
    },
  ];
  const visibleListColumnsDemo = [
    {
      Header: "Is Reconciled",
      accessor: "is_captured",
      style: {
        textAlign: "center",
        borderLeft: "none",
        borderRight: "none",
      },
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
                // <Icon
                //   name="check"
                //   size="tiny"
                //   color="green"
                //   style={{ fontSize: "1em" }}
                // />
                <Image
                  src="images/tick.png"
                  style={{
                    width: "17px",
                    height: "17px",
                    margin: "7px",
                  }}
                  size="mini"
                />
              ) : (
                // <Icon
                //   name="exclamation"
                //   size="tiny"
                //   color="red"
                //   style={{ fontSize: "1em" }}
                // />
                <Image
                  src="images/pending.png"
                  style={{
                    width: "17px",
                    height: "17px",
                    margin: "7px",
                  }}
                  size="mini"
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
      style: { borderLeft: "none", borderRight: "none" },
    },
    {
      Header: "Txn Date",
      accessor: "pg_pay_date",
      style: { borderLeft: "none", borderRight: "none" },
      Cell: (value, data) => {
        return formatDateString(value.value);
      },
    },
    {
      Header: "Transaction Amount",
      accessor: "pg_pay_total_amount",
      style: { borderLeft: "none", borderRight: "none", textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Receipt Amount",
      accessor: "merc_pay_total_amount",
      style: { borderLeft: "none", borderRight: "none", textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Total Revenue (incl tax)",
      accessor: "total_act_mdr_incl_tax",
      style: { borderLeft: "none", borderRight: "none", textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Total tax",
      accessor: "total_act_mdr_tax",
      style: { borderLeft: "none", borderRight: "none", textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "PG Charges (excl tax)",
      accessor: "pg_act_mdr_excl_tax",
      style: { borderLeft: "none", borderRight: "none", textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "PG tax",
      accessor: "pg_act_mdr_tax",
      style: { borderLeft: "none", borderRight: "none", textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Commission (excl tax)",
      accessor: "cust_act_mdr_excl_tax",
      style: { textAlign: "right", borderLeft: "none" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Commission tax",
      accessor: "cust_act_mdr_tax",
      style: { borderLeft: "none", borderRight: "none", textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Payment Method",
      accessor: "pg_pay_method",
      style: { borderLeft: "none", borderRight: "none", textAlign: "right" },
    },
    {
      Header: "Bank",
      accessor: "pg_pay_bank",
      style: { borderLeft: "none", borderRight: "none", textAlign: "right" },
    },
    {
      Header: "Card Type",
      accessor: "pg_pay_card_type",
      style: { borderLeft: "none", borderRight: "none", textAlign: "right" },
    },
    {
      Header: "Card Network",
      accessor: "pg_pay_card_network",
      style: { borderLeft: "none", borderRight: "1px solid #dfe1e6" },
    },
  ];
  const visibleListColumns = [
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
      Header: "Transaction Amount",
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
      Header: "Total Revenue (incl tax)",
      accessor: "total_act_mdr_incl_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Total tax",
      accessor: "total_act_mdr_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "PG Charges (excl tax)",
      accessor: "pg_act_mdr_excl_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "PG tax",
      accessor: "pg_act_mdr_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Commission (excl tax)",
      accessor: "cust_act_mdr_excl_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Commission tax",
      accessor: "cust_act_mdr_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Payment Method",
      accessor: "pg_pay_method",
    },
    {
      Header: "Bank",
      accessor: "pg_pay_bank",
    },
    {
      Header: "Card Type",
      accessor: "pg_pay_card_type",
    },
    {
      Header: "Card Network",
      accessor: "pg_pay_card_network",
    },
  ];

  const visibleGroupByColumnsDemo = [
    {
      Header: "Transaction Amount",
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
      Header: "Total Revenue (incl tax)",
      accessor: "total_act_mdr_incl_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Total tax",
      accessor: "total_act_mdr_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "PG Charges (excl tax)",
      accessor: "pg_act_mdr_excl_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "PG tax",
      accessor: "pg_act_mdr_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Commission (excl tax)",
      accessor: "cust_act_mdr_excl_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Commission tax",
      accessor: "cust_act_mdr_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
  ];
  const visibleGroupByColumns = [
    {
      Header: "Transaction Amount",
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
      Header: "Total Revenue (incl tax)",
      accessor: "total_act_mdr_incl_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Total tax",
      accessor: "total_act_mdr_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "PG Charges (excl tax)",
      accessor: "pg_act_mdr_excl_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "PG tax",
      accessor: "pg_act_mdr_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Commission (excl tax)",
      accessor: "cust_act_mdr_excl_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Commission tax",
      accessor: "cust_act_mdr_tax",
      style: { textAlign: "right" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
  ];

  const onDownload = () => {
    setLoading(true);
    let filterBody = { ...filter };
    delete filterBody.whereClause;
    let body = {
      fields:
        groupBy +
        ", SUM(pg_pay_total_amount) AS pg_pay_total_amount,SUM(merc_pay_total_amount) AS merc_pay_total_amount,SUM(total_act_mdr_incl_tax) AS total_act_mdr_incl_tax,SUM((total_act_mdr_incl_tax/1.18)*0.18) AS total_act_mdr_tax,SUM(pg_act_mdr_excl_tax) AS pg_act_mdr_excl_tax,SUM(pg_act_mdr_tax) AS pg_act_mdr_tax,SUM(cust_act_mdr_excl_tax) AS cust_act_mdr_excl_tax,SUM(cust_act_mdr_tax) AS cust_act_mdr_tax",
      filter: filterBody,
      groupBy: groupBy,
      whereClause: Object.values(filter.whereClause).join(" "),
    };
    console.log(body, "body");
    getDataListDownload(
      groupBy ? true : false,
      body,
      (url) => {
        setLoading(false);
        window.open(url, "_blank");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  const onGroupByChange = (e, d) => {
    setGroupBy(d.value);
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
      if (groupBy) {
        getQueryDataWithCallback(
          {
            fields:
              groupBy +
              ", SUM(pg_pay_total_amount) AS pg_pay_total_amount,SUM(merc_pay_total_amount) AS merc_pay_total_amount,SUM(total_act_mdr_incl_tax) AS total_act_mdr_incl_tax,SUM((total_act_mdr_incl_tax/1.18)*0.18) AS total_act_mdr_tax,SUM(pg_act_mdr_excl_tax) AS pg_act_mdr_excl_tax,SUM(pg_act_mdr_tax) AS pg_act_mdr_tax,SUM(cust_act_mdr_excl_tax) AS cust_act_mdr_excl_tax,SUM(cust_act_mdr_tax) AS cust_act_mdr_tax",
            filter: filterBody,
            pageNumber: pageIndex,
            limit: pageSize,
            groupBy: groupBy,
            whereClause: Object.values(filter.whereClause).join(" "),
          },
          (json) => {
            //let resultJson = {};
            //resultJson['transactionsList'] = json
            if (fetchId === fetchIdRef.current) {
              let columns = visibleGroupByColumns;
              columns.unshift({
                Header: "",
                accessor: groupBy,
              });
              setData({ data: json.data, columns: columns });
              // setPageCount(1);
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
      } else {
        getDataListData(
          { filter: filterBody, pageNumber: pageIndex, limit: pageSize },
          (json) => {
            //let resultJson = {};
            //resultJson['transactionsList'] = json
            if (fetchId === fetchIdRef.current) {
              let columns =
                demoTenants.includes(TENANTS(subDomain)) ||
                mygateTestTenants.includes(TENANTS(subDomain)) ||
                intldemoTenants.includes(TENANTS(subDomain))
                  ? visibleListColumnsDemo
                  : visibleListColumns;
              columns.unshift({
                // Make an expander cell
                Header: () => null, // No header
                id: "expander", // It needs an ID
                style: {
                  borderLeft: `${
                    demoTenants.includes(TENANTS(subDomain)) ||
                    mygateTestTenants.includes(TENANTS(subDomain)) ||
                    intldemoTenants.includes(TENANTS(subDomain))
                      ? `1px solid #dfe1e6`
                      : ``
                  }`,
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
              // setPageCount(1);
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
      }
    },
    [filter, groupBy]
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
          <Loader inverted />
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
        groupByOptions={groupByOptions}
        onGroupByChange={onGroupByChange}
        subDomain={subDomain}
      />
      {/* <BasicList columns={columns} data={[{"date": "September 14, 2013", "txnStatus": "captured", "gateway": "razorpay", "amount": "15,000", "requestId": ""}]}/> */}
    </div>
  );
};

export default CommissionPage;
