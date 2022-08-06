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
  demoTenants,
  intldemoTenants,
  kiviTenants,
  mygateTestTenants,
  rotaryTenants,
  TENANTS,
  TENANT_IDs,
  treeboTenants,
} from "../utils/constants";
import { useAuthState } from "react-firebase-hooks/auth";

const ReconciliationPage = ({ subDomain }) => {
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

  const visibleColumnsDemo = [
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
                <Image
                  src="images/pending.png"
                  style={{
                    width: "17px",
                    height: "17px",
                    margin: "7px",
                  }}
                  size="mini"
                />
                // <Icon
                //   name="exclamation"
                //   size="tiny"
                //   color="red"
                //   style={{ fontSize: "1em" }}
                // />
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
      Header: "Settlement Date",
      accessor: "pg_setl_date",
      style: { borderLeft: "none", borderRight: "none" },
      Cell: (value, data) => {
        return formatDateString(value.value);
      },
    },
    {
      Header: "Payout Date",
      accessor: "pg_pout_process_date",
      style: { borderLeft: "none", borderRight: "none" },
      Cell: (value, data) => {
        return formatDateString(value.value);
      },
    },
    {
      Header: "Amount",
      accessor: "pg_pay_total_amount",
      style: { textAlign: "right", borderLeft: "none" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Receipt Amount",
      accessor: "merc_pay_total_amount",
      style: { textAlign: "right", borderLeft: "none" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Payout Amount",
      accessor: "pg_pout_total_amount",
      style: { textAlign: "right", borderLeft: "none" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Txn Status",
      accessor: "pg_pay_status",
      style: { borderLeft: "none", borderRight: "none" },
    },
    {
      Header: "Txn Type",
      accessor: "merc_pout_type",
      style: { borderLeft: "none", borderRight: "none" },
    },
    {
      Header: "Payout Status",
      accessor: "merc_pout_status",
      style: { borderLeft: "none", borderRight: "none" },
    },
    {
      Header: "Receipt",
      accessor: "merc_pay_receipt_no",
      style: { borderLeft: "none", borderRight: "1px solid #dfe1e6" },
    },
  ];

  const visibleColumnsIntlDemo = [
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
                <Image
                  src="images/pending.png"
                  style={{
                    width: "17px",
                    height: "17px",
                    margin: "7px",
                  }}
                  size="mini"
                />
                // <Icon
                //   name="exclamation"
                //   size="tiny"
                //   color="red"
                //   style={{ fontSize: "1em" }}
                // />
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
      Header: "Settlement Date",
      accessor: "pg_setl_date",
      style: { borderLeft: "none", borderRight: "none" },
      Cell: (value, data) => {
        return formatDateString(value.value);
      },
    },
    {
      Header: "Payout Date",
      accessor: "pg_pout_process_date",
      style: { borderLeft: "none", borderRight: "none" },
      Cell: (value, data) => {
        return formatDateString(value.value);
      },
    },
    {
      Header: "Amount",
      accessor: "pg_pay_total_amount",
      style: { textAlign: "right", borderLeft: "none" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Receipt Amount",
      accessor: "merc_pay_total_amount",
      style: { textAlign: "right", borderLeft: "none" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Payout Amount",
      accessor: "pg_pout_total_amount",
      style: { textAlign: "right", borderLeft: "none" },
      Cell: (value, data) => {
        return formatCurrency(value.value);
      },
    },
    {
      Header: "Txn Status",
      accessor: "pg_pay_status",
      style: { borderLeft: "none", borderRight: "none" },
    },
    {
      Header: "Txn Type",
      accessor: "merc_pout_type",
      style: { borderLeft: "none", borderRight: "none" },
    },
    {
      Header: "Payout Status",
      accessor: "merc_pout_status",
      style: { borderLeft: "none", borderRight: "none" },
    },
    {
      Header: "Receipt",
      accessor: "merc_pay_receipt_no",
      style: { borderLeft: "none", borderRight: "1px solid #dfe1e6" },
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
      style: { width: "170px" },
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

  const visibleColumnsTreebo = [
    {
      Header: "Is Reconciled",
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
              value?.cell?.row?.original?.ReconciliationStatus ? (
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
          ></Popup>
        );
      },
    },
    {
      Header: "Booking Id",
      accessor: "BookingId",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Third Party Booking Id",
      accessor: "ThirdPartyBookingId",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Total Amount",
      accessor: "TotalAmount",
      Cell: (value, data) =>
        formatCurrency(
          value.cell.row.original.TotalAmount !== null
            ? value.cell.row.original.TotalAmount
            : 0
        ),
    },
    {
      Header: "Treebo Amount",
      accessor: "TreeboAmount",
      Cell: (value, data) =>
        formatCurrency(
          value.cell.row.original.TreeboAmount !== null
            ? value.cell.row.original.TreeboAmount
            : 0
        ),
    },
    {
      Header: "Settlement Date",
      accessor: "SettlementDate",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Settlement Period",
      accessor: "SettlementPeriod",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Settlement Status",
      accessor: "SettlementStatus",
      Cell: (value, data) => {
        if (value.value !== null && value.value === 1) {
          return "Settled";
        } else {
          return "Not Settled";
        }
      },
    },
    {
      Header: "Reconciled Status",
      accessor: "ReconciliationStatus",
      Cell: (value, data) => {
        if (value.value !== null && value.value) {
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
  ];

  const visibleColumnsRotary = [
    {
      Header: "Is Reconciled",
      accessor: "ReconciliationStatus",
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
              value.value ? (
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
          ></Popup>
        );
      },
    },
    {
      Header: "Txn ID",
      accessor: "TxnId",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Txn Date",
      accessor: "TxnDate",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Txn Amount",
      accessor: "Amount",
      Cell: (value, data) =>
        formatCurrency(value.value !== null ? value.value : 0),
    },
    {
      Header: "Settled Amount ",
      accessor: "credit",
      Cell: (value, data) =>
        formatCurrency(value.value !== null ? value.value : 0),
    },
    {
      Header: "PG Charges excl Taxes",
      accessor: "fee_exclusive_tax",
      Cell: (value, data) =>
        formatCurrency(value.value !== null ? value.value : 0),
    },
    {
      Header: "Taxes on PG Charges",
      accessor: "tax",
      Cell: (value, data) =>
        formatCurrency(value.value !== null ? value.value : 0),
    },
    {
      Header: "Settlement Date",
      accessor: "SettlementDate",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Settlement Status",
      accessor: "SettlementStatus",
      Cell: (value, data) => {
        if (value.value && value.value !== null) {
          return "Settled";
        } else {
          return "Not Settled";
        }
      },
    },
    {
      Header: "Settlement Period",
      accessor: "SettlementPeriod",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Reconciled Status",
      // accessor: "ReconciliationStatus",
      Cell: (value, data) => {
        return (
          <div style={{ display: "flex" }}>
            {value?.row?.original?.TxnStatus === "captured" ? (
              <>
                <Icon name="check circle" color="green" /> {"Captured"} &nbsp;
              </>
            ) : (
              <>
                <Icon name="times circle" color="red" /> {"Captured"} &nbsp;
              </>
            )}{" "}
            | &nbsp;
            <>
              {value?.row?.values?.SettlementStatus ? (
                <>
                  <Icon name="check circle" color="green" /> {"Settled"} &nbsp;
                </>
              ) : (
                <>
                  <Icon name="times circle" color="red" /> {"Settled"} &nbsp;
                </>
              )}
            </>
          </div>
        );
      },
    },
  ];

  const visibleColumnsKivi = [
    {
      Header: "Is Reconciled",
      accessor: "ReconciliationStatus",
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
              value.value ? (
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
          ></Popup>
        );
      },
    },
    {
      Header: "Txn ID",
      accessor: "TxnId",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Txn Date",
      accessor: "TxnDate",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Txn Amount",
      accessor: "Amount",
      Cell: (value, data) =>
        formatCurrency(value.value !== null ? value.value : 0),
    },
    {
      Header: "Settled Amount ",
      accessor: "credit",
      Cell: (value, data) =>
        formatCurrency(value.value !== null ? value.value : 0),
    },
    {
      Header: "PG Charges excl Taxes",
      accessor: "fee_exclusive_tax",
      Cell: (value, data) =>
        formatCurrency(value.value !== null ? value.value : 0),
    },
    {
      Header: "Taxes on PG Charges",
      accessor: "tax",
      Cell: (value, data) =>
        formatCurrency(value.value !== null ? value.value : 0),
    },
    {
      Header: "Settlement Date",
      accessor: "SettlementDate",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Settlement Status",
      accessor: "SettlementStatus",
      Cell: (value, data) => {
        if (value.value && value.value !== null) {
          return "Settled";
        } else {
          return "Not Settled";
        }
      },
    },
    {
      Header: "Settlement Period",
      accessor: "SettlementPeriod",
      Cell: (value, data) => {
        return value.value;
      },
    },
    {
      Header: "Reconciled Status",
      // accessor: "ReconciliationStatus",
      Cell: (value, data) => {
        return (
          <div style={{ display: "flex" }}>
            {value?.row?.original?.TxnStatus === "captured" ? (
              <>
                <Icon name="check circle" color="green" /> {"Captured"} &nbsp;
              </>
            ) : (
              <>
                <Icon name="times circle" color="red" /> {"Captured"} &nbsp;
              </>
            )}{" "}
            | &nbsp;
            <>
              {value?.row?.values?.SettlementStatus ? (
                <>
                  <Icon name="check circle" color="green" /> {"Settled"} &nbsp;
                </>
              ) : (
                <>
                  <Icon name="times circle" color="red" /> {"Settled"} &nbsp;
                </>
              )}
            </>
          </div>
        );
      },
    },
  ];

  const columnMap = {
    //attention
    default: visibleColumns,
    [TENANT_IDs.bankittest]: visibleColumnsBankit,
    [TENANT_IDs.demo]: visibleColumnsDemo,
    [TENANT_IDs.mygatetest]: visibleColumnsDemo,
    [TENANT_IDs.mygatetest2]: visibleColumnsDemo,
    [TENANT_IDs.intldemo]: visibleColumnsIntlDemo,
    [TENANT_IDs.bankit]: visibleColumnsBankit,
    [TENANT_IDs.treebotest]: visibleColumnsTreebo,
    [TENANT_IDs.treebo]: visibleColumnsTreebo,
    [TENANT_IDs.kivitest]: visibleColumnsKivi,
    [TENANT_IDs.rotarytest]: visibleColumnsRotary,
    [TENANT_IDs.rotary]: visibleColumnsRotary,
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
    if (bankitTenants.includes(TENANTS(subDomain))) {
      config = getQueryConfig("bankitReconciliation");
    } else if (treeboTenants.includes(TENANTS(subDomain))) {
      config = getQueryConfig("TreeboReconciliation");
    } else if (rotaryTenants.includes(TENANTS(subDomain))) {
      config = getQueryConfig("RotaryReconciliationForReport");
    } else if (kiviTenants.includes(TENANTS(subDomain))) {
      config = getQueryConfig("KiviReconciliation");
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
      if (bankitTenants.includes(TENANTS(subDomain))) {
        config = getQueryConfig("bankitReconciliation");
      } else if (treeboTenants.includes(TENANTS(subDomain))) {
        config = getQueryConfig("TreeboReconciliation");
      } else if (rotaryTenants.includes(TENANTS(subDomain))) {
        config = getQueryConfig("RotaryReconciliation");
      } else if (kiviTenants.includes(TENANTS(subDomain))) {
        config = getQueryConfig("KiviReconciliation");
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
            columns.unshift({
              // Make an expander cell
              Header: () => null, // No header
              id: "expander", // It needs an ID
              style: {
                borderLeft: `${
                  demoTenants.includes(TENANTS(subDomain)) ||
                  mygateTestTenants.includes(TENANTS(subDomain)) ||
                  intldemoTenants.includes(TENANTS(subDomain)) ||
                  rotaryTenants.includes(TENANTS(subDomain)) ||
                  treeboTenants.includes(TENANTS(subDomain)) ||
                  kiviTenants.includes(TENANTS(subDomain))
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
