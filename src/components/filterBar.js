import { endOfDay, lightFormat, startOfDay, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Grid,
  Icon,
  Input,
  Label,
  Image,
  Menu,
  Modal,
} from "semantic-ui-react";
import { setFilterAction } from "../actions/queryDataActions";
import {
  bankitTenants,
  demoTenants,
  indifiTenants,
  mosaicTenants,
  mygateTenants,
  treeboTenants,
  TENANTS,
  TENANT_IDs,
  rotaryTenants,
  kiviTenants,
  intldemoTenants,
  mosaicTestTenants,
  mygateTestTenants,
} from "../utils/constants";

const FilterBar = ({ isMygate, isBankit, subDomain }) => {
  const dispatch = useDispatch();
  const appRoute = useSelector((state) => state.app.route);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const filter = useSelector((state) => state.queryData.filter);
  const [localFilter, setLocalFilter] = useState({});
  const [wildText, setWildText] = useState(filter.text_search);
  const handleDateRangeSelect = (range) => {
    dispatch(
      setFilterAction(
        Object.assign({}, filter, {
          startDate: startOfDay(range.selection.startDate),
          endDate: endOfDay(range.selection.endDate),
        })
      )
    );
  };
  const onCalendarOpen = () => {
    setIsCalendarOpen(true);
  };
  const statusOptions = [
    {
      key: "all",
      text: "all",
      value: "all",
      content: "All",
    },
    {
      key: "true",
      text: "true",
      value: "true",
      content: "True",
    },
    {
      key: "false",
      text: "false",
      value: "false",
      content: "False",
    },
  ];

  const filterListIndifi = [
    {
      type: "is_found_in_Credit",
      forTenants: indifiTenants,
      display: "Found In Credit ",
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value: " ",
          content: "All",
        },
        {
          key: "true",
          text: "Yes",
          value: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
          content: "Yes",
        },
        {
          key: "false",
          text: "No",
          value: "AND lower(cr_dr) = 'cr' and flag_found = FALSE",
          content: "No",
        },
      ],
    },
    {
      type: "is_found_in_Debit",
      forTenants: indifiTenants,
      display: "Found in Debit ",
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value: " ",
          content: "All",
        },
        {
          key: "true",
          text: "Yes",
          value:
            "and lower(cr_dr) = 'cr' and flag_found = TRUE and found_in_debit = TRUE",
          content: "Yes",
        },
        {
          key: "false",
          text: "No",
          value:
            "and lower(cr_dr) = 'cr' and flag_found = TRUE and found_in_debit = FALSE",
          content: "No",
        },
      ],
    },
    {
      type: "is_reconciled",
      forTenants: indifiTenants,
      display: "Reconciled ",
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value: " ",
          content: "All",
        },
        {
          key: "true",
          text: "Yes",
          value:
            "and abs(amount_credit - amount_debit) < 0.01 and flag_found = TRUE and found_in_debit = TRUE",
          content: "Yes",
        },
        {
          key: "false",
          text: "No",
          value:
            "and abs(amount_credit - amount_debit) > 0.01 and flag_found = TRUE and found_in_debit = TRUE",
          content: "No",
        },
      ],
    },
    {
      type: "settlement_aging",
      forTenants: indifiTenants,
      display: "Settlement Aging ",
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value: " ",
          content: "All",
        },
        {
          key: "true",
          text: "Less than 2 Days",
          value:
            "and abs(amount_credit - amount_debit) > 0.01 and flag_found = TRUE and found_in_debit = TRUE and settlement_duration <= 2",
          content: "Less than 2 Days",
        },
        {
          key: "false",
          text: "More than 2 Days",
          value:
            "and abs(amount_credit - amount_debit) > 0.01 and flag_found = TRUE and found_in_debit = TRUE and settlement_duration > 2",
          content: "More than 2 Days",
        },
      ],
    },
  ];

  const filterListMosaicChannel = [
    {
      type: "is_channel",
      display: "Channel:",
      forTenants: mosaicTenants,
      options: [
        // {
        //   key: "all",
        //   text: "All",
        //   value: "all", //this gets set to undefined, hardcoded logic
        //   content: "All",
        // },
        {
          key: "true",
          text: "Amazon",
          value: " ",
          content: "Amazon",
        },
        // {
        //   key: "false",
        //   text: "Flipkart",
        //   value: " ",
        //   content: "Flipkart",
        // },
        // {
        //   key: "YES",
        //   text: "Magento",
        //   value: " ",
        //   content: "Magento",
        // },
        // {
        //   key: "NO",
        //   text: "Nykaa",
        //   value: " ",
        //   content: "Nykaa",
        // },
      ],
    },
  ];

  const filterListMosaicReconciled = [
    {
      type: "is_reconciled",
      display: "Reconciled Status:",
      forTenants: mosaicTenants,
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value: " ", //this gets set to undefined, hardcoded logic
          content: "All",
        },
        {
          key: "true",
          text: "Reconciled",
          value:
            "AND present_in_uniware = true and present_in_channel_amazon = true and abs(principal - subtotal) < 0.01",
          content: "Reconciled",
        },
        {
          key: "false",
          text: "Short Received",
          value:
            "AND present_in_uniware = true and present_in_channel_amazon = true and abs(principal - subtotal) >= 0.01 and principal > subtotal",
          content: "Short Received",
        },
        {
          key: "Yes",
          text: "Excess Received",
          value:
            "AND present_in_uniware = true and present_in_channel_amazon = true and abs(principal - subtotal) >= 0.01 and principal < subtotal",
          content: "Excess Received",
        },
      ],
    },
  ];

  const filterListMosaicOrder = [
    {
      type: "present_in_uniware",
      display: "Orders:",
      forTenants: mosaicTenants,
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value:
            "AND (present_in_uniware=true OR present_in_channel_amazon=false OR present_in_uniware=false)", //this gets set to undefined, hardcoded logic
          content: "All",
        },
        {
          key: "true",
          text: "In Uniware & Channel",
          value: "AND present_in_uniware = true",
          content: "In Uniware & Channel",
        },
        {
          key: "false",
          text: "In Channel Only",
          value: "AND present_in_uniware = false",
          content: "In Channel Only",
        },
        {
          key: "YES",
          text: "In Uniware Only",
          value:
            "AND (present_in_uniware = true AND present_in_channel_amazon = false)",
          content: "In Uniware Only",
        },
      ],
    },
  ];

  const filterListMosaicTestChannel = [
    {
      type: "is_channel",
      display: "Channel ",
      forTenants: mosaicTestTenants,
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value: "and meta_channel is not null", //this gets set to undefined, hardcoded logic
          content: "All",
        },
        {
          key: "true",
          text: "Amazon",
          value: `and meta_channel = "ME_AMAZON"`,
          content: "Amazon",
        },
        {
          key: "YES",
          text: "Swiggy",
          value: `and meta_channel = "ME_MAGENTO"`,
          content: "Swiggy",
        },
        {
          key: "false",
          text: "Zomato",
          value: `and meta_channel = "ME_AMAZON"`,
          content: "Zomato",
        },
        {
          key: "No",
          text: "EatFit",
          value: `and meta_channel = "ME_MAGENTO"`,
          content: "EatFit",
        },
      ],
    },
    {
      type: "is_channel",
      display: "Restaurant ",
      forTenants: mosaicTestTenants,
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value: "and meta_channel is not null", //this gets set to undefined, hardcoded logic
          content: "All",
        },
        {
          key: "ABC",
          text: "Andheri",
          value: `and meta_channel = "ME_AMAZON"`,
          content: "Andheri",
        },
        {
          key: "DEF",
          text: "Annanagar",
          value: ` `,
          content: "Annanagar",
        },
        {
          key: "GHI",
          text: "Banjara Hills",
          value: `ABC`,
          content: "Banjara Hills",
        },
        {
          key: "JKL",
          text: "Bannerghatta",
          value: `and meta_channel = "ME_MAGENTO"`,
          content: "Bannerghatta",
        },
      ],
    },
  ];

  const filterListMosaicTestReconciled = [
    {
      type: "is_reconciled",
      display: "Orders ",
      forTenants: mosaicTestTenants,
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value: " ", //this gets set to undefined, hardcoded logic
          content: "All",
        },
        {
          key: "true",
          text: "Reconciled",
          value: "AND recon_status='matching'",
          content: "Reconciled",
        },
        {
          key: "false",
          text: "Not Reconciled",
          value: "AND recon_status='overpaid'",
          content: "Not Reconciled",
        },
        {
          key: "Yes",
          text: "Missing in Channel",
          value: "AND recon_status='underpaid'",
          content: "Missing in Channel",
        },
        {
          key: "Yes",
          text: "Missing in MB",
          value: "AND recon_status='underpaid'",
          content: "Missing in MB",
        },
      ],
    },
  ];

  const filterListMosaicTestOrder = [
    // {
    //   type: "is_Order_Mosaic",
    //   display: "Orders:",
    //   forTenants: mosaicTestTenants,
    //   whereClauseValue: true,
    //   options: [
    //     {
    //       key: "all",
    //       text: "All",
    //       value: " ", //this gets set to undefined, hardcoded logic
    //       content: "All",
    //     },
    //     {
    //       key: "true",
    //       text: "In Uniware & Channel",
    //       value: "AND present_in_uniware = true and channel is not null",
    //       content: "In Uniware & Channel",
    //     },
    //     {
    //       key: "false",
    //       text: "In Channel Only",
    //       value: "AND present_in_uniware = false and channel is not null",
    //       content: "In Channel Only",
    //     },
    //     {
    //       key: "YES",
    //       text: "In Uniware Only",
    //       value: "AND present_in_uniware = true and channel is null",
    //       content: "In Uniware Only",
    //     },
    //   ],
    // },
  ];

  const filterList = [
    {
      type: "is_captured",
      display: "Is Captured",
      excludeTenants: [
        TENANT_IDs.treebo,
        TENANT_IDs.treebotest,
        TENANT_IDs.bankit,
        TENANT_IDs.bankittest,
        TENANT_IDs.rotarytest,
        TENANT_IDs.rotary,
        TENANT_IDs.kivitest,
      ],
      options: statusOptions,
    },
    {
      type: "is_receipt_generated",
      display: "Is Recipt Generated",
      forTenants: mygateTenants,
      options: statusOptions,
    },
    {
      type: "is_settled",
      display: "Is Settled",
      excludeTenants: [
        TENANT_IDs.treebo,
        TENANT_IDs.treebotest,
        TENANT_IDs.bankit,
        TENANT_IDs.bankittest,
        TENANT_IDs.rotarytest,
        TENANT_IDs.rotary,
        TENANT_IDs.kivitest,
      ],
      options: statusOptions,
    },
    {
      type: "is_paid_out",
      display: "Is Paid Out",
      forTenants: mygateTenants,
      options: statusOptions,
    },
    {
      type: "pg_pay_captured",
      display: "Is Captured",
      forTenants: bankitTenants,
      options: [
        {
          key: "all",
          text: "All",
          value: "all", //this gets set to undefined, hardcoded logic
          content: "All",
        },
        {
          key: "true",
          text: "true",
          value: true,
          content: "True",
        },
        {
          key: "false",
          text: "false",
          value: false,
          content: "False",
        },
      ],
    },
    {
      type: "pg_in_ac_statement",
      display: "In A/C Stmnt",
      forTenants: bankitTenants,
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value: " ",
          content: "All",
        },
        {
          key: "true",
          text: "true",
          value:
            "AND (pg_pay_api_status IS NOT null OR pg_pay_agent_status IS NOT null)",
          content: "True",
        },
        {
          key: "false",
          text: "false",
          value:
            "AND (pg_pay_api_status IS  null AND pg_pay_agent_status IS null)",
          content: "False",
        },
      ],
    },
    {
      type: "pg_is_reconciled",
      display: "Is Reconciled",
      forTenants: bankitTenants,
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          value: " ",
          content: "All",
        },
        {
          key: "true",
          text: "true",
          value:
            "AND ((LOWER(pg_pay_api_status) = LOWER(pg_pay_status_2) OR LOWER(pg_pay_agent_status) = LOWER(pg_pay_status_2)) AND pg_pay_status_2 IS NOT null)",
          content: "True",
        },
        {
          key: "false",
          text: "false",
          value: `AND ((pg_pay_agent_status is not null) or (pg_pay_api_status is not null)) and pg_pay_rr_no_2 not in (SELECT pg_pay_rr_no_2 FROM \`kosh-ai.kosh_dataset_${TENANTS(
            window.location.hostname.split(".")[0]
          ).replace(
            "-",
            ""
          )}.master_recon\` where (lower(pg_pay_status_2) = lower(pg_pay_agent_status) or lower(pg_pay_status_2) = lower(pg_pay_api_status)))`,
          content: "False",
        },
      ],
    },
    {
      type: "Treebo_Txn_Status",
      display: "Transaction ",
      forTenants: treeboTenants,
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          // value: "AND third_party_booking_id is not null",
          value: " ",
          content: "All",
        },
        {
          key: "RazorPay",
          text: "Razorpay",
          value:
            "AND transaction_type_flag = 'razorpay_transaction' AND third_party_booking_id is not null",
          content: "Razorpay",
        },
        {
          key: "Others",
          text: "Others",
          value:
            "AND transaction_type_flag = 'other_transaction' AND third_party_booking_id is not null",
          content: "Others",
        },
      ],
    },
    {
      type: "Treebo_Statement_Status",
      display: "Data ",
      forTenants: treeboTenants,
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          // value: "AND transaction_type_flag = 'razorpay_transaction'",
          value: " ",
          content: "All",
        },
        {
          key: "RazorPay",
          text: "In Razorpay",
          value:
            "AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
          content: "In Razorpay",
        },
        {
          key: "Not_In_RazorPay",
          text: "Not In Razorpay",
          value:
            "AND in_razorpay_data IS false AND transaction_type_flag = 'razorpay_transaction'",
          content: "Not In Razorpay",
        },
      ],
    },
    {
      type: "Treebo_Reconcile_Status",
      display: "Reconciled ",
      forTenants: treeboTenants,
      whereClauseValue: true,
      options: [
        {
          key: "all",
          text: "All",
          // value: "transaction_type_flag = 'razorpay_transaction'",
          value: " ",
          content: "All",
        },
        {
          key: "Reconciled",
          text: "True",
          value:
            "AND is_reconciled IS true AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
          content: "True",
        },
        {
          key: "Not_Reconciled",
          text: "False",
          value:
            "AND is_reconciled IS false AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
          content: "False",
        },
      ],
    },
    {
      type: "rotary_payment_status",
      display: "Payment Status ",
      whereClauseValue: true,
      forTenants: [
        TENANT_IDs.rotarytest,
        TENANT_IDs.rotary,
        TENANT_IDs.kivitest,
      ],
      options: [
        {
          key: "all",
          text: "All",
          value: " ",
          content: "All",
        },
        {
          key: "captured",
          text: "Captured",
          value: "AND payment_status = 'captured'",
          content: "Captured",
        },
        {
          key: "failed",
          text: "Failed",
          value: "AND payment_status = 'failed'",
          content: "Failed",
        },
      ],
    },
    {
      type: "rotary_is_settled",
      display: "Settlement Status ",
      whereClauseValue: true,
      forTenants: [
        TENANT_IDs.rotarytest,
        TENANT_IDs.rotary,
        TENANT_IDs.kivitest,
      ],
      options: [
        {
          key: "all",
          text: "All",
          value: " ",
          content: "All",
        },
        {
          key: "true",
          text: "True",
          value: "AND is_settled = true",
          content: "True",
        },
        {
          key: "false",
          text: "False",
          value: "AND is_settled = false",
          content: "False",
        },
      ],
    },
  ];

  const onFilterOptionChange = (filterType, e, v, whereClauseValue) => {
    // debugger
    if (whereClauseValue) {
      //use for multiple conditions

      setLocalFilter({
        ...localFilter,
        whereClause: {
          ...(localFilter.whereClause || {}),
          [filterType]: v,
        },
      });
      dispatch(
        setFilterAction(
          Object.assign({}, filter, {
            ...filter,
            whereClause: {
              ...(localFilter.whereClause || {}),
              [filterType]: v,
            },
          })
        )
      );
    } else {
      // if (filterType === 'is_captured') {
      //     localFilter[filterType] = v;
      // } else if (filterType === 'is_receipt_generated') {
      //     localFilter[filterType] = v;
      // } else if (filterType === 'is_settled') {
      //     localFilter[filterType] = v;
      // } else if (filterType === 'is_paid_out') {
      //     localFilter[filterType] = v;
      // }
      setLocalFilter({ ...localFilter, [filterType]: v });
      dispatch(
        setFilterAction(
          Object.assign({}, filter, {
            ...filter,
            [filterType]: v == "all" ? undefined : v,
          })
        )
      );
    }
  };
  const onSearch = () => {
    if (wildText !== filter.text_search) {
      localFilter["text_search"] = wildText;
    }
    dispatch(setFilterAction(Object.assign({}, filter, localFilter)));
  };

  return (
    <>
      {demoTenants.includes(TENANTS(subDomain)) ||
      mygateTestTenants.includes(TENANTS(subDomain)) ||
      intldemoTenants.includes(TENANTS(subDomain)) ||
      indifiTenants.includes(TENANTS(subDomain)) ||
      rotaryTenants.includes(TENANTS(subDomain)) ||
      mosaicTestTenants.includes(TENANTS(subDomain)) ||
      kiviTenants.includes(TENANTS(subDomain)) ||
      treeboTenants.includes(TENANTS(subDomain)) ? (
        <div
          className="demo_filter"
          style={{
            borderBottom: "1px solid #CCCFD9",
            padding: "0 1.5em",
            backgroundColor: "#F7F8FA",
            marginBottom: `${appRoute === `/setup` ? `4em` : `2em`}`,
            marginTop: `${appRoute === `/setup` ? ` ` : `3.7em`}`,
          }}
        >
          <Form
            style={{
              paddingTop: `${appRoute === `/setup` ? `0` : `1em`}`,
              paddingBottom: `${appRoute === `/setup` ? `0` : `1em`}`,
            }}
          >
            <Form.Group>
              {appRoute !== "/setup" ? (
                <Form.Field stretched style={{ whiteSpace: "nowrap" }}>
                  <Button
                    as="div"
                    labelPosition="left"
                    onClick={onCalendarOpen}
                  >
                    <Label>
                      {lightFormat(filter.startDate, "yyyy-MM-dd") +
                        " - " +
                        lightFormat(filter.endDate, "yyyy-MM-dd")}
                    </Label>
                    <Button
                      style={{
                        padding: "0",
                        backgroundColor: "#f7f8fa",
                        border: "1px solid #cccfd9",
                        color: "#6b707d",
                      }}
                      icon
                    >
                      <Image
                        src="images/calender.png"
                        style={{
                          width: "17px",
                          height: "17px",
                          margin: "7px",
                        }}
                        size="mini"
                      />
                      {/* <Icon name="calendar alternate outline" /> */}
                    </Button>
                  </Button>
                  <Modal
                    onClose={() => setIsCalendarOpen(false)}
                    onOpen={() => setIsCalendarOpen(true)}
                    open={isCalendarOpen}
                  >
                    <DateRangePicker
                      onChange={handleDateRangeSelect}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={[
                        {
                          startDate: filter.startDate,
                          endDate: filter.endDate,
                          key: "selection",
                        },
                      ]}
                      direction="horizontal"
                    />
                  </Modal>
                </Form.Field>
              ) : (
                ""
              )}
              {appRoute === "/reconciliation" || appRoute === "/commission" ? (
                <>
                  {!rotaryTenants.includes(TENANTS(subDomain)) &&
                  !kiviTenants.includes(TENANTS(subDomain)) &&
                  !treeboTenants.includes(TENANTS(subDomain)) ? (
                    <Form.Field style={{ whiteSpace: "nowrap" }}>
                      <Button>
                        {/* Is Captured{' '} */}
                        <Dropdown
                          icon="chevron down"
                          style={{
                            backgroundColor: "white",
                            borderRadius: "4px",
                          }}
                          inline
                          header="Status"
                          options={statusOptions.map((e) => ({
                            ...e,
                            text: "Captured for " + e.text,
                          }))}
                          defaultValue={
                            filter && filter["is_captured"]
                              ? filter["is_captured"]
                              : statusOptions[0].value
                          }
                          onChange={(e, d) =>
                            onFilterOptionChange("is_captured", e, d.value)
                          }
                        />
                      </Button>
                    </Form.Field>
                  ) : (
                    filterList.map(
                      ({
                        type,
                        display,
                        options,
                        forTenants,
                        excludeTenants,
                        whereClauseValue,
                      }) =>
                        (
                          forTenants
                            ? forTenants.includes(TENANTS(subDomain))
                            : excludeTenants
                            ? !excludeTenants.includes(TENANTS(subDomain))
                            : true
                        ) ? (
                          <Form.Field style={{ whiteSpace: "nowrap" }}>
                            <Button>
                              {/* Is Captured{' '} */}
                              <Dropdown
                                icon="chevron down"
                                style={{
                                  backgroundColor: "white",
                                  borderRadius: "4px",
                                }}
                                inline
                                header="Status"
                                options={options.map((e) => ({
                                  ...e,
                                  text: display + " " + e.text,
                                }))}
                                defaultValue={
                                  filter
                                    ? filter.hasOwnProperty(type)
                                      ? filter[type]
                                      : filter.whereClause.hasOwnProperty(type)
                                      ? filter.whereClause[type]
                                      : options[0].value
                                    : options[0].value
                                }
                                onChange={(e, d) =>
                                  onFilterOptionChange(
                                    type,
                                    e,
                                    d.value,
                                    whereClauseValue
                                  )
                                }
                              />
                            </Button>
                          </Form.Field>
                        ) : null
                    )
                  )}
                </>
              ) : (
                ""
              )}

              {filterListMosaicTestChannel.map(
                ({
                  type,
                  display,
                  options,
                  forTenants,
                  excludeTenants,
                  whereClauseValue,
                }) => (
                  <Form.Field style={{ whiteSpace: "nowrap" }}>
                    {/* <span style={{ marginRight: "0.5rem" }}> {display}</span> */}
                    <Button
                      // className="mosaic_dropdown"
                      style={{
                        // width: "170px",
                        backgroundColor: "white",
                        // border: "1px solid #DDDDDD",
                      }}
                    >
                      {/* Is Captured{' '} */}
                      <Dropdown
                        inline
                        icon="chevron down"
                        header="Status"
                        options={options.map((e) => ({
                          ...e,
                          text: display + " " + e.text,
                        }))}
                        // defaultValue={filter && filter[type]||filter.whereClause[type] ? filter[type] ||filter.whereClause[type]: options[0].value}
                        defaultValue={
                          filter
                            ? filter.hasOwnProperty(type)
                              ? filter[type]
                              : filter.whereClause.hasOwnProperty(type)
                              ? filter.whereClause[type]
                              : options[0].value
                            : options[0].value
                        }
                        onChange={(e, d) =>
                          onFilterOptionChange(
                            type,
                            e,
                            d.value,
                            whereClauseValue
                          )
                        }
                      />
                    </Button>
                  </Form.Field>
                )
              )}

              {appRoute === "/order"
                ? filterListMosaicTestReconciled.map(
                    ({
                      type,
                      display,
                      options,
                      forTenants,
                      excludeTenants,
                      whereClauseValue,
                    }) => (
                      <Form.Field style={{ whiteSpace: "nowrap" }}>
                        {/* <span style={{ marginRight: "0.5rem" }}> {display}</span> */}
                        <Button
                          // className="mosaic_dropdown"
                          style={{
                            // width: "170px",
                            backgroundColor: "white",
                            // border: "1px solid #DDDDDD",
                          }}
                        >
                          {/* Is Captured{' '} */}
                          <Dropdown
                            inline
                            icon="chevron down"
                            header="Status"
                            options={options.map((e) => ({
                              ...e,
                              text: display + " " + e.text,
                            }))}
                            // defaultValue={filter && filter[type]||filter.whereClause[type] ? filter[type] ||filter.whereClause[type]: options[0].value}
                            defaultValue={
                              filter
                                ? filter.hasOwnProperty(type)
                                  ? filter[type]
                                  : filter.whereClause.hasOwnProperty(type)
                                  ? filter.whereClause[type]
                                  : options[0].value
                                : options[0].value
                            }
                            onChange={(e, d) =>
                              onFilterOptionChange(
                                type,
                                e,
                                d.value,
                                whereClauseValue
                              )
                            }
                          />
                        </Button>
                      </Form.Field>
                    )
                  )
                : null}

              {mosaicTestTenants.includes(TENANTS(subDomain)) &&
              (appRoute === "/order" || appRoute === "/transaction")
                ? filterListMosaicTestOrder.map(
                    ({
                      type,
                      display,
                      options,
                      forTenants,
                      excludeTenants,
                      whereClauseValue,
                    }) =>
                      (
                        forTenants
                          ? forTenants.includes(TENANTS(subDomain))
                          : excludeTenants
                          ? !excludeTenants.includes(TENANTS(subDomain))
                          : true
                      ) ? (
                        <Form.Field style={{ whiteSpace: "nowrap" }}>
                          <span style={{ marginRight: "0.5rem" }}>
                            {" "}
                            {display}
                          </span>
                          <Button
                            className="mosaic_dropdown"
                            style={{
                              // width: "210px",
                              width: `${
                                appRoute === `/order` ? `210px` : `170px`
                              }`,
                              backgroundColor: "white",
                              border: "1px solid #DDDDDD",
                            }}
                          >
                            {/* Is Captured{' '} */}
                            <Dropdown
                              inline
                              icon="chevron down"
                              header="Status"
                              options={options.map((e) => ({
                                ...e,
                                text: e.text,
                              }))}
                              // defaultValue={filter && filter[type]||filter.whereClause[type] ? filter[type] ||filter.whereClause[type]: options[0].value}
                              defaultValue={
                                filter
                                  ? filter.hasOwnProperty(type)
                                    ? filter[type]
                                    : filter.whereClause.hasOwnProperty(type)
                                    ? filter.whereClause[type]
                                    : options[0].value
                                  : options[0].value
                              }
                              onChange={(e, d) =>
                                onFilterOptionChange(
                                  type,
                                  e,
                                  d.value,
                                  whereClauseValue
                                )
                              }
                            />
                          </Button>
                        </Form.Field>
                      ) : null
                  )
                : null}

              {(demoTenants.includes(TENANTS(subDomain)) ||
                mygateTestTenants.includes(TENANTS(subDomain)) ||
                intldemoTenants.includes(TENANTS(subDomain))) &&
              (appRoute === "/reconciliation" || appRoute === "/commission") ? (
                <Form.Field style={{ whiteSpace: "nowrap" }}>
                  <Button>
                    {/* Is Receipt Generated{' '} */}
                    <Dropdown
                      icon="chevron down"
                      style={{ backgroundColor: "white", borderRadius: "4px" }}
                      inline
                      header="Status"
                      options={statusOptions.map((e) => ({
                        ...e,
                        text: "Receipt Generated for " + e.text,
                      }))}
                      defaultValue={
                        filter && filter["is_receipt_generated"]
                          ? filter["is_receipt_generated"]
                          : statusOptions[0].value
                      }
                      onChange={(e, d) =>
                        onFilterOptionChange("is_receipt_generated", e, d.value)
                      }
                    />
                  </Button>
                </Form.Field>
              ) : (
                ""
              )}

              {indifiTenants.includes(TENANTS(subDomain)) &&
              appRoute === "/transaction"
                ? filterListIndifi.map(
                    ({
                      type,
                      display,
                      options,
                      forTenants,
                      excludeTenants,
                      whereClauseValue,
                    }) =>
                      (
                        forTenants
                          ? forTenants.includes(TENANTS(subDomain))
                          : excludeTenants
                          ? !excludeTenants.includes(TENANTS(subDomain))
                          : true
                      ) ? (
                        <Form.Field style={{ whiteSpace: "nowrap" }}>
                          <span style={{ marginRight: "0.5rem" }}> </span>
                          <Button
                            className="mosaic_dropdown"
                            style={{
                              // width: "184px",
                              backgroundColor: "white",
                              border: "1px solid #DDDDDD",
                            }}
                          >
                            {/* Is Captured{' '} */}
                            <Dropdown
                              inline
                              icon="chevron down"
                              header="Status"
                              options={options.map((e) => ({
                                ...e,
                                text: display + e.text,
                              }))}
                              // defaultValue={filter && filter[type]||filter.whereClause[type] ? filter[type] ||filter.whereClause[type]: options[0].value}
                              defaultValue={
                                filter
                                  ? filter.hasOwnProperty(type)
                                    ? filter[type]
                                    : filter.whereClause.hasOwnProperty(type)
                                    ? filter.whereClause[type]
                                    : options[0].value
                                  : options[0].value
                              }
                              onChange={(e, d) =>
                                onFilterOptionChange(
                                  type,
                                  e,
                                  d.value,
                                  whereClauseValue
                                )
                              }
                            />
                          </Button>
                        </Form.Field>
                      ) : null
                  )
                : null}

              {(appRoute === "/reconciliation" || appRoute === "/commission") &&
              !rotaryTenants.includes(TENANTS(subDomain)) &&
              !treeboTenants.includes(TENANTS(subDomain)) &&
              !kiviTenants.includes(TENANTS(subDomain)) ? (
                <Form.Field style={{ whiteSpace: "nowrap" }}>
                  <Button>
                    {/* Is Settled{' '} */}
                    <Dropdown
                      icon="chevron down"
                      style={{ backgroundColor: "white", borderRadius: "4px" }}
                      inline
                      header="Status"
                      options={statusOptions.map((e) => ({
                        ...e,
                        text: "Setteled for " + e.text,
                      }))}
                      defaultValue={
                        filter && filter["is_settled"]
                          ? filter["is_settled"]
                          : statusOptions[0].value
                      }
                      onChange={(e, d) =>
                        onFilterOptionChange("is_settled", e, d.value)
                      }
                    />
                  </Button>
                </Form.Field>
              ) : (
                ""
              )}

              {/* <Form.Field stretched>
                <Button floated='right' type='submit' onClick={onDownload}>Download</Button>

            </Form.Field> */}
            </Form.Group>
          </Form>
        </div>
      ) : (
        <div
          style={{
            padding: "0 1.5em",
            marginBottom: `${appRoute === `/setup` ? `4em` : ` `}`,
            marginTop: `${appRoute === `/setup` ? `1.7em` : `3.7em`}`,
          }}
        >
          <Form
            style={{
              marginLeft: "5px",
              paddingTop: `${appRoute === `/setup` ? `0` : `1em`}`,
              paddingBottom: `${appRoute === `/setup` ? `0` : `1em`}`,
            }}
          >
            <Form.Group>
              {appRoute !== "/setup" &&
              !mosaicTenants.includes(TENANTS(subDomain)) &&
              !mosaicTestTenants.includes(TENANTS(subDomain)) &&
              !indifiTenants.includes(TENANTS(subDomain)) ? (
                <Form.Field stretched style={{ whiteSpace: "nowrap" }}>
                  <span>Date Range: </span>
                  <Button
                    as="div"
                    labelPosition="left"
                    onClick={onCalendarOpen}
                  >
                    <Label>
                      {lightFormat(filter.startDate, "yyyy-MM-dd") +
                        "-" +
                        lightFormat(filter.endDate, "yyyy-MM-dd")}
                    </Label>
                    <Button color="violet" icon>
                      <Icon name="calendar alternate outline" />
                    </Button>
                  </Button>
                  <Modal
                    onClose={() => setIsCalendarOpen(false)}
                    onOpen={() => setIsCalendarOpen(true)}
                    open={isCalendarOpen}
                  >
                    <DateRangePicker
                      onChange={handleDateRangeSelect}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={[
                        {
                          startDate: filter.startDate,
                          endDate: filter.endDate,
                          key: "selection",
                        },
                      ]}
                      direction="horizontal"
                    />
                  </Modal>
                </Form.Field>
              ) : (
                ""
              )}

              {(mosaicTenants.includes(TENANTS(subDomain)) ||
                mosaicTestTenants.includes(TENANTS(subDomain)) ||
                indifiTenants.includes(TENANTS(subDomain))) &&
              appRoute !== "/setup" ? (
                <Form.Field stretched style={{ whiteSpace: "nowrap" }}>
                  <span>Date Range: </span>
                  <Button
                    as="div"
                    labelPosition="left"
                    onClick={onCalendarOpen}
                  >
                    {/* <Label>
                    {lightFormat(filter.startDate, "yyyy-MM-dd") +
                      "-" +
                      lightFormat(filter.endDate, "yyyy-MM-dd")}
                  </Label> */}
                    <Label
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #DDDDDD",
                        borderRight: "none",
                      }}
                    >
                      {format(filter.startDate, "d MMM yyyy") +
                        " - " +
                        format(filter.endDate, "d MMM yyyy")}
                    </Label>{" "}
                    <Button
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #DDDDDD",
                        borderLeft: "none",
                      }}
                      icon
                    >
                      <Icon name="calendar alternate outline" />
                    </Button>
                  </Button>
                  <Modal
                    onClose={() => setIsCalendarOpen(false)}
                    onOpen={() => setIsCalendarOpen(true)}
                    open={isCalendarOpen}
                  >
                    <DateRangePicker
                      onChange={handleDateRangeSelect}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={[
                        {
                          startDate: filter.startDate,
                          endDate: filter.endDate,
                          key: "selection",
                        },
                      ]}
                      direction="horizontal"
                    />
                  </Modal>
                </Form.Field>
              ) : (
                ""
              )}

              {mosaicTenants.includes(TENANTS(subDomain)) &&
              appRoute !== "/setup"
                ? filterListMosaicChannel.map(
                    ({
                      type,
                      display,
                      options,
                      forTenants,
                      excludeTenants,
                      whereClauseValue,
                    }) =>
                      (
                        forTenants
                          ? forTenants.includes(TENANTS(subDomain))
                          : excludeTenants
                          ? !excludeTenants.includes(TENANTS(subDomain))
                          : true
                      ) ? (
                        <Form.Field style={{ whiteSpace: "nowrap" }}>
                          <span style={{ marginRight: "0.5rem" }}>
                            {" "}
                            {display}
                          </span>
                          <Button
                            className="mosaic_dropdown"
                            style={{
                              width: "150px",
                              backgroundColor: "white",
                              border: "1px solid #DDDDDD",
                            }}
                          >
                            {/* Is Captured{' '} */}
                            <Dropdown
                              inline
                              icon="chevron down"
                              header="Status"
                              options={options.map((e) => ({
                                ...e,
                                text: e.text,
                              }))}
                              // defaultValue={filter && filter[type]||filter.whereClause[type] ? filter[type] ||filter.whereClause[type]: options[0].value}
                              defaultValue={
                                filter
                                  ? filter.hasOwnProperty(type)
                                    ? filter[type]
                                    : filter.whereClause.hasOwnProperty(type)
                                    ? filter.whereClause[type]
                                    : options[0].value
                                  : options[0].value
                              }
                              onChange={(e, d) =>
                                onFilterOptionChange(
                                  type,
                                  e,
                                  d.value,
                                  whereClauseValue
                                )
                              }
                            />
                          </Button>
                        </Form.Field>
                      ) : null
                  )
                : null}

              {mosaicTestTenants.includes(TENANTS(subDomain)) &&
              appRoute !== "/setup"
                ? filterListMosaicTestChannel.map(
                    ({
                      type,
                      display,
                      options,
                      forTenants,
                      excludeTenants,
                      whereClauseValue,
                    }) =>
                      (
                        forTenants
                          ? forTenants.includes(TENANTS(subDomain))
                          : excludeTenants
                          ? !excludeTenants.includes(TENANTS(subDomain))
                          : true
                      ) ? (
                        <Form.Field style={{ whiteSpace: "nowrap" }}>
                          <span style={{ marginRight: "0.5rem" }}>
                            {" "}
                            {display}
                          </span>
                          <Button
                            className="mosaic_dropdown"
                            style={{
                              width: "170px",
                              backgroundColor: "white",
                              border: "1px solid #DDDDDD",
                            }}
                          >
                            {/* Is Captured{' '} */}
                            <Dropdown
                              inline
                              icon="chevron down"
                              header="Status"
                              options={options.map((e) => ({
                                ...e,
                                text: e.text,
                              }))}
                              // defaultValue={filter && filter[type]||filter.whereClause[type] ? filter[type] ||filter.whereClause[type]: options[0].value}
                              defaultValue={
                                filter
                                  ? filter.hasOwnProperty(type)
                                    ? filter[type]
                                    : filter.whereClause.hasOwnProperty(type)
                                    ? filter.whereClause[type]
                                    : options[0].value
                                  : options[0].value
                              }
                              onChange={(e, d) =>
                                onFilterOptionChange(
                                  type,
                                  e,
                                  d.value,
                                  whereClauseValue
                                )
                              }
                            />
                          </Button>
                        </Form.Field>
                      ) : null
                  )
                : null}

              {indifiTenants.includes(TENANTS(subDomain)) &&
              appRoute === "/transaction"
                ? filterListIndifi.map(
                    ({
                      type,
                      display,
                      options,
                      forTenants,
                      excludeTenants,
                      whereClauseValue,
                    }) =>
                      (
                        forTenants
                          ? forTenants.includes(TENANTS(subDomain))
                          : excludeTenants
                          ? !excludeTenants.includes(TENANTS(subDomain))
                          : true
                      ) ? (
                        <Form.Field style={{ whiteSpace: "nowrap" }}>
                          <span style={{ marginRight: "0.5rem" }}>
                            {" "}
                            {display}
                          </span>
                          <Button
                            className="mosaic_dropdown"
                            style={{
                              width: "120px",
                              backgroundColor: "white",
                              border: "1px solid #DDDDDD",
                            }}
                          >
                            {/* Is Captured{' '} */}
                            <Dropdown
                              inline
                              icon="chevron down"
                              header="Status"
                              options={options.map((e) => ({
                                ...e,
                                text: e.text,
                              }))}
                              // defaultValue={filter && filter[type]||filter.whereClause[type] ? filter[type] ||filter.whereClause[type]: options[0].value}
                              defaultValue={
                                filter
                                  ? filter.hasOwnProperty(type)
                                    ? filter[type]
                                    : filter.whereClause.hasOwnProperty(type)
                                    ? filter.whereClause[type]
                                    : options[0].value
                                  : options[0].value
                              }
                              onChange={(e, d) =>
                                onFilterOptionChange(
                                  type,
                                  e,
                                  d.value,
                                  whereClauseValue
                                )
                              }
                            />
                          </Button>
                        </Form.Field>
                      ) : null
                  )
                : null}
              {(mosaicTenants.includes(TENANTS(subDomain)) ||
                indifiTenants.includes(TENANTS(subDomain))) &&
              (appRoute === "/order" || appRoute === "/transaction")
                ? filterListMosaicOrder.map(
                    ({
                      type,
                      display,
                      options,
                      forTenants,
                      excludeTenants,
                      whereClauseValue,
                    }) =>
                      (
                        forTenants
                          ? forTenants.includes(TENANTS(subDomain))
                          : excludeTenants
                          ? !excludeTenants.includes(TENANTS(subDomain))
                          : true
                      ) ? (
                        <Form.Field style={{ whiteSpace: "nowrap" }}>
                          <span style={{ marginRight: "0.5rem" }}>
                            {" "}
                            {display}
                          </span>
                          <Button
                            className="mosaic_dropdown"
                            style={{
                              // width: "210px",
                              width: `${
                                appRoute === `/order` ? `210px` : `170px`
                              }`,
                              backgroundColor: "white",
                              border: "1px solid #DDDDDD",
                            }}
                          >
                            {/* Is Captured{' '} */}
                            <Dropdown
                              inline
                              icon="chevron down"
                              header="Status"
                              options={options.map((e) => ({
                                ...e,
                                text: e.text,
                              }))}
                              // defaultValue={filter && filter[type]||filter.whereClause[type] ? filter[type] ||filter.whereClause[type]: options[0].value}
                              defaultValue={
                                filter
                                  ? filter.hasOwnProperty(type)
                                    ? filter[type]
                                    : filter.whereClause.hasOwnProperty(type)
                                    ? filter.whereClause[type]
                                    : options[0].value
                                  : options[0].value
                              }
                              onChange={(e, d) =>
                                onFilterOptionChange(
                                  type,
                                  e,
                                  d.value,
                                  whereClauseValue
                                )
                              }
                            />
                          </Button>
                        </Form.Field>
                      ) : null
                  )
                : null}

              {mosaicTenants.includes(TENANTS(subDomain)) &&
              appRoute === "/order"
                ? filterListMosaicReconciled.map(
                    ({
                      type,
                      display,
                      options,
                      forTenants,
                      excludeTenants,
                      whereClauseValue,
                    }) =>
                      (
                        forTenants
                          ? forTenants.includes(TENANTS(subDomain))
                          : excludeTenants
                          ? !excludeTenants.includes(TENANTS(subDomain))
                          : true
                      ) ? (
                        <Form.Field style={{ whiteSpace: "nowrap" }}>
                          <span style={{ marginRight: "0.5rem" }}>
                            {" "}
                            {display}
                          </span>
                          <Button
                            className="mosaic_dropdown"
                            style={{
                              width: "170px",
                              backgroundColor: "white",
                              border: "1px solid #DDDDDD",
                            }}
                          >
                            {/* Is Captured{' '} */}
                            <Dropdown
                              inline
                              icon="chevron down"
                              header="Status"
                              options={options.map((e) => ({
                                ...e,
                                text: e.text,
                              }))}
                              // defaultValue={filter && filter[type]||filter.whereClause[type] ? filter[type] ||filter.whereClause[type]: options[0].value}
                              defaultValue={
                                filter
                                  ? filter.hasOwnProperty(type)
                                    ? filter[type]
                                    : filter.whereClause.hasOwnProperty(type)
                                    ? filter.whereClause[type]
                                    : options[0].value
                                  : options[0].value
                              }
                              onChange={(e, d) =>
                                onFilterOptionChange(
                                  type,
                                  e,
                                  d.value,
                                  whereClauseValue
                                )
                              }
                            />
                          </Button>
                        </Form.Field>
                      ) : null
                  )
                : null}

              {appRoute === "/reconciliation" || appRoute === "/commission"
                ? filterList.map(
                    ({
                      type,
                      display,
                      options,
                      forTenants,
                      excludeTenants,
                      whereClauseValue,
                    }) =>
                      (
                        forTenants
                          ? forTenants.includes(TENANTS(subDomain))
                          : excludeTenants
                          ? !excludeTenants.includes(TENANTS(subDomain))
                          : true
                      ) ? (
                        <Form.Field style={{ whiteSpace: "nowrap" }}>
                          <Button>
                            {/* Is Captured{' '} */}
                            <Dropdown
                              inline
                              header="Status"
                              options={options.map((e) => ({
                                ...e,
                                text: display + " " + e.text,
                              }))}
                              // defaultValue={filter && filter[type]||filter.whereClause[type] ? filter[type] ||filter.whereClause[type]: options[0].value}
                              defaultValue={
                                filter
                                  ? filter.hasOwnProperty(type)
                                    ? filter[type]
                                    : filter.whereClause.hasOwnProperty(type)
                                    ? filter.whereClause[type]
                                    : options[0].value
                                  : options[0].value
                              }
                              onChange={(e, d) =>
                                onFilterOptionChange(
                                  type,
                                  e,
                                  d.value,
                                  whereClauseValue
                                )
                              }
                            />
                          </Button>
                        </Form.Field>
                      ) : null
                  )
                : null}
              {(!bankitTenants.includes(TENANTS(subDomain)) &&
                !mosaicTenants.includes(TENANTS(subDomain)) &&
                !mosaicTestTenants.includes(TENANTS(subDomain)) &&
                !indifiTenants.includes(TENANTS(subDomain)) &&
                appRoute === "/") ||
              appRoute === "/reconciliation" ||
              appRoute === "/commission" ? (
                <Form.Field style={{ whiteSpace: "nowrap" }}>
                  <Button as="div" labelPosition="left">
                    <Input
                      type="text"
                      placeholder="Filter by any value..."
                      defaultValue={wildText}
                      onChange={(e, d) => setWildText(d.value)}
                    />
                    <Button color="violet" icon onClick={onSearch}>
                      <Icon name="search" />
                    </Button>
                  </Button>
                </Form.Field>
              ) : (
                ""
              )}
              {/* <Form.Field stretched>
                <Button floated='right' type='submit' onClick={onDownload}>Download</Button>

            </Form.Field> */}
            </Form.Group>
          </Form>
        </div>
      )}
    </>
  );
};

export default FilterBar;
