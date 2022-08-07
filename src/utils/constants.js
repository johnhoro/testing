export const IS_LOCAL = false;

//export const API_URL = IS_LOCAL ? "http://localhost:5000" : "https://asia-south1.cloudfunctions.net";
// export const API_URL = IS_LOCAL ? "http://localhost:5000" : "https://asia-south1.cloudfunctions.net";
export const API_URL = IS_LOCAL
  ? "http://localhost:5000"
  : "https://asia-south1-kosh-ai.cloudfunctions.net";
export const TENANT_IDs = {
  //TENANT <-> TENANT ID
  mygate: "mygate-9cfml",
  olacabs: "olacabs-scdz3",
  mygatetest: "mygatetest-u5yy3",
  mygatetest2: "mygatetest2-c1mdw",
  demo: "demo-rhk6g",
  test: "test-05pfe",
  eatfittest: "eatfittest-374en",
  bankittest: "bankittest-0lbzk",
  bankit: "bankit-357xu",
  indifitest: "indifitest-juk2w",
  mosaictest: "mosaictest-hrugg",
  indifi: "indifi-9r22k",
  mosaic: "mosaic-abzwg",
  treebotest: "treebotest-kaolo",
  treebo: "treebo-95hd6",
  rotarytest: "rotarytest-zse03",
  rotary: "rotary-yohvw",
  intldemo: "intldemo-qwh6u",
  kivitest: "kivitest-ov20n",
};
export const mygateTenants = [TENANT_IDs.mygate];
export const mygateTestTenants = [
  TENANT_IDs.mygatetest,
  TENANT_IDs.mygatetest2,
];
export const bankitTenants = [TENANT_IDs.bankittest, TENANT_IDs.bankit];
export const demoTenants = [TENANT_IDs.demo];
export const intldemoTenants = [TENANT_IDs.intldemo];
export const mosaicTenants = [TENANT_IDs.mosaic];
export const mosaicTestTenants = [TENANT_IDs.mosaictest];
export const indifiTenants = [TENANT_IDs.indifitest, TENANT_IDs.indifi];
export const treeboTenants = [TENANT_IDs.treebotest, TENANT_IDs.treebo];
export const eatfitTenants = [TENANT_IDs.eatfittest];
export const rotaryTenants = [TENANT_IDs.rotarytest, TENANT_IDs.rotary];
export const kiviTenants = [TENANT_IDs.kivitest];

export const TENANTS = (subDomain) => {
  //SUB-DOMAIN <-> TENANT ID
  const tenants = {
    mygate: TENANT_IDs.mygate,
    olacabs: TENANT_IDs.olacabs,
    mygatetest: TENANT_IDs.mygatetest,
    mygatetest2: TENANT_IDs.mygatetest2,
    demo: TENANT_IDs.demo,
    intldemo: TENANT_IDs.intldemo,
    test: TENANT_IDs.test,
    bankittest: TENANT_IDs.bankittest,
    indifitest: TENANT_IDs.indifitest,
    indifi: TENANT_IDs.indifi,
    mosaictest: TENANT_IDs.mosaictest,
    mosaic: TENANT_IDs.mosaic,
    bankit: TENANT_IDs.bankit,
    localhost: TENANT_IDs.mosaictest,
    eatfittest: TENANT_IDs.eatfittest,
    treebotest: TENANT_IDs.treebotest,
    treebo: TENANT_IDs.treebo,
    rotarytest: TENANT_IDs.rotarytest,
    rotary: TENANT_IDs.rotary,
    kivitest: TENANT_IDs.kivitest,
  };
  return tenants[subDomain] ?? "";
};

export const LABEL_TRANSLATIONS = (label) => {
  const subDomain = window.location.hostname.split(".")[0];
  const labels = {
    default: {
      Captured: "Captured Transactions",
      ReceiptGenerated: "Receipt Generated",
      Settled: "Settled",
      PaidOut: "Paid Out",
      NotCaptured: "Unsuccessful Transactions",
      ReceiptNotGenerated: "Receipt Not Generated",
      NotSettled: "Not Settled",
      NotPaidOut: "Not Paid Out",
      TotalReceipts: "Total Receipt",
      CashFlow: "Cash Flow",
      TotalCommission: "Total Commission (excl tax)",
      TotalGst: "Total Tax",
      Charges: "Transaction Charges",
      Commission: "Commission",
    },

    [TENANT_IDs.indifitest]: {
      FoundInCreadit: "Found in Credit",
      NotFoundInCreadit: "Not Found in Credit",
      FoundInDebit: "Found in Debit",
      NotFoundInDebit: "Not Found in Debit",
      Reconciled: "Reconciled",
      NotReconciled: "Not Reconciled",
      SettledWithinTwoDays: "Aging Less than 2 Days",
      SettledAfterTwoDays: "Aging More than 2 Days",
      // TotalCreditAmount: "Total Credit Amount",
      // FoundInDebitAmount: "Found in Debit Amount",
      // NotFoundInDebitAmount: "Not Found in Debit Amount",
      TotalCreditAmount: "Total Credit Amount",
      TotalDebitAmount: "Found in Debit Amount",
      TotalNotInDebitAmount: "Not Found in Debit Amount",

      Captured: "Captured Transactions",
      ReceiptGenerated: "Receipt Generated",
      Settled: "Settled",
      PaidOut: "Paid Out",
      NotCaptured: "Unsuccessful Transactions",
      ReceiptNotGenerated: "Receipt Not Generated",
      NotSettled: "Not Settled",
      NotPaidOut: "Pending Payouts",
      TotalReceipts: "Total Receipt",
      TotalCommission: "Total Commission (excl tax)",
      TotalGst: "Total Tax",
      Charges: "Transaction Charges",
      Commission: "Commission",
    },
    [TENANT_IDs.indifi]: {
      FoundInCreadit: "Found in Credit",
      NotFoundInCreadit: "Not Found in Credit",
      FoundInDebit: "Found in Debit",
      NotFoundInDebit: "Not Found in Debit",
      Reconciled: "Reconciled",
      NotReconciled: "Not Reconciled",
      SettledWithinTwoDays: "Aging Less than 2 Days",
      SettledAfterTwoDays: "Aging More than 2 Days",
      // TotalCreditAmount: "Total Credit Amount",
      // FoundInDebitAmount: "Found in Debit Amount",
      // NotFoundInDebitAmount: "Not Found in Debit Amount",
      TotalCreditAmount: "Total Credit Amount",
      TotalDebitAmount: "Found in Debit Amount",
      TotalNotInDebitAmount: "Not Found in Debit Amount",

      Captured: "Captured Transactions",
      ReceiptGenerated: "Receipt Generated",
      Settled: "Settled",
      PaidOut: "Paid Out",
      NotCaptured: "Unsuccessful Transactions",
      ReceiptNotGenerated: "Receipt Not Generated",
      NotSettled: "Not Settled",
      NotPaidOut: "Pending Payouts",
      TotalReceipts: "Total Receipt",
      TotalCommission: "Total Commission (excl tax)",
      TotalGst: "Total Tax",
      Charges: "Transaction Charges",
      Commission: "Commission",
    },
    [TENANT_IDs.mosaictest]: {
      ALL_ORDERS: "ALL ORDERS",
      Paid_by_Users: "Paid by Users",
      Commission_AllOrder: "Commission",
      Govt_Tax: "Govt. Tax",
      Net_Payable: "Net Payable",

      ORDERS_IN_UNIWARE_AND_CHANNEL: "ORDERS IN UNIWARE & CHANNEL",
      countByCommissionUniwareNbdChannel: "Not Reconciled",
      countByPaidByUserUniwareAndChannel: "Pending Payouts",
      countByGovtTaxUniwareAndChannel: "Total Receipt",
      countByNetPayableUniwareAndChannel: "Total Commission (excl tax)",

      ORDERS_IN_CHANNEL_ONLY: "ORDERS IN CHANNEL ONLY",
      countByPaidByUserChannelOnly: "Transaction Charges",
      countByCommissionChannelOnly: "Commission",
      countByGovtTaxChannelOnly: "Other Transactions",
      countByNetPayableChannelOnly: "Captured Amount",

      ORDERS_IN_UNIWARE_ONLY: "ORDERS IN UNIWARE ONLY",
      countByPaidByUserUniwareOnly: "Transaction Charges",
      countByCommissionUniwareOnly: "Commission",
      countByGovtTaxUniwareOnly: "Other Transactions",
      countByNetPayableUniwareOnly: "Captured Amount",
    },
    [TENANT_IDs.mosaic]: {
      ALL_ORDERS: "ALL ORDERS",
      Paid_by_Users: "Paid by Users",
      Commission_AllOrder: "Commission",
      Govt_Tax: "Govt. Tax",
      Net_Payable: "Net Payable",

      ORDERS_IN_UNIWARE_AND_CHANNEL: "ORDERS IN UNIWARE & CHANNEL",
      countByCommissionUniwareNbdChannel: "Not Reconciled",
      countByPaidByUserUniwareAndChannel: "Pending Payouts",
      countByGovtTaxUniwareAndChannel: "Total Receipt",
      countByNetPayableUniwareAndChannel: "Total Commission (excl tax)",

      ORDERS_IN_CHANNEL_ONLY: "ORDERS IN CHANNEL ONLY",
      countByPaidByUserChannelOnly: "Transaction Charges",
      countByCommissionChannelOnly: "Commission",
      countByGovtTaxChannelOnly: "Other Transactions",
      countByNetPayableChannelOnly: "Captured Amount",

      ORDERS_IN_UNIWARE_ONLY: "ORDERS IN UNIWARE ONLY",
      countByPaidByUserUniwareOnly: "Transaction Charges",
      countByCommissionUniwareOnly: "Commission",
      countByGovtTaxUniwareOnly: "Other Transactions",
      countByNetPayableUniwareOnly: "Captured Amount",
    },
    [TENANT_IDs.bankittest]: {
      Captured: "Captured Transactions",
      NotCaptured: "Other Transactions",
      InStatement: "IN A/C STMNT",
      NotInStatement: "NOT IN A/C STMNT",
      Reconciled: "RECONCILED",
      NotReconciled: "NOT RECONCILED",
    },
    [TENANT_IDs.bankit]: {
      Captured: "Captured Transactions",
      NotCaptured: "Other Transactions",
      InStatement: "IN A/C STMNT",
      NotInStatement: "NOT IN A/C STMNT",
      Reconciled: "RECONCILED",
      NotReconciled: "NOT RECONCILED",
    },
    [TENANT_IDs.treebotest]: {
      Transactions_Via_Razorpay: "Transactions Via Razorpay",
      In_Razorpay_Data: "In Razorpay Data",
      Other_Transactions: "Other Transactions",
      Not_IN_Razorpay_Data: "Not In Razorpay Data",
      Reconciled: "Reconciled",
      Not_Reconciled: "Not Reconciled",
      captured_amount: "Total Razorpay Amount",
      reconciled_amount: "Reconciled Amount",
      not_reconciled_amount: "Not Reconciled Amount",
    },
    [TENANT_IDs.treebo]: {
      Transactions_Via_Razorpay: "Transactions Via Razorpay",
      In_Razorpay_Data: "In Razorpay Data",
      Other_Transactions: "Other Transactions",
      Not_IN_Razorpay_Data: "Not In Razorpay Data",
      Reconciled: "Reconciled",
      Not_Reconciled: "Not Reconciled",
      captured_amount: "Total Razorpay Amount",
      reconciled_amount: "Reconciled Amount",
      not_reconciled_amount: "Not Reconciled Amount",
    },
    [TENANT_IDs.rotarytest]: {
      captured_amount: "Captured Amount",
      settled_amount: "Settled Amount",
      not_yet_settled_amount: "Not Yet Settled Amount",
      SETTLED: "SETTLED",
      NOT_SETTLED: "NOT SETTLED",
      FAILED: "FAILED",
      CAPTURED: "CAPTURED",
    },
    [TENANT_IDs.rotary]: {
      captured_amount: "Captured Amount",
      settled_amount: "Settled Amount",
      not_yet_settled_amount: "Not Yet Settled Amount",
      SETTLED: "SETTLED",
      NOT_SETTLED: "NOT SETTLED",
      FAILED: "FAILED",
      CAPTURED: "CAPTURED",
    },
    [TENANT_IDs.kivitest]: {
      captured_amount: "Captured Amount",
      settled_amount: "Settled Amount",
      not_yet_settled_amount: "Not Yet Settled Amount",
      SETTLED: "SETTLED",
      NOT_SETTLED: "NOT SETTLED YET",
      FAILED: "FAILED PAYMENTS",
      CAPTURED: "CAPTURED PAYMENTS",
    },
    [TENANT_IDs.kivitest]: {
      captured_amount: "Captured Amount",
      settled_amount: "Settled Amount",
      not_yet_settled_amount: "Not Yet Settled Amount",
      SETTLED: "SETTLED",
      NOT_SETTLED: "NOT SETTLED YET",
      FAILED: "FAILED PAYMENTS",
      CAPTURED: "CAPTURED PAYMENTS",
    },
  };
  return (
    (labels[TENANTS(subDomain) || "default"] || labels["default"])[label] ||
    label
  );
};
export const sourceTypes = (key) => {
  const subDomain = window.location.hostname.split(".")[0];
  const Types = {
    default: [
      {
        key: "razorpay_gateway",
        text: "Razorpay Gateway",
        value: "razorpay_gateway",
      },
      {
        key: "razorpay_payout",
        text: "Razorpay Payout",
        value: "razorpay_payout",
      },
      { key: "merc_order", text: "Merchant Orders", value: "merc_order" },
      {
        key: "cashfree_gateway",
        text: "Cashfree Gateway",
        value: "cashfree_gateway",
      },
      {
        key: "cashfree_payout",
        text: "Cashfree Payout",
        value: "cashfree_payout",
      },
      {
        key: "yesbank_payout",
        text: "Yesbank Payout",
        value: "yesbank_payout",
      },
      {
        key: "rp_nodal_statements",
        text: "Nodal Statement",
        value: "rp_nodal_statements",
      },
    ],
    [TENANT_IDs.bankittest]: [
      {
        key: "fino_transactions",
        text: "Fino Transactions",
        value: "fino_transactions",
      },
      {
        key: "aadharshila_transactions",
        text: "Aadharshila Transactions",
        value: "aadharshila_transactions",
      },
      {
        key: "agent_stmt",
        text: "Agent Statement",
        value: "agent_stmt",
      },
      {
        key: "api_stmt",
        text: "API Statement",
        value: "api_stmt",
      },
    ],
    [TENANT_IDs.bankit]: [
      {
        key: "fino_transactions",
        text: "Fino Transactions",
        value: "fino_transactions",
      },
      {
        key: "aadharshila_transactions",
        text: "Aadharshila Transactions",
        value: "aadharshila_transactions",
      },
      {
        key: "agent_stmt",
        text: "Agent Statement",
        value: "agent_stmt",
      },
      {
        key: "api_stmt",
        text: "API Statement",
        value: "api_stmt",
      },
    ],
    [TENANT_IDs.eatfittest]: [
      {
        key: "eatfit_metabase",
        text: "Metabase",
        value: "eatfit_metabase",
      },
      {
        key: "eatfit_swiggy",
        text: "Swiggy",
        value: "eatfit_swiggy",
      },
      {
        key: "eatfit_zomato",
        text: "Zomato",
        value: "eatfit_zomato",
      },
    ],
    [TENANT_IDs.indifitest]: [
      {
        key: "bank_statement_icici",
        text: "Bank Statement",
        value: "bank_statement_icici",
      },
      {
        key: "payment_credit",
        text: "Payment Credit",
        value: "payment_credit",
      },
      {
        key: "payment_mis",
        text: "Payment MIS",
        value: "payment_mis",
      },
    ],
    [TENANT_IDs.indifi]: [
      {
        key: "bank_statement_icici",
        text: "Bank Statement",
        value: "bank_statement_icici",
      },
      {
        key: "payment_credit",
        text: "Payment Credit",
        value: "payment_credit",
      },
      {
        key: "payment_mis",
        text: "Payment MIS",
        value: "payment_mis",
      },
    ],
    [TENANT_IDs.mosaictest]: [
      {
        key: "eatfit_metabase",
        text: "POS",
        value: "eatfit_metabase",
      },
      {
        key: "eatfit_swiggy",
        text: "Swiggy",
        value: "eatfit_swiggy",
      },
      {
        key: "eatfit_zomato",
        text: "Zomato",
        value: "eatfit_zomato",
      },
    ],
    [TENANT_IDs.mosaic]: [
      {
        key: "uniware_sales_order",
        text: "Uniware Orders",
        value: "uniware_sales_order",
      },
      {
        key: "disbursement_elec",
        text: "Amazon Disbursement Electronic",
        value: "disbursement_elec",
      },
      {
        key: "disbursement_cod",
        text: "Amazon Disbursement COD",
        value: "disbursement_cod",
      },
    ],
    [TENANT_IDs.treebotest]: [
      {
        key: "treebo_booking_data",
        text: "Booking Data",
        value: "treebo_booking_data",
      },
      {
        key: "treebo_razorpay_transaction_report",
        text: "Razorpay Transaction Report",
        value: "treebo_razorpay_transaction_report",
      },
    ],
    [TENANT_IDs.treebo]: [
      {
        key: "treebo_booking_data",
        text: "Booking Data",
        value: "treebo_booking_data",
      },
      {
        key: "treebo_razorpay_transaction_report",
        text: "Razorpay Transaction Report",
        value: "treebo_razorpay_transaction_report",
      },
    ],
    [TENANT_IDs.rotarytest]: [
      {
        key: "rotary_payments",
        text: "Payment File",
        value: "rotary_payments",
      },
      {
        key: "rotary_settlements",
        text: "Settlement File",
        value: "rotary_settlements",
      },
    ],
    [TENANT_IDs.rotary]: [
      {
        key: "rotary_payments",
        text: "Payment File",
        value: "rotary_payments",
      },
      {
        key: "rotary_settlements",
        text: "Settlement File",
        value: "rotary_settlements",
      },
    ],
    [TENANT_IDs.kivitest]: [
      {
        key: "kivi_payments",
        text: "Payment File",
        value: "kivi_payments",
      },
      {
        key: "kivi_settlements",
        text: "Settlement File",
        value: "kivi_settlements",
      },
    ],
  };
  return key
    ? (Types[TENANTS(subDomain) || "default"] || Types["default"]).find(
        (type) => key === type.key
      )
    : Types[TENANTS(subDomain) || "default"] || Types["default"];
};

export const connectionTypes = [
  { key: "file_upload", text: "Manual File Upload", value: "file_upload" },
  { key: "aws_s3", text: "AWS S3", value: "aws_s3" },
  { key: "api", text: "API", value: "api" },
];

export const dataTypes = (key) => {
  const subDomain = window.location.hostname.split(".")[0];
  const Types = {
    default: [
      { key: "rp_payments", value: "rp_payments", text: "Payments" },
      { key: "rp_settlements", value: "rp_settlements", text: "Settlements" },
      { key: "rp_payouts", value: "rp_payouts", text: "Payouts" },
      { key: "merc_payments", value: "merc_payments", text: "Orders" },
      { key: "merc_payouts", value: "merc_payouts", text: "Payouts" },
      { key: "cfr_payments", value: "cfr_payments", text: "Payments" },
      { key: "cfr_settlements", value: "cfr_settlements", text: "Settlements" },
      { key: "cfr_payouts", value: "cfr_payouts", text: "Payouts" },
      { key: "ysb_payouts", value: "ysb_payouts", text: "Payouts" },
      {
        key: "rp_nodal_statements",
        value: "rp_nodal_statements",
        text: "RP Nodal Statement",
      },
    ],
    [TENANT_IDs.bankittest]: [
      {
        key: "fino_transactions",
        text: "Fino Transactions",
        value: "fino_transactions",
      },
      {
        key: "aadharshila_transactions",
        text: "Aadharshila Transactions",
        value: "aadharshila_transactions",
      },
      {
        key: "agent_stmt",
        text: "Agent Statement",
        value: "agent_stmt",
      },
      {
        key: "api_stmt",
        text: "API Statement",
        value: "api_stmt",
      },
    ],
    [TENANT_IDs.bankit]: [
      {
        key: "fino_transactions",
        text: "Fino Transactions",
        value: "fino_transactions",
      },
      {
        key: "aadharshila_transactions",
        text: "Aadharshila Transactions",
        value: "aadharshila_transactions",
      },
      {
        key: "agent_stmt",
        text: "Agent Statement",
        value: "agent_stmt",
      },
      {
        key: "api_stmt",
        text: "API Statement",
        value: "api_stmt",
      },
    ],
    [TENANT_IDs.eatfittest]: [
      {
        key: "eatfit_metabase",
        text: "Metabase",
        value: "eatfit_metabase",
      },
      {
        key: "eatfit_swiggy",
        text: "Swiggy",
        value: "eatfit_swiggy",
      },
      {
        key: "eatfit_zomato",
        text: "Zomato",
        value: "eatfit_zomato",
      },
    ],
    [TENANT_IDs.indifitest]: [
      {
        key: "bank_statement_icici",
        text: "Bank Statement",
        value: "bank_statement_icici",
      },
      {
        key: "payment_credit",
        text: "Payment Credit",
        value: "payment_credit",
      },
      {
        key: "payment_mis",
        text: "Payment MIS",
        value: "payment_mis",
      },
    ],
    [TENANT_IDs.indifi]: [
      {
        key: "bank_statement_icici",
        text: "Bank Statement",
        value: "bank_statement_icici",
      },
      {
        key: "payment_credit",
        text: "Payment Credit",
        value: "payment_credit",
      },
      {
        key: "payment_mis",
        text: "Payment MIS",
        value: "payment_mis",
      },
    ],
    [TENANT_IDs.mosaictest]: [
      {
        key: "uniware_sales_order",
        text: "Uniware Orders",
        value: "uniware_sales_order",
      },
      {
        key: "disbursement_elec",
        text: "Amazon Disbursement Electronic",
        value: "disbursement_elec",
      },
      {
        key: "disbursement_cod",
        text: "Amazon Disbursement COD",
        value: "disbursement_cod",
      },
      {
        key: "rp_settlement_mm",
        text: "Razorpay Settlement MM",
        value: "rp_settlement_mm",
      },
      {
        key: "rp_settlement_bw",
        text: "Razorpay Settlement BW",
        value: "rp_settlement_bw",
      },
      {
        key: "bw_magento",
        text: "BW Magento",
        value: "bw_magento",
      },
    ],
    [TENANT_IDs.mosaic]: [
      {
        key: "uniware_sales_order",
        text: "Uniware Orders",
        value: "uniware_sales_order",
      },
      {
        key: "disbursement_elec",
        text: "Amazon Disbursement Electronic",
        value: "disbursement_elec",
      },
      {
        key: "disbursement_cod",
        text: "Amazon Disbursement COD",
        value: "disbursement_cod",
      },
    ],
    [TENANT_IDs.treebotest]: [
      {
        key: "treebo_booking_data",
        text: "Booking Data",
        value: "treebo_booking_data",
      },
      {
        key: "treebo_razorpay_transaction_report",
        text: "Razorpay Transaction Report",
        value: "treebo_razorpay_transaction_report",
      },
    ],
    [TENANT_IDs.treebo]: [
      {
        key: "treebo_booking_data",
        text: "Booking Data",
        value: "treebo_booking_data",
      },
      {
        key: "treebo_razorpay_transaction_report",
        text: "Razorpay Transaction Report",
        value: "treebo_razorpay_transaction_report",
      },
    ],
    [TENANT_IDs.rotarytest]: [
      {
        key: "rotary_payments",
        text: "Payment File",
        value: "rotary_payments",
      },
      {
        key: "rotary_settlements",
        text: "Settlement File",
        value: "rotary_settlements",
      },
    ],
    [TENANT_IDs.rotary]: [
      {
        key: "rotary_payments",
        text: "Payment File",
        value: "rotary_payments",
      },
      {
        key: "rotary_settlements",
        text: "Settlement File",
        value: "rotary_settlements",
      },
    ],
    [TENANT_IDs.kivitest]: [
      {
        key: "kivi_payments",
        text: "Payment File",
        value: "kivi_payments",
      },
      {
        key: "kivi_settlements",
        text: "Settlement File",
        value: "kivi_settlements",
      },
    ],
  };
  return key
    ? (Types[TENANTS(subDomain) || "default"] || Types["default"]).find(
        (type) => key === type.key
      )
    : Types[TENANTS(subDomain) || "default"] || Types["default"];
};

export const sourceToDataTypeMap = {
  razorpay_gateway: ["rp_payments", "rp_settlements"],
  razorpay_payout: ["rp_payouts"],
  merc_order: ["merc_payments", "merc_payouts"],
  cashfree_gateway: ["cfr_payments"],
  cashfree_payout: ["cfr_payouts"],
  yesbank_payout: ["ysb_payouts"],
  rp_nodal_statements: ["rp_nodal_statements"],
  fino_transactions: ["fino_transactions"],
  aadharshila_transactions: ["aadharshila_transactions"],
  agent_stmt: ["agent_stmt"],
  api_stmt: ["api_stmt"],
  bank_statement_icici: ["bank_statement_icici"],
  payment_credit: ["payment_credit"],
  payment_mis: ["payment_mis"],
  uniware_sales_order: ["uniware_sales_order"],
  disbursement_cod: ["disbursement_cod"],
  disbursement_elec: ["disbursement_elec"],
  rp_settlement_mm: ["rp_settlement_mm"],
  rp_settlement_bw: ["rp_settlement_bw"],
  bw_magento: ["bw_magento"],
  treebo_booking_data: ["treebo_booking_data"],
  treebo_razorpay_transaction_report: ["treebo_razorpay_transaction_report"],
  eatfit_metabase: ["eatfit_metabase"],
  eatfit_swiggy: ["eatfit_swiggy"],
  eatfit_zomato: ["eatfit_zomato"],
  rotary_payments: ["rotary_payments"],
  rotary_settlements: ["rotary_settlements"],
  kivi_payments: ["kivi_payments"],
  kivi_settlements: ["kivi_settlements"],
};

export const eatFitData = [
  [
    {
      allOrders: "2,68,910",
      paidByUser: "7,83,00,241.00",
      commission: "2,68,910",
      govtTax: "7,83,00,241.00",
      netPayable: "2,68,910",
    },
    {
      allOrders: "2,68,910",
      paidByUser: "7,83,00,241.00",
      commission: "2,68,910",
      govtTax: "7,83,00,241.00",
      netPayable: "2,68,910",
    },
    {
      allOrders: "2,68,910",
      paidByUser: "7,83,00,241.00",
      commission: "2,68,910",
      govtTax: "7,83,00,241.00",
      netPayable: "2,68,910",
    },
    {
      allOrders: "2,68,910",
      paidByUser: "7,83,00,241.00",
      commission: "2,68,910",
      govtTax: "7,83,00,241.00",
      netPayable: "2,68,910",
    },
  ],

  {
    orders: [
      {
        id: "xxxxxxxxxxxxxxxx",
        orderStatus: "Delivered",
        date: "26 Dec 2021",
        channel: "Swiggy",
        payable: "428.79",
        commission: "20.00",
        charges: "89.62",
        taxes: "20.32",
        netReceivable: "298.75",
        status: "Reconcile",
        image:
          "https://i.pinimg.com/originals/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg",
      },
      {
        id: "xxxxxxxxxxxxxxxx",
        orderStatus: "Delivered",
        date: "26 Dec 2021",
        channel: "Swiggy",
        payable: "428.79",
        commission: "20.00",
        charges: "89.62",
        taxes: "20.32",
        netReceivable: "298.75",
        status: "Reconcile",
        image:
          "https://i.pinimg.com/originals/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg",
      },
      {
        id: "xxxxxxxxxxxxxxxx",
        orderStatus: "Delivered",
        date: "26 Dec 2021",
        channel: "Swiggy",
        payable: "428.79",
        commission: "20.00",
        charges: "89.62",
        taxes: "20.32",
        netReceivable: "298.75",
        status: "Reconcile",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVicQF1uZBZWXLVkXze-VzccneNQN6zZO4IA&usqp=CAU",
      },
      {
        id: "",
        orderStatus: "",
        date: "",
        channel: "",
        payable: "",
        commission: "",
        charges: "",
        taxes: "",
        netReceivable: "",
        status: "",
      },
      {
        id: "",
        orderStatus: "",
        date: "",
        channel: "",
        payable: "",
        commission: "",
        charges: "",
        taxes: "",
        netReceivable: "",
        status: "",
      },
      {
        id: "",
        orderStatus: "",
        date: "",
        channel: "",
        payable: "",
        commission: "",
        charges: "",
        taxes: "",
        netReceivable: "",
        status: "",
      },
      {
        id: "",
        orderStatus: "",
        date: "",
        channel: "",
        payable: "",
        commission: "",
        charges: "",
        taxes: "",
        netReceivable: "",
        status: "",
      },
      {
        id: "",
        orderStatus: "",
        date: "",
        channel: "",
        payable: "",
        commission: "",
        charges: "",
        taxes: "",
        netReceivable: "",
        status: "",
      },

      {
        id: "",
        orderStatus: "",
        date: "",
        channel: "",
        payable: "",
        commission: "",
        charges: "",
        taxes: "",
        netReceivable: "",
        status: "",
      },

      {
        id: "",
        orderStatus: "",
        date: "",
        channel: "",
        payable: "",
        commission: "",
        charges: "",
        taxes: "",
        netReceivable: "",
        status: "",
      },
      {
        id: "",
        orderStatus: "",
        date: "",
        channel: "",
        payable: "",
        commission: "",
        charges: "",
        taxes: "",
        netReceivable: "",
        status: "",
      },
    ],
  },
  {
    configuration: [
      {
        channel: "Swiggy",
        fileName: "1 Feb 2022-28 Feb 2022.pdf",
        uploadDate: "26 Dec 2021",
        status: "Reconcile",
        image:
          "https://i.pinimg.com/originals/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg",
      },
      {
        channel: "Swiggy",
        fileName: "1 Feb 2022-28 Feb 2022.pdf",
        uploadDate: "26 Dec 2021",
        status: "Reconcile",
        image:
          "https://i.pinimg.com/originals/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg",
      },
      {
        channel: "Swiggy",
        fileName: "1 Feb 2022-28 Feb 2022.pdf",
        uploadDate: "26 Dec 2021",
        status: "Reconcile",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVicQF1uZBZWXLVkXze-VzccneNQN6zZO4IA&usqp=CAU",
      },
    ],
  },
];
