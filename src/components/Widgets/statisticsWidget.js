import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dimmer, Loader, Segment, Statistic } from "semantic-ui-react";
import {
  getQueryDataAction,
  setFilterAction,
} from "../../actions/queryDataActions";
import { getQueryConfig } from "../../container/ApplicationsCache";
import {
  formatCurrencyCompact,
  formatCurrencyEN,
  formatNumber,
  formatNumberEN,
  formatCurrency,
} from "../../utils/formatingUtil";
import {
  demoTenants,
  indifiTenants,
  intldemoTenants,
  LABEL_TRANSLATIONS,
  mosaicTenants,
  mygateTenants,
  rotaryTenants,
  kiviTenants,
  treeboTenants,
  TENANTS,
  TENANT_IDs,
  mosaicTestTenants,
  mygateTestTenants,
} from "../../utils/constants";
import { appNavigateAction } from "../../actions/appActions";

const StatisticsWidget = (props) => {
  const { isMygate = false, subDomain } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseData = useSelector(
    (state) => state.queryData.response[props.dataId]
  );
  const filter = useSelector((state) => state.queryData.filter);
  const text_search = filter.text_search;
  const startDate = filter.startDate.toISOString();
  const endDate = filter.endDate.toISOString();
  // const formatFunction = props.format === "currency" ? formatCurrency : formatNumber;

  const formatFunction =
    (mosaicTenants.includes(TENANTS(subDomain)) ||
      mosaicTestTenants.includes(TENANTS(subDomain))) &&
    props.format === "currency"
      ? formatCurrency
      : props.format === "currency" &&
        mygateTenants.includes(TENANTS(subDomain))
      ? formatCurrencyCompact
      : props.format === "currency" &&
        (demoTenants.includes(TENANTS(subDomain)) ||
          mygateTestTenants.includes(TENANTS(subDomain)) ||
          rotaryTenants.includes(TENANTS(subDomain)) ||
          treeboTenants.includes(TENANTS(subDomain)) ||
          kiviTenants.includes(TENANTS(subDomain)))
      ? formatCurrencyCompact
      : props.format === "currency" &&
        intldemoTenants.includes(TENANTS(subDomain))
      ? formatCurrencyEN
      : // : props.format === "currencyEN" &&
      //   demoTenants.includes(TENANTS(subDomain))
      // ? formatNumberEN
      props.format === "currency" && indifiTenants.includes(TENANTS(subDomain))
      ? formatCurrencyCompact
      : props.format === "currency"
      ? formatCurrency
      : formatNumber;

  // useEffect(() => {
  //     setIsLoading(false);
  // }, [responseData])
  useEffect(() => {
    if (!responseData) {
      const config = getQueryConfig(props.dataId);
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      if (mosaicTestTenants.includes(TENANTS(subDomain))) {
        dispatch(
          getQueryDataAction(props.dataId, {
            ...config,
            filter: effective_filter,
            whereClause:
              (config.whereClause || "") +
              " " +
              Object.values(
                { value: filter.whereClause.is_channel } || {}
              ).join(" "),
          })
        );
      } else {
        dispatch(
          getQueryDataAction(props.dataId, {
            ...config,
            filter: effective_filter,
          })
        );
      }
    }
  }, [filter]);

  const onWidgetClick = () => {
    let localFilter = {};

    if (props.dataId === "countByFoundInCreadit") {
      localFilter = {
        whereClause: {
          is_found_in_Credit: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
        },
      };
    } else if (props.dataId === "countByNotFoundInCreadit") {
      localFilter = {
        whereClause: {
          is_found_in_Credit: "AND lower(cr_dr) = 'cr' and flag_found = FALSE",
        },
      };
    } else if (props.dataId === "countByFoundInDebit") {
      localFilter = {
        whereClause: {
          is_found_in_Debit:
            "and lower(cr_dr) = 'cr' and flag_found = TRUE and found_in_debit = TRUE",
          is_found_in_Credit: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
        },
      };
    } else if (props.dataId === "countByNotFoundInDebit") {
      localFilter = {
        whereClause: {
          is_found_in_Debit:
            "and lower(cr_dr) = 'cr' and flag_found = TRUE and found_in_debit = FALSE",
          is_found_in_Credit: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
        },
      };
    } else if (props.dataId === "countByReconciled") {
      localFilter = {
        whereClause: {
          is_reconciled:
            "and abs(amount_credit - amount_debit) < 0.01 and flag_found = TRUE and found_in_debit = TRUE",
          is_found_in_Credit: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
        },
      };
    } else if (props.dataId === "countByNotReconciled") {
      localFilter = {
        whereClause: {
          is_reconciled:
            "and abs(amount_credit - amount_debit) > 0.01 and flag_found = TRUE and found_in_debit = TRUE",
          is_found_in_Credit: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
        },
      };
    } else if (props.dataId === "countBySettledWithinTwoDays") {
      localFilter = {
        whereClause: {
          settlement_aging:
            "and abs(amount_credit - amount_debit) > 0.01 and flag_found = TRUE and found_in_debit = TRUE and settlement_duration <= 2",
          is_found_in_Credit: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
        },
      };
    } else if (props.dataId === "countBySettledAfterTwoDays") {
      localFilter = {
        whereClause: {
          settlement_aging:
            "and abs(amount_credit - amount_debit) > 0.01 and flag_found = TRUE and found_in_debit = TRUE and settlement_duration > 2",
          is_found_in_Credit: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
        },
      };
    } else if (props.dataId === "countByAllOrders") {
      localFilter = {
        whereClause: {
          present_in_uniware:
            "AND (present_in_uniware=true OR present_in_channel_amazon=false OR present_in_uniware=false)",
        },
      };
    } else if (props.dataId === "countByUniwareNbdChannel") {
      localFilter = {
        whereClause: {
          present_in_uniware: "AND present_in_uniware = true",
        },
      };
    } else if (props.dataId === "countByChannelOnly") {
      localFilter = {
        whereClause: {
          present_in_uniware: "AND present_in_uniware = false",
        },
      };
    } else if (props.dataId === "countByUniwareOnly") {
      localFilter = {
        whereClause: {
          present_in_uniware:
            "AND (present_in_uniware = true AND present_in_channel_amazon = false)",
        },
      };
    } else if (props.dataId === "mosaicTestCountByAllOrders") {
      localFilter = {
        whereClause: {
          is_Order_Mosaic: " ",
        },
      };
    } else if (props.dataId === "mosaicTestCountByUniwareNbdChannel") {
      localFilter = {
        whereClause: {
          is_Order_Mosaic:
            "AND present_in_uniware = true and channel is not null",
        },
      };
    } else if (props.dataId === "mosaicTestCountByChannelOnly") {
      localFilter = {
        whereClause: {
          is_Order_Mosaic:
            "AND present_in_uniware = false and channel is not null",
        },
      };
    } else if (props.dataId === "mosaicTestCountByUniwareOnly") {
      localFilter = {
        whereClause: {
          is_Order_Mosaic: "AND present_in_uniware = true and channel is null",
        },
      };
    } else if (props.dataId === "countByCapturedStatus") {
      localFilter = {
        is_captured: "true",
        is_receipt_generated: "all",
        is_settled: "all",
        is_paid_out: "all",
      };
    } else if (props.dataId === "countByReceiptStatus") {
      localFilter = {
        is_captured: "true",
        is_receipt_generated: "true",
        is_settled: "all",
        is_paid_out: "all",
      };
    } else if (props.dataId === "countBySettlementStatus") {
      localFilter = {
        is_captured: "true",
        is_receipt_generated: "true",
        is_settled: "true",
        is_paid_out: "all",
      };
    } else if (props.dataId === "countByPaidoutStatus") {
      localFilter = {
        is_captured: "true",
        is_receipt_generated: "true",
        is_settled: "true",
        is_paid_out: "true",
      };
    } else if (props.dataId === "countByNotCapturedStatus") {
      localFilter = {
        is_captured: "false",
        is_receipt_generated: "all",
        is_settled: "all",
        is_paid_out: "all",
      };
    } else if (props.dataId === "countByNotReceiptStatus") {
      localFilter = {
        is_captured: "true",
        is_receipt_generated: "false",
        is_settled: "all",
        is_paid_out: "all",
      };
    } else if (props.dataId === "countByNotSettlementStatus") {
      localFilter = {
        is_captured: "true",
        is_receipt_generated: "true",
        is_settled: "false",
        is_paid_out: "all",
      };
    } else if (props.dataId === "countByNotPaidoutStatus") {
      localFilter = {
        is_captured: "true",
        is_receipt_generated: "true",
        is_settled: "true",
        is_paid_out: "false",
      };
    } else if (props.dataId === "BankitCountByCapturedStatus") {
      localFilter = {
        pg_pay_captured: true,
        whereClause: { pg_in_ac_statement: " ", pg_is_reconciled: " " },
      };
    } else if (props.dataId === "BankitCountByNotCapturedStatus") {
      localFilter = {
        pg_pay_captured: false,
        whereClause: { pg_in_ac_statement: " ", pg_is_reconciled: " " },
      };
    } else if (props.dataId === "BankitCountByInACStatement") {
      localFilter = {
        whereClause: {
          pg_in_ac_statement:
            "AND (pg_pay_api_status IS NOT null OR pg_pay_agent_status IS NOT null)",
          pg_is_reconciled: " ",
        },
        pg_pay_captured: true,
      };
    } else if (props.dataId === "BankitCountByNotInACStatement") {
      localFilter = {
        whereClause: {
          pg_in_ac_statement:
            "AND (pg_pay_api_status IS  null AND pg_pay_agent_status IS null)",
          pg_is_reconciled: " ",
        },
        pg_pay_captured: true,
      };
    } else if (props.dataId === "BankitCountByReconciled") {
      localFilter = {
        whereClause: {
          pg_is_reconciled:
            "AND ((LOWER(pg_pay_api_status) = LOWER(pg_pay_status_2) OR LOWER(pg_pay_agent_status) = LOWER(pg_pay_status_2)) AND pg_pay_status_2 IS NOT null)",
          pg_in_ac_statement:
            "AND (pg_pay_api_status IS NOT null OR pg_pay_agent_status IS NOT null)",
        },
        pg_pay_captured: true,
      };
    } else if (props.dataId === "BankitCountByNotReconciled") {
      localFilter = {
        whereClause: {
          pg_is_reconciled: `AND ((pg_pay_agent_status is not null) or (pg_pay_api_status is not null)) and pg_pay_rr_no_2 not in (SELECT pg_pay_rr_no_2 FROM \`kosh-ai.kosh_dataset_${TENANTS(
            window.location.hostname.split(".")[0]
          ).replace(
            "-",
            ""
          )}.master_recon\` where (lower(pg_pay_status_2) = lower(pg_pay_agent_status) or lower(pg_pay_status_2) = lower(pg_pay_api_status)))`,
          pg_in_ac_statement:
            "AND (pg_pay_api_status IS NOT null OR pg_pay_agent_status IS NOT null)",
        },
        pg_pay_captured: true,
      };
    } else if (props.dataId === "RotaryCapturedPayments") {
      localFilter = {
        whereClause: {
          rotary_payment_status: "AND payment_status = 'captured'",
        },
      };
    } else if (props.dataId === "RotarySettledPayments") {
      localFilter = {
        whereClause: {
          rotary_is_settled: "AND is_settled = true",
          rotary_payment_status: "AND payment_status = 'captured'",
        },
      };
    } else if (props.dataId === "RotaryFailedPayments") {
      localFilter = {
        whereClause: {
          rotary_payment_status: "AND payment_status = 'failed'",
        },
      };
    } else if (props.dataId === "RotaryNotSettledPayments") {
      localFilter = {
        whereClause: {
          rotary_payment_status: "AND payment_status = 'captured'",
          rotary_is_settled: "AND is_settled = false",
        },
      };
    } else if (props.dataId === "TreeboTransactionsByRazorpay") {
      localFilter = {
        whereClause: {
          Treebo_Txn_Status:
            "AND transaction_type_flag = 'razorpay_transaction' AND third_party_booking_id is not null",
        },
      };
    } else if (props.dataId === "TreeboInRazorPayData") {
      localFilter = {
        whereClause: {
          Treebo_Txn_Status:
            "AND transaction_type_flag = 'razorpay_transaction' AND third_party_booking_id is not null",
          Treebo_Statement_Status:
            "AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
        },
      };
    } else if (props.dataId === "TreeboReconciled") {
      localFilter = {
        whereClause: {
          Treebo_Txn_Status:
            "AND transaction_type_flag = 'razorpay_transaction' AND third_party_booking_id is not null",
          Treebo_Statement_Status:
            "AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
          Treebo_Reconcile_Status:
            "AND is_reconciled IS true AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
        },
      };
    } else if (props.dataId === "TreeboTransactionsByOther") {
      localFilter = {
        whereClause: {
          Treebo_Txn_Status:
            "AND transaction_type_flag = 'other_transaction' AND third_party_booking_id is not null",
        },
      };
    } else if (props.dataId === "TreeboNotInRazorPayData") {
      localFilter = {
        whereClause: {
          Treebo_Txn_Status:
            "AND transaction_type_flag = 'razorpay_transaction' AND third_party_booking_id is not null",
          Treebo_Statement_Status:
            "AND in_razorpay_data IS false AND transaction_type_flag = 'razorpay_transaction'",
        },
      };
    } else if (props.dataId === "TreeboNotReconciled") {
      localFilter = {
        whereClause: {
          Treebo_Txn_Status:
            "AND transaction_type_flag = 'razorpay_transaction' AND third_party_booking_id is not null",
          Treebo_Statement_Status:
            "AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
          Treebo_Reconcile_Status:
            "AND is_reconciled IS false AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
        },
      };
    }
    // if (!mygateTenants.includes(TENANTS(subDomain))) {
    //   delete localFilter.is_receipt_generated;
    //   delete localFilter.is_paid_out;
    // }
    if (mosaicTestTenants.includes(TENANTS(subDomain))) {
      dispatch(
        setFilterAction(
          Object.assign({}, filter, localFilter, {
            whereClause: { ...filter.whereClause, ...localFilter.whereClause },
          })
        )
      );
    } else {
      dispatch(setFilterAction(Object.assign({}, filter, localFilter)));
    }

    dispatch(appNavigateAction(props.navigateTo));
    navigate(props.navigateTo);
  };
  return (
    <Segment
      style={{
        minHeight: "100px",
        cursor: "pointer",
        ...props.style,
      }}
      color={props.color}
      onClick={onWidgetClick}
    >
      {!responseData ? (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      ) : (
        <Statistic.Group
          size="small"
          horizontal={props.horizontal}
          widths={
            responseData.schema.fields.length > 1
              ? responseData.schema.fields.length - 1
              : 1
          }
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          {responseData.schema.fields.map((field, i) => {
            if (field.name === "index") return null;
            return (
              <Statistic
                key={i}
                style={{
                  display: "flex",
                  alignItems: `${
                    mosaicTenants.includes(TENANTS(subDomain)) ||
                    mosaicTestTenants.includes(TENANTS(subDomain))
                      ? "flexStart"
                      : "center"
                  }`,
                }}
                className={`${props.className}` || ""}
                label={LABEL_TRANSLATIONS(field.name)}
                value={formatFunction(responseData.data[0][field.name])}
              />
            );
          })}
        </Statistic.Group>
      )}
    </Segment>
  );
};
export const BankitStatisticsWidget = (props) => {
  const { isMygate = false, subDomain } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const capturedResponseData = useSelector(
    (state) => state.queryData.response["SumCapturedAmountTotalBankit"]
  );
  const reconciledResponseData = useSelector(
    (state) => state.queryData.response["SumReconciledAmountTotalBankit"]
  );
  const notReconciledResponseData = useSelector(
    (state) => state.queryData.response["SumNotReconciledAmountTotalBankit"]
  );
  const filter = useSelector((state) => state.queryData.filter);
  const text_search = filter.text_search;
  const startDate = filter.startDate.toISOString();
  const endDate = filter.endDate.toISOString();
  const formatFunction =
    props.format === "currency" ? formatCurrency : formatNumber;
  // useEffect(() => {
  //     setIsLoading(false);
  // }, [responseData])
  useEffect(() => {
    if (!capturedResponseData) {
      const config = getQueryConfig("SumCapturedAmountTotalBankit");
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction("SumCapturedAmountTotalBankit", {
          ...config,
          filter: effective_filter,
        })
      );
    }
    if (!reconciledResponseData) {
      const config = getQueryConfig("SumReconciledAmountTotalBankit");
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction("SumReconciledAmountTotalBankit", {
          ...config,
          filter: effective_filter,
        })
      );
    }
    if (!notReconciledResponseData) {
      const config = getQueryConfig("SumNotReconciledAmountTotalBankit");
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction("SumNotReconciledAmountTotalBankit", {
          ...config,
          filter: effective_filter,
        })
      );
    }
  }, [filter]);

  const onWidgetClick = () => {
    dispatch(appNavigateAction(props.navigateTo));
    navigate(props.navigateTo);
  };
  return (
    <Segment
      style={{ minHeight: "100px", cursor: "pointer" }}
      color={props.color}
      onClick={onWidgetClick}
    >
      {!capturedResponseData ? (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      ) : (
        <Statistic.Group
          size="small"
          horizontal={props.horizontal}
          widths={
            capturedResponseData.schema.fields.length > 1
              ? capturedResponseData.schema.fields.length - 1
              : 1
          }
        >
          {capturedResponseData.schema.fields.map((field) => {
            if (field.name === "index") return null;
            return (
              <Statistic
                size="small"
                label={LABEL_TRANSLATIONS(field.name)}
                value={formatFunction(capturedResponseData.data[0][field.name])}
              />
            );
          })}
        </Statistic.Group>
      )}
      {!reconciledResponseData ? (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      ) : (
        <Statistic.Group
          size="small"
          horizontal={props.horizontal}
          widths={
            reconciledResponseData.schema.fields.length > 1
              ? reconciledResponseData.schema.fields.length - 1
              : 1
          }
        >
          {reconciledResponseData.schema.fields.map((field) => {
            if (field.name === "index") return null;
            return (
              <Statistic
                label={LABEL_TRANSLATIONS(field.name)}
                value={formatFunction(
                  reconciledResponseData.data[0][field.name]
                )}
              />
            );
          })}
        </Statistic.Group>
      )}
      {!notReconciledResponseData ? (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      ) : (
        <Statistic.Group
          size="small"
          horizontal={props.horizontal}
          widths={
            notReconciledResponseData.schema.fields.length > 1
              ? notReconciledResponseData.schema.fields.length - 1
              : 1
          }
        >
          {notReconciledResponseData.schema.fields.map((field) => {
            if (field.name === "index") return null;
            return (
              <Statistic
                label={LABEL_TRANSLATIONS(field.name)}
                value={formatFunction(
                  notReconciledResponseData.data[0][field.name]
                )}
              />
            );
          })}
        </Statistic.Group>
      )}
    </Segment>
  );
};
export default StatisticsWidget;
