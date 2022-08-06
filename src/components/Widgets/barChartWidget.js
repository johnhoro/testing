import React, { PureComponent, useEffect, useState } from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dimmer, Label, Loader, Segment, Statistic } from "semantic-ui-react";
import {
  getQueryDataAction,
  setFilterAction,
} from "../../actions/queryDataActions";
import { getQueryConfig } from "../../container/ApplicationsCache";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
} from "recharts";
import { formatCurrency, formatNumber } from "../../utils/formatingUtil";

const BarChartWidget = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseData = useSelector(
    (state) => state.queryData.response[props.dataId]
  );
  const filter = useSelector((state) => state.queryData.filter);
  const text_search = filter.text_search;
  const startDate = filter.startDate.toISOString();
  const endDate = filter.endDate.toISOString();
  const formatFunction =
    props.format === "currency" ? formatCurrency : formatNumber;
  let emptyData = { Margin: 0 };
  emptyData[props.xAxisKey] = "0";

  let newArray = responseData?.data?.sort((a, b) =>
    a.pg_pay_method?.toLowerCase() < b.pg_pay_method?.toLowerCase()
      ? -1
      : b?.pg_pay_method?.toLowerCase() > a?.pg_pay_method?.toLowerCase()
      ? 1
      : 0
  );

  let newArray1 = responseData?.data?.sort((a, b) =>
    a.pg_pay_card_network?.toLowerCase() < b.pg_pay_card_network?.toLowerCase()
      ? -1
      : b.pg_pay_card_network?.toLowerCase() >
        a.pg_pay_card_network?.toLowerCase()
      ? 1
      : 0
  );

  let capital = responseData?.data?.map(function (elm) {
    if (elm && elm.pg_pay_method) {
      elm.pg_pay_method =
        elm.pg_pay_method?.charAt(0)?.toUpperCase() +
        elm.pg_pay_method?.slice(1);
    } else {
      elm.pg_pay_card_network = elm.pg_pay_card_network;
    }
    return elm;
  });

  useEffect(() => {
    if (!responseData) {
      const config = getQueryConfig(props.dataId);
      const filter = { ...config.filter, startDate, endDate, text_search };
      dispatch(
        getQueryDataAction(props.dataId, {
          fields: config.fields,
          filter: filter,
          groupBy: config.groupBy,
        })
      );
    }
  }, [filter]);

  const onWidgetClick = () => {
    let localFilter = {};
    if (props.dataId === "countByCapturedStatus") {
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
    }
    dispatch(setFilterAction(Object.assign({}, filter, localFilter)));
    navigate("/reconciliation");
  };
  return (
    <Segment
      style={{ width: "100%", height: "600px", cursor: "pointer" }}
      color={props.color}
      onClick={onWidgetClick}
    >
      <Label attached="top">{props.title}</Label>
      <ResponsiveContainer width="100%" height="100%">
        {!responseData ? (
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        ) : (
          <BarChart
            data={
              responseData.data.length > 0 ? responseData.data : [emptyData]
            }
            margin={{
              top: 5,
              right: 30,
              left: 40,
              bottom: 20,
            }}
          >
            <XAxis dataKey={props.xAxisKey} />
            <YAxis tickFormatter={formatFunction} />
            <Tooltip formatter={formatFunction} />
            <Legend />
            {props.yAxisKey.map((key) => (
              <Bar dataKey={key.key} fill={key.color} />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </Segment>
  );
};

export default BarChartWidget;
