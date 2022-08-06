import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimmer, Label, Loader, Segment, Tab, Table } from "semantic-ui-react";
import { getQueryDataAction } from "../../actions/queryDataActions";
import { getQueryConfig } from "../../container/ApplicationsCache";
import { getDataListData } from "../../services/queryDataService";
import { demoTenants, intldemoTenants, TENANTS } from "../../utils/constants";
import {
  formatCurrencyCompact,
  formatCurrencyEN,
} from "../../utils/formatingUtil";

const NodalDataWidget = (props) => {
  let subDomain = props.subDomain;
  const dispatch = useDispatch();
  const [closingBalanceMyGate, setClosingBalanceMyGate] = useState(undefined);

  const amountFromResidentsMygate = useSelector(
    (state) => state.queryData.response["amountFromResidentsMygate"]
  );
  const amountFromMygate = useSelector(
    (state) => state.queryData.response["amountFromMygate"]
  );
  const reversalsMygate = useSelector(
    (state) => state.queryData.response["reversalsMygate"]
  );
  const amountToSocietiesMygate = useSelector(
    (state) => state.queryData.response["amountToSocietiesMygate"]
  );
  const refundsToMygate = useSelector(
    (state) => state.queryData.response["refundsToMygate"]
  );
  const accountValidationFundMygate = useSelector(
    (state) => state.queryData.response["accountValidationFundMygate"]
  );

  const getAmount = (queryResult) => {
    return parseFloat((queryResult?.data[0]?.Amount || 0).toFixed(2));
  };
  const getTotalAmount = () => {
    return (
      (closingBalanceMyGate || 0) +
      getAmount(amountFromResidentsMygate) +
      getAmount(amountFromMygate) +
      getAmount(reversalsMygate) -
      getAmount(amountToSocietiesMygate) -
      getAmount(refundsToMygate) -
      getAmount(accountValidationFundMygate)
    ).toFixed(2);
  };
  const filter = useSelector((state) => state.queryData.filter);
  const text_search = filter.text_search;
  const startDate = filter.startDate.toISOString();
  const endDate = filter.endDate.toISOString();

  const calculateClosingBalance = (data) => {
    const closing = parseFloat(data[0]?.closing_balance || "0");
    const amount = parseFloat(data[0]?.amount || "0");
    if (data[0]?.source_type == "bank_transfer") {
      return (closing - amount).toFixed(2);
    } else if (data[0]?.source_type == "fund_account_validation") {
      return (closing + amount).toFixed(2);
    } else if (data[0]?.source_type == "payout") {
      return (closing + amount).toFixed(2);
    } else if (data[0]?.source_type == "reversal") {
      return (closing - amount).toFixed(2);
    } else {
      return closing.toFixed(2);
    }
  };
  useEffect(() => {
    const config = getQueryConfig("closingBalanceMyGate");
    const effective_filter = {
      ...config.filter,
      startDate,
      endDate,
      text_search,
    };
    setClosingBalanceMyGate(undefined);
    getDataListData({ ...config, filter: effective_filter }, (resp) => {
      console.log(resp);
      setClosingBalanceMyGate(parseFloat(calculateClosingBalance(resp.data)));
    });
    if (!amountFromResidentsMygate) {
      const config = getQueryConfig("amountFromResidentsMygate");
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction("amountFromResidentsMygate", {
          ...config,
          fields: config.fields,
          filter: effective_filter,
        })
      );
    }
    if (!amountFromMygate) {
      const config = getQueryConfig("amountFromMygate");
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction("amountFromMygate", {
          ...config,
          fields: config.fields,
          filter: effective_filter,
        })
      );
    }
    if (!reversalsMygate) {
      const config = getQueryConfig("reversalsMygate");
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction("reversalsMygate", {
          ...config,
          fields: config.fields,
          filter: effective_filter,
        })
      );
    }
    if (!amountToSocietiesMygate) {
      const config = getQueryConfig("amountToSocietiesMygate");
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction("amountToSocietiesMygate", {
          ...config,
          fields: config.fields,
          filter: effective_filter,
        })
      );
    }
    if (!refundsToMygate) {
      const config = getQueryConfig("refundsToMygate");
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction("refundsToMygate", {
          ...config,
          fields: config.fields,
          filter: effective_filter,
        })
      );
    }
    if (!accountValidationFundMygate) {
      const config = getQueryConfig("accountValidationFundMygate");
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      dispatch(
        getQueryDataAction("accountValidationFundMygate", {
          ...config,
          fields: config.fields,
          filter: effective_filter,
        })
      );
    }
  }, [filter]);
  return (
    <Segment style={{ minHeight: "100px" }}>
      <Label attached="top">Nodal File Data</Label>
      {false ? (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      ) : (
        <Table striped={true}>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Opening Balance (A) </Table.Cell>
              <Table.Cell textAlign="right">
                {closingBalanceMyGate !== undefined ? (
                  demoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyCompact(closingBalanceMyGate)}`
                  ) : intldemoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyEN(closingBalanceMyGate)}`
                  ) : (
                    `Rs. ${closingBalanceMyGate}`
                  )
                ) : (
                  <Loader active inline size="mini" />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Amount received from users (B) </Table.Cell>
              <Table.Cell textAlign="right">
                {amountFromResidentsMygate ? (
                  demoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyCompact(
                      getAmount(amountFromResidentsMygate)
                    )}`
                  ) : intldemoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyEN(getAmount(amountFromResidentsMygate))}`
                  ) : (
                    `Rs. ${getAmount(amountFromResidentsMygate)}`
                  )
                ) : (
                  <Loader active inline size="mini" />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Amount added (C) </Table.Cell>
              <Table.Cell textAlign="right">
                {amountFromMygate ? (
                  demoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyCompact(getAmount(amountFromMygate))}`
                  ) : intldemoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyEN(getAmount(amountFromMygate))}`
                  ) : (
                    `Rs. ${getAmount(amountFromMygate)}`
                  )
                ) : (
                  <Loader active inline size="mini" />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Reversals (D) </Table.Cell>
              <Table.Cell textAlign="right">
                {reversalsMygate ? (
                  demoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyCompact(getAmount(reversalsMygate))}`
                  ) : intldemoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyEN(getAmount(reversalsMygate))}`
                  ) : (
                    `Rs. ${getAmount(reversalsMygate)}`
                  )
                ) : (
                  <Loader active inline size="mini" />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Amount paid to societies (E) </Table.Cell>
              <Table.Cell textAlign="right">
                {amountToSocietiesMygate ? (
                  demoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyCompact(
                      getAmount(amountToSocietiesMygate)
                    )}`
                  ) : intldemoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyEN(getAmount(amountToSocietiesMygate))}`
                  ) : (
                    `Rs. ${getAmount(amountToSocietiesMygate)}`
                  )
                ) : (
                  <Loader active inline size="mini" />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Amount refunded (F) </Table.Cell>
              <Table.Cell textAlign="right">
                {refundsToMygate ? (
                  demoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyCompact(getAmount(refundsToMygate))}`
                  ) : intldemoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyEN(getAmount(refundsToMygate))}`
                  ) : (
                    `Rs. ${getAmount(refundsToMygate)}`
                  )
                ) : (
                  <Loader active inline size="mini" />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Account validation fund (G) </Table.Cell>
              <Table.Cell textAlign="right">
                {accountValidationFundMygate ? (
                  demoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyCompact(
                      getAmount(accountValidationFundMygate)
                    )}`
                  ) : intldemoTenants.includes(TENANTS(subDomain)) ? (
                    `${formatCurrencyEN(
                      getAmount(accountValidationFundMygate)
                    )}`
                  ) : (
                    `Rs. ${getAmount(accountValidationFundMygate)}`
                  )
                ) : (
                  <Loader active inline size="mini" />
                )}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <strong>Closing balance (A + B + C + D - E - F - G)</strong>
              </Table.Cell>
              <Table.Cell textAlign="right">
                {demoTenants.includes(TENANTS(subDomain)) ? (
                  <strong>{formatCurrencyCompact(getTotalAmount())}</strong>
                ) : intldemoTenants.includes(TENANTS(subDomain)) ? (
                  <strong>{formatCurrencyEN(getTotalAmount())}</strong>
                ) : (
                  <strong>Rs. {getTotalAmount()}</strong>
                )}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </Segment>
  );
};

export default NodalDataWidget;
