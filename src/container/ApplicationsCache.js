import { TENANTS } from "../utils/constants";

let cache = {};

let queryConfigs = {
  // MOSAIC
  countByAllOrders: {
    fields: "count(distinct(order_id)) AS ALL_ORDERS",
    filter: {},
    timestampColumn: "posted_date",
  },

  countByPaidByUserOrder: {
    fields: "sum(principal + product_tax) AS Paid_by_Users",
    filter: {},
    timestampColumn: "posted_date",
  },

  countByCommissionAllOrder: {
    fields: "sum(negative_sum) AS Commission_AllOrder",
    filter: {},
    timestampColumn: "posted_date",
  },
  countByGovtTaxAllOrders: {
    fields: "sum(product_tax) AS Govt_Tax",
    filter: {},
    timestampColumn: "posted_date",
  },
  countByNetPayableAllOrders: {
    fields: "sum(principal + product_tax + negative_sum) AS Net_Payable",
    filter: {},
    timestampColumn: "posted_date",
  },
  countByUniwareNbdChannel: {
    fields: " count(*) AS ORDERS_IN_UNIWARE_AND_CHANNEL",
    filter: {
      present_in_uniware: true,
      present_in_channel_amazon: true,
    },
    timestampColumn: "posted_date",
  },

  countByCommissionUniwareNbdChannel: {
    fields: "sum(negative_sum) AS Commission",
    filter: { present_in_uniware: true, present_in_channel_amazon: true },
    timestampColumn: "posted_date",
  },
  countByPaidByUserUniwareAndChannel: {
    fields: "sum(principal + product_tax) AS Paid_by_Users",
    filter: {
      present_in_uniware: true,
      present_in_channel_amazon: true,
    },

    timestampColumn: "posted_date",
  },

  countByGovtTaxUniwareAndChannel: {
    fields: "sum(product_tax) AS Govt_Tax",
    filter: { present_in_uniware: true, present_in_channel_amazon: true },
    timestampColumn: "posted_date",
  },
  countByNetPayableUniwareAndChannel: {
    fields: "sum(principal + product_tax + negative_sum) AS Net_Payable",
    filter: { present_in_uniware: true, present_in_channel_amazon: true },
    timestampColumn: "posted_date",
  },
  countByChannelOnly: {
    fields: " count(distinct(order_id)) AS ORDERS_IN_CHANNEL_ONLY",
    filter: {
      present_in_uniware: false,
      present_in_channel_amazon: true,
    },
    timestampColumn: "posted_date",
  },
  countByPaidByUserChannelOnly: {
    fields: "sum(principal + product_tax) AS Paid_by_Users",
    filter: {
      present_in_uniware: false,
      present_in_channel_amazon: true,
    },
    timestampColumn: "posted_date",
  },

  countByCommissionChannelOnly: {
    fields: " sum(negative_sum) AS Commission",
    filter: {
      present_in_uniware: false,
      present_in_channel_amazon: true,
    },
    timestampColumn: "posted_date",
  },

  countByGovtTaxChannelOnly: {
    fields: "sum(product_tax) AS Govt_Tax",
    filter: { present_in_uniware: false, present_in_channel_amazon: true },
    timestampColumn: "posted_date",
  },

  countByNetPayableChannelOnly: {
    fields: " sum(principal + product_tax + negative_sum) AS Net_Payable",
    filter: { present_in_uniware: false, present_in_channel_amazon: true },
    timestampColumn: "posted_date",
  },
  countByUniwareOnly: {
    fields: " count(*) AS ORDERS_IN_UNIWARE_ONLY",
    filter: {
      present_in_uniware: true,
      present_in_channel_amazon: false,
    },
    timestampColumn: "posted_date",
  },

  countByPaidByUserUniwareOnly: {
    fields: "sum(principal + product_tax) AS Paid_by_Users",
    filter: {
      present_in_uniware: true,
      present_in_channel_amazon: false,
    },
    timestampColumn: "posted_date",
  },

  countByCommissionUniwareOnly: {
    fields: " sum(negative_sum) AS Commission",
    filter: { present_in_uniware: true, present_in_channel_amazon: false },
    timestampColumn: "posted_date",
  },
  countByGovtTaxUniwareOnly: {
    fields: "sum(product_tax) AS Govt_Tax",
    filter: { present_in_uniware: true, present_in_channel_amazon: false },
    timestampColumn: "posted_date",
  },
  countByNetPayableUniwareOnly: {
    fields: " sum(principal + product_tax + negative_sum) AS Net_Payable",
    filter: { present_in_uniware: true, present_in_channel_amazon: false },
    timestampColumn: "posted_date",
  },

  mosaicBrandDistribution: {
    fields: "item_type_brand, count(item_type_brand) as total_count",
    whereClause:
      "and item_type_brand is not null and item_type_brand not in ('', ', ', ',, ', ',,, ') group by item_type_brand order by total_count desc",
    timestampColumn: "posted_date",
  },

  mosaicProductDistribution: {
    fields: "item_type_name, count(item_type_name) as total_count",
    whereClause:
      "and item_type_name is not null and item_type_name not in ('', ', ', ',, ', ',,, ') group by item_type_name order by total_count desc limit 20",
    timestampColumn: "posted_date",
  },

  mosaicDailyOrderTrendUniware: {
    fields:
      "DATE(order_date_timestamp) as date_uniware, count(*) as daily_count",
    whereClause:
      "and present_in_uniware = true and present_in_channel_amazon = false group by date_uniware order by date_uniware",
    timestampColumn: "order_date_timestamp",
  },

  mosaicDailyOrderTrendAmazon: {
    fields: "DATE(posted_date) as date_amazon, count(*) as daily_count",
    whereClause:
      "and present_in_uniware = false and present_in_channel_amazon = true group by date_amazon order by date_amazon",
    timestampColumn: "posted_date",
  },

  mosaicDailyOrderTrend: {
    fields:
      "with amazon as (select * from (select DATE(posted_date) as date1, count(*) as amazon_count  from `kosh_dataset_mosaictesthrugg.master_recon` where present_in_uniware = false and present_in_channel_amazon = true group by DATE(posted_date))), uniware as (select DATE(order_date_timestamp) as date1, count(*) as uniware_count  from `kosh_dataset_mosaictesthrugg.master_recon` where present_in_uniware = true and present_in_channel_amazon = false group by DATE(order_date_timestamp)) select a.date1 as amazon_date, u.date1 as uniware_date, a.amazon_count, u.uniware_count from amazon as a full outer join uniware as u on a.date1 = u.date1 order by amazon_date, uniware_date",
    timestampColumn: "posted_date",
  },

  MosaicReconciliation: {
    fields: [
      "order_id",
      "sale_order_status",
      "posted_date",
      "channel_name",
      "cost_price",
      "discount",
      "total_amount",
      "product_tax",
      "total_price",
      "amount",
      "negative_sum",
      "present_in_uniware",
      "present_in_channel_amazon",
      "product_tax",
      "principal",
      "subtotal",
      "order_date_timestamp",
    ],
    filter: {},
    timestampColumn: "posted_date",
  },

  // MOSAIC_TEST
  mosaicTestCountByAllOrders: {
    fields: "count(*) AS ALL_ORDERS",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByPaidByUserOrder: {
    fields: "sum(principal + product_tax) AS Paid_by_Users",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByCommissionAllOrder: {
    fields: "sum(negative_sum) AS Commission_AllOrder",
    timestampColumn: "order_date_timestamp",
  },
  mosaicTestCountByGovtTaxAllOrders: {
    fields: "sum(product_tax) AS Govt_Tax",
    timestampColumn: "order_date_timestamp",
  },
  mosaicTestCountByNetPayableAllOrders: {
    fields: "sum(principal + product_tax + negative_sum) AS Net_Payable",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByUniwareNbdChannel: {
    fields: "count(*) AS ORDERS_IN_UNIWARE_AND_CHANNEL",
    whereClause: "and present_in_uniware = true and channel is not null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByCommissionUniwareNbdChannel: {
    fields: "sum(negative_sum) AS Commission",
    whereClause: "and present_in_uniware = true and channel is not null",
    timestampColumn: "order_date_timestamp",
  },
  mosaicTestCountByPaidByUserUniwareAndChannel: {
    fields: "sum(principal + product_tax) AS Paid_by_Users",
    whereClause: "and present_in_uniware = true and channel is not null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByGovtTaxUniwareAndChannel: {
    fields: "sum(product_tax) AS Govt_Tax",
    whereClause: "and present_in_uniware = true and channel is not null",
    timestampColumn: "order_date_timestamp",
  },
  mosaicTestCountByNetPayableUniwareAndChannel: {
    fields: "sum(principal + product_tax + negative_sum) AS Net_Payable",
    whereClause: "and present_in_uniware = true and channel is not null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByChannelOnly: {
    fields: "count(*) AS ORDERS_IN_CHANNEL_ONLY",
    whereClause: "and present_in_uniware = false and channel is not null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByPaidByUserChannelOnly: {
    fields: "sum(principal + product_tax) AS Paid_by_Users",
    whereClause: "and present_in_uniware = false and channel is not null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByCommissionChannelOnly: {
    fields: "sum(negative_sum) AS Commission",
    whereClause: "and present_in_uniware = false and channel is not null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByGovtTaxChannelOnly: {
    fields: "sum(product_tax) AS Govt_Tax",
    whereClause: "and present_in_uniware = false and channel is not null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByNetPayableChannelOnly: {
    fields: "sum(principal + product_tax + negative_sum) AS Net_Payable",
    whereClause: "and present_in_uniware = false and channel is not null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByUniwareOnly: {
    fields: "count(*) AS ORDERS_IN_UNIWARE_ONLY",
    whereClause: "and present_in_uniware = true and channel is null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByPaidByUserUniwareOnly: {
    fields: "sum(principal + product_tax) AS Paid_by_Users",
    whereClause: "and present_in_uniware = true and channel is null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestCountByCommissionUniwareOnly: {
    fields: "sum(negative_sum) AS Commission",
    whereClause: "and present_in_uniware = true and channel is null",
    timestampColumn: "order_date_timestamp",
  },
  mosaicTestCountByGovtTaxUniwareOnly: {
    fields: "sum(product_tax) AS Govt_Tax",
    whereClause: "and present_in_uniware = true and channel is null",
    timestampColumn: "order_date_timestamp",
  },
  mosaicTestCountByNetPayableUniwareOnly: {
    fields: "sum(principal + product_tax + negative_sum) AS Net_Payable",
    whereClause: "and present_in_uniware = true and channel is null",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestOrderDistribution: {
    fields: "meta_channel, count(distinct(display_order_code)) as total_count",
    whereClause: "AND 1 is not null group by meta_channel",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestBrandDistribution: {
    fields: "item_type_brand, count(item_type_brand) as total_count",
    whereClause:
      "and item_type_brand is not null and item_type_brand not in ('', ', ', ',, ', ',,, ') group by item_type_brand order by total_count desc",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestProductDistribution: {
    fields: "item_type_name, count(item_type_name) as total_count",
    whereClause:
      "and item_type_name is not null and item_type_name not in ('', ', ', ',, ', ',,, ') group by item_type_name order by total_count desc limit 20",
    timestampColumn: "order_date_timestamp",
  },

  mosaicTestDailyOrderTrend: {
    fields:
      "FORMAT_DATETIME('%d-%b', DATETIME(order_date_timestamp,'Asia/Calcutta')) AS `Date`, COUNTIF(present_in_uniware=true) AS `Metabase_FileData` , COUNTIF(channel is not null) AS `Channel_FileData`",
    filter: {},
    whereClause: "AND 1 is not null GROUP BY Date order by Date",
    timestampColumn: "order_date_timestamp",
  },

  MosaicTestReconciliation: {
    fields: [
      "order_id",
      "sale_order_status",
      "order_date_timestamp",
      "channel_name",
      "cost_price",
      "discount",
      "total_amount",
      "product_tax",
      "total_price",
      "amount",
      "negative_sum",
      "present_in_uniware",
      "product_tax",
      "principal",
      "subtotal",
      "channel",
      "recon_status",
    ],
    filter: {},
    timestampColumn: "order_date_timestamp",
  },

  // INDIFI

  countByFoundInCreadit: {
    fields: " count(*) AS FoundInCreadit",
    filter: {},
    whereClause: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
    timestampColumn: "created_at_timestamp",
  },

  countByNotFoundInCreadit: {
    fields: "  count(*) AS NotFoundInCreadit",
    filter: {},
    whereClause: "AND lower(cr_dr) = 'cr' and flag_found = FALSE",
    timestampColumn: "created_at_timestamp",
  },

  countByFoundInDebit: {
    fields: "count(distinct(transaction_id)) AS FoundInDebit",
    filter: {},
    whereClause:
      "and lower(cr_dr) = 'cr' and flag_found = TRUE and found_in_debit = TRUE",
    timestampColumn: "created_at_timestamp",
  },

  countByNotFoundInDebit: {
    fields: "count(distinct(transaction_id)) AS NotFoundInDebit",
    filter: {},
    whereClause:
      "and lower(cr_dr) = 'cr' and flag_found = TRUE and found_in_debit = FALSE",
    timestampColumn: "created_at_timestamp",
  },

  countByReconciled: {
    fields: "count(*) as Reconciled",
    filter: {},
    whereClause:
      "and abs(amount_credit - amount_debit) < 0.01 and flag_found = TRUE and found_in_debit = TRUE",
    timestampColumn: "created_at_timestamp",
  },

  countByNotReconciled: {
    fields: "count(*) as NotReconciled",
    filter: {},
    whereClause:
      "and abs(amount_credit - amount_debit) > 0.01 and flag_found = TRUE and found_in_debit = TRUE",
    timestampColumn: "created_at_timestamp",
  },

  countBySettledWithinTwoDays: {
    fields: "count(*) as SettledWithinTwoDays",
    filter: {},
    whereClause:
      "and abs(amount_credit - amount_debit) > 0.01 and flag_found = TRUE and found_in_debit = TRUE and settlement_duration <= 2",
    timestampColumn: "created_at_timestamp",
  },

  countBySettledAfterTwoDays: {
    fields: "count(*) as SettledAfterTwoDays",
    filter: {},
    whereClause:
      "and abs(amount_credit - amount_debit) > 0.01 and flag_found = TRUE and found_in_debit = TRUE and settlement_duration > 2",
    timestampColumn: "created_at_timestamp",
  },

  revenueMetricsIndifi: {
    fields:
      "sum(amount_credit) AS TotalCreditAmount,sum(amount_debit) AS TotalDebitAmount, sum(amount_credit) - sum(amount_debit) AS TotalNotInDebitAmount",
    filter: {},
    whereClause: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
    timestampColumn: "created_at_timestamp",
  },

  sumByTotalCreditAmount: {
    fields: "sum(amount_credit) AS TotalCreditAmount",
    filter: {},
    whereClause: "AND lower(cr_dr) = 'cr' and flag_found = TRUE",
    timestampColumn: "created_at_timestamp",
  },
  sumByTotalDebitAmount: {
    fields: "sum(amount_credit) AS TotalDebitAmount",
    filter: {},
    whereClause:
      "and lower(cr_dr) = 'cr' and flag_found = TRUE and found_in_debit = true",
    timestampColumn: "created_at_timestamp",
  },

  sumByTotalNotInDebitAmount: {
    fields: "sum(amount_credit) AS TotalNotInDebitAmount",
    filter: {},
    whereClause:
      "and lower(cr_dr) = 'cr' and flag_found = TRUE and found_in_debit = false",
    timestampColumn: "created_at_timestamp",
  },

  IndifiTransactionsByDate: {
    fields:
      "FORMAT_DATETIME('%d-%b', DATETIME(created_at_timestamp,'Asia/Calcutta')) AS `Date`, COUNTIF(cr_dr = 'Cr') AS `Credit` , COUNTIF(found_in_debit=true) AS `Debit`",
    filter: { flag_found: true },
    groupBy: "1",
    timestampColumn: "created_at_timestamp",
  },

  indifiSettlementDuration: {
    fields: `count(distinct(transaction_id)) as total_count , "T + 1 Day" as time`,
    whereClause:
      "and transaction_id in (select distinct(transaction_id), FROM `kosh_dataset_indifitestjuk2w.master_recon` GROUP BY transaction_id having (abs(sum(amount_credit) - sum(amount_debit)) > 0.01) and (TIMESTAMP_DIFF(max(created_at_timestamp), min(created_at_timestamp), DAY) < 2))",
    filter: { flag_found: true },
    timestampColumn: "created_at_timestamp",
  },

  indifiReconciliation: {
    fields: [
      "transaction_id",
      "utr",
      "tran_date",
      "value_date",
      "amount_credit",
      "amount_debit",
      "flag_found",
      "settlement_duration",
      "found_in_debit",
      "van",
    ],
    filter: {},
    timestampColumn: "created_at_timestamp",
  },

  countByCapturedStatus: {
    fields: " count(*) AS Captured",
    filter: { is_captured: "true" },
    displayType: "statistics",
    title: "Transaction lifecycle",
  },
  countByReceiptStatus: {
    fields: " count(*) AS ReceiptGenerated",
    filter: { is_captured: "true", is_receipt_generated: "true" },
    displayType: "statistics",
    title: "Transaction lifecycle",
  },
  countBySettlementStatus: {
    fields: "count(*) AS Settled",
    filter: {
      is_captured: "true",
      is_receipt_generated: "true",
      is_settled: "true",
    },
    displayType: "statistics",
    title: "Transaction lifecycle",
  },
  countByPaidoutStatus: {
    fields: "count(*) AS PaidOut",
    filter: {
      is_captured: "true",
      is_receipt_generated: "true",
      is_settled: "true",
      is_paid_out: "true",
    },
    displayType: "statistics",
    title: "Transaction lifecycle",
  },
  countByNotCapturedStatus: {
    fields: "count(*) AS NotCaptured",
    filter: { is_captured: "false" },
    displayType: "statistics",
    title: "Transaction lifecycle",
  },
  countByNotReceiptStatus: {
    fields: "count(*) AS ReceiptNotGenerated",
    filter: { is_captured: "true", is_receipt_generated: "false" },
    displayType: "statistics",
    title: "Transaction lifecycle",
  },
  countByNotSettlementStatus: {
    fields: "count(*) AS NotSettled",
    filter: {
      is_captured: "true",
      is_receipt_generated: "true",
      is_settled: "false",
    },
    displayType: "statistics",
    title: "Transaction lifecycle",
  },
  countByNotPaidoutStatus: {
    fields: "count(*) AS NotPaidOut",
    filter: {
      is_captured: "true",
      is_receipt_generated: "true",
      is_settled: "true",
      is_paid_out: "false",
    },
    displayType: "statistics",
    title: "Transaction lifecycle",
  },
  revenueMetrics: {
    fields:
      "sum(merc_pay_total_amount) AS TotalReceipts, sum(cust_act_mdr_excl_tax) AS TotalCommission, sum(cust_act_mdr_tax) AS TotalGst, sum(cust_act_mdr_excl_tax)+sum(cust_act_mdr_tax) AS CashFlow",
    filter: { is_captured: "true" },
    displayType: "statistics",
    title: "Revenue",
  },
  // SELECT sum(pg_pay_total_amount), sum((pg_pay_total_amount - pg_pay_fee_incl_tax - merc_pout_total_amount)) as mdr_with_tax, sum((pg_pay_total_amount - pg_pay_fee_incl_tax - merc_pout_total_amount)/(1.18)) as mdr_without_tax, sum((pg_pay_total_amount - pg_pay_fee_incl_tax - merc_pout_total_amount)*(0.18/1.18)) as tax_on_mdr FROM `kosh-ai.kosh_dataset_mygatetestu5yy3.master_recon` where is_captured=TRUE LIMIT 1000
  revenueMetricsMygate: {
    fields:
      "sum(pg_pay_total_amount) AS TotalReceipts , sum((pg_pay_total_amount - pg_pay_fee_incl_tax - merc_pout_total_amount)) as CashFlow, sum((pg_pay_total_amount - pg_pay_fee_incl_tax - merc_pout_total_amount)/(1.18)) as TotalCommission, sum((pg_pay_total_amount - pg_pay_fee_incl_tax - merc_pout_total_amount)*(0.18/1.18)) as TotalGst",
    filter: { is_captured: "true" },
    displayType: "statistics",
    title: "Revenue",
  },
  commissionByPaymentMethod: {
    fields:
      "pg_pay_method, sum(pg_act_mdr_excl_tax) as Charges, sum(cust_act_mdr_excl_tax) as Commission",
    filter: { is_captured: "true" },
    groupBy: "pg_pay_method",
    displayType: "statistics",
    title: "Revenue",
  },
  commissionByPaymentNetwork: {
    fields:
      "pg_pay_card_network, sum(pg_act_mdr_excl_tax) as Charges, sum(cust_act_mdr_excl_tax) as Commission",
    filter: { is_captured: "true" },
    groupBy: "pg_pay_card_network",
    displayType: "statistics",
    title: "Revenue",
  },
  transactionsList: {
    displayType: "datalist",
    title: "Transaction List",
  },
  countBySettlementStatusKivi: {
    fields: "count(*) AS Settled",
    filter: { is_captured: "true", is_settled: "true" },
    displayType: "statistics",
    title: "Transaction lifecycle",
  },
  countByNotSettlementStatusKivi: {
    fields: "count(*) AS NotSettled",
    filter: { is_captured: "true", is_settled: "false" },
    displayType: "statistics",
    title: "Transaction lifecycle",
  },
  revenueMetricsKivi: {
    fields:
      "sum(merc_pay_total_amount) AS TotalReceipts, sum(cust_act_mdr_excl_tax) AS TotalCommission, sum(cust_act_mdr_tax) AS TotalGst, sum(cust_act_mdr_excl_tax)+sum(cust_act_mdr_tax) AS CashFlow",
    filter: { is_captured: "true" },
    displayType: "statistics",
    title: "Revenue",
  },
  revenueMetricsBankit: {
    fields:
      "sum(pg_pay_total_amount) AS CapturedAmount, sum(cust_act_mdr_excl_tax) AS TotalCommission, sum(cust_act_mdr_tax) AS TotalGst",
    filter: { is_captured: "true" },
    displayType: "statistics",
    title: "Revenue",
  },
  closingBalanceMyGate: {
    fields: [
      "source_type",
      "amount",
      "closing_balance",
      "created_at_timestamp",
    ],
    filter: {},
    orderBy: "created_at_timestamp ASC",
    limit: 1,
    table: "nodal_recon",
    timestampColumn: "created_at_timestamp",
  },
  amountFromResidentsMygate: {
    fields: "sum(amount) AS Amount",
    filter: { source_type: "bank_transfer" },
    whereClause:
      "AND contactsname IN ('RAZORPAY SOFTWARE PRIVATE LIMITED -','RAZORPAY SOFTWARE PRIVATE LIMITED')",
    table: "nodal_recon",
    timestampColumn: "created_at_timestamp",
  },
  amountFromMygate: {
    fields: "sum(amount) AS Amount",
    filter: {
      contactsname: "VIVISH TECHNOLOGIES PRIVATE LIMITED",
      source_type: "bank_transfer",
    },
    table: "nodal_recon",
    timestampColumn: "created_at_timestamp",
  },
  reversalsMygate: {
    fields: "sum(amount) AS Amount",
    filter: {
      source_type: "reversal",
    },
    table: "nodal_recon",
    timestampColumn: "created_at_timestamp",
  },
  amountToSocietiesMygate: {
    fields: "sum(amount) AS Amount",
    filter: { source_type: "payout" },
    whereClause: "AND NOT contactsname = 'DBS current Ac Vivish Technologies'",
    table: "nodal_recon",
    timestampColumn: "created_at_timestamp",
  },
  refundsToMygate: {
    fields: "sum(amount) AS Amount",
    filter: {
      source_type: "payout",
      contactsname: "DBS current Ac Vivish Technologies",
    },
    table: "nodal_recon",
    timestampColumn: "created_at_timestamp",
  },
  accountValidationFundMygate: {
    fields: "sum(amount) AS Amount",
    filter: {
      source_type: "fund_account_validation",
    },
    table: "nodal_recon",
    timestampColumn: "created_at_timestamp",
  },
  bankitReconciliation: {
    fields: [
      "pg_pay_account_no AS Account_Number",
      "pg_pay_sys_process_timestamp AS System_Processing_Date",
      "pg_pay_transaction_eff_timestamp AS Transaction_Effective_Date",
      "pg_pay_branch_code AS Branch_Code",
      "pg_pay_desc_remaining AS Description",
      "pg_pay_rr_no_2 AS RRN_NO",
      "pg_pay_reversals AS Reversal",
      "pg_pay_debits AS Debits",
      "pg_pay_credits AS Credits",
      "pg_pay_ending_bal AS Ending_Balance",
      "complete_agent_id AS Complete_Agent_ID",
      "transaction_amount AS Transaction_Amount",
      "margin AS Margin",
      "bankit_fee AS Bankit_Fee",
      "net_amount AS Net_Amount",
      "pg_pay_status_2 AS Transaction_Status",
      "date_time AS Date",
      "particulars AS Particulars",
      "state AS State",

      // "pg_pay_rrno_excess",
      // "pg_pay_desc",
      // "pg_pay_tenant",
      // "pg_pay_sourceID",
      "pg_pay_agent_status",
      "pg_pay_api_status",
      // "pg_pay_captured",
    ],
    filter: {},
    timestampColumn: "pg_pay_transaction_eff_timestamp",
  },
  BankitCountByCapturedStatus: {
    fields: "count(*) AS Captured",
    filter: {},
    whereClause: "AND pg_pay_captured IS true",
    timestampColumn: "pg_pay_transaction_eff_timestamp",
  },
  BankitCountByNotCapturedStatus: {
    fields: "count(*) AS NotCaptured",
    filter: {},
    whereClause: "AND pg_pay_captured IS false",
    timestampColumn: "pg_pay_transaction_eff_timestamp",
  },
  BankitCountByInACStatement: {
    fields: "count(*) AS InStatement",
    filter: {},
    whereClause:
      "AND (pg_pay_api_status IS NOT null OR pg_pay_agent_status IS NOT null) AND pg_pay_captured IS true",
    timestampColumn: "pg_pay_transaction_eff_timestamp",
  },
  BankitCountByNotInACStatement: {
    fields: "count(*) AS NotInStatement",
    filter: {},
    whereClause:
      "AND (pg_pay_api_status IS  null AND pg_pay_agent_status IS null) AND pg_pay_captured IS true",
    timestampColumn: "pg_pay_transaction_eff_timestamp",
  },
  BankitCountByReconciled: {
    fields: "count(*) AS Reconciled",
    filter: {},
    whereClause:
      "AND ((LOWER(pg_pay_api_status) = LOWER(pg_pay_status_2) OR LOWER(pg_pay_agent_status) = LOWER(pg_pay_status_2)) AND pg_pay_status_2 IS NOT null) AND pg_pay_captured IS true",
    timestampColumn: "pg_pay_transaction_eff_timestamp",
  },
  BankitCountByNotReconciled: {
    fields: "count(*) AS NotReconciled",
    filter: {},
    whereClause: `AND ((pg_pay_agent_status is not null) or (pg_pay_api_status is not null)) and pg_pay_rr_no_2 not in (SELECT pg_pay_rr_no_2 FROM \`kosh-ai.kosh_dataset_${TENANTS(
      window.location.hostname.split(".")[0]
    ).replace(
      "-",
      ""
    )}.master_recon\` where (lower(pg_pay_status_2) = lower(pg_pay_agent_status) or lower(pg_pay_status_2) = lower(pg_pay_api_status)))`,
    timestampColumn: "pg_pay_transaction_eff_timestamp",
  },
  SumCapturedAmountTotalBankit: {
    fields: "sum(pg_pay_credits) AS Captured",
    filter: {},
    whereClause: "AND pg_pay_captured IS NOT false",
    timestampColumn: "pg_pay_transaction_eff_timestamp",
  },
  SumReconciledAmountTotalBankit: {
    fields: "sum(pg_pay_credits) AS Reconciled",
    filter: {},
    whereClause:
      "AND (LOWER(pg_pay_api_status) = LOWER(pg_pay_agent_status) AND LOWER(pg_pay_agent_status) = LOWER(pg_pay_status_2) AND pg_pay_status_2 IS NOT null)",
    timestampColumn: "pg_pay_transaction_eff_timestamp",
  },
  SumNotReconciledAmountTotalBankit: {
    fields: "sum(pg_pay_credits) AS NotReconciled",
    filter: {},
    whereClause:
      "AND NOT(LOWER(pg_pay_api_status) = LOWER(pg_pay_agent_status) AND LOWER(pg_pay_agent_status) = LOWER(pg_pay_status_2) AND pg_pay_status_2 IS NOT null)",
    timestampColumn: "pg_pay_transaction_eff_timestamp",
  },
  BankitTransactionsByDate: {
    fields:
      "FORMAT_DATETIME('%d-%b', DATETIME(pg_pay_sys_process_timestamp,'Asia/Calcutta')) AS `Date`, COUNTIF(pg_pay_captured = FALSE) AS `Captured` , COUNTIF(pg_pay_captured = TRUE) AS `Other`",
    filter: {},
    groupBy: "1",
    timestampColumn: "pg_pay_sys_process_timestamp",
  },
  TreeboTransactionsByRazorpay: {
    fields: "count(*) AS Transactions_Via_Razorpay",
    filter: {},
    whereClause:
      " AND transaction_type_flag = 'razorpay_transaction' AND third_party_booking_id is not null",
    timestampColumn: "transaction_date",
  },
  TreeboTransactionsByOther: {
    fields: "count(*) AS Other_Transactions",
    filter: {},
    whereClause:
      " AND transaction_type_flag = 'other_transaction'  AND third_party_booking_id is not null",
    timestampColumn: "transaction_date",
  },
  TreeboInRazorPayData: {
    fields: "count(*) AS In_Razorpay_Data",
    filter: {},
    whereClause:
      " AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction' ",
    timestampColumn: "transaction_date",
  },
  TreeboNotInRazorPayData: {
    fields: "count(*) AS Not_IN_Razorpay_Data",
    filter: {},
    whereClause:
      " AND in_razorpay_data IS false AND transaction_type_flag = 'razorpay_transaction'",
    timestampColumn: "transaction_date",
  },
  TreeboReconciled: {
    fields: "count(*) AS Reconciled",
    filter: {},
    whereClause:
      " AND is_reconciled IS true AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
    timestampColumn: "transaction_date",
  },
  TreeboNotReconciled: {
    fields: "count(*) AS Not_Reconciled",
    filter: {},
    whereClause:
      " AND is_reconciled IS false AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
    timestampColumn: "transaction_date",
  },
  TreeboReconSummary: {
    fields:
      "ROUND(SUM(total_razorpay_amount),2) as captured_amount, ROUND(SUM(CASE WHEN is_reconciled IS true THEN total_razorpay_amount ELSE 0  END),2) as reconciled_amount, ROUND(SUM(CASE WHEN is_reconciled IS false THEN total_razorpay_amount ELSE 0  END), 2) as not_reconciled_amount",
    whereClause:
      " AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
    filter: {},
    timestampColumn: "transaction_date",
  },
  TreeboTransactionsByDate: {
    fields:
      "FORMAT_DATETIME('%d-%b', DATETIME(rp_created_at,'Asia/Calcutta')) AS `Date`, COUNTIF(transaction_type_flag = 'razorpay_transaction') AS `RazorPayTransactions` , COUNTIF(transaction_type_flag = 'other_transaction') AS `OtherTransactions`",
    filter: {},
    groupBy: "1",
    orderBy: "1",
    whereClause:
      " AND in_razorpay_data IS true AND transaction_type_flag = 'razorpay_transaction'",
    timestampColumn: "transaction_date",
  },

  TreeboReconciliation: {
    fields: [
      "booking_id as BookingId",
      "third_party_booking_id as ThirdPartyBookingId",
      "transaction_date as TxnDate",
      "total_razorpay_amount as TreeboAmount",
      "rp_amount as TotalAmount",
      "FORMAT_DATETIME('%d-%m-%y', DATETIME(rp_settled_at,'Asia/Calcutta')) as SettlementDate",
      "CONCAT('T+', DATETIME_DIFF(DATETIME(rp_settled_at,'Asia/Calcutta'), DATETIME(rp_created_at,'Asia/Calcutta'), DAY)) as SettlementPeriod",
      "rp_settled as SettlementStatus",
      "is_reconciled as ReconciliationStatus",
    ],
    filter: {},
    // whereClause: " AND third_party_booking_id is not null",
    timestampColumn: "transaction_date",
  },

  EatfitCountByAllOrders: {
    fields: "count(distinct(orderid)) AS ALL_ORDERS",
    filter: {},
    timestampColumn: "createddate",
  },

  RotaryCapturedPayments: {
    fields: "count(*) AS CAPTURED",
    filter: {},
    whereClause: " AND payment_status='captured'",
    timestampColumn: "payment_created_at",
  },

  RotaryFailedPayments: {
    fields: "count(*) AS FAILED",
    filter: {},
    whereClause: " AND payment_status='failed'",
    timestampColumn: "payment_created_at",
  },

  RotarySettledPayments: {
    fields: "count(*) AS SETTLED",
    filter: {},
    whereClause: " AND payment_status='captured' and is_settled is true",
    timestampColumn: "payment_created_at",
  },

  RotaryNotSettledPayments: {
    fields: "count(*) AS NOT_SETTLED",
    filter: {},
    whereClause: " AND payment_status='captured' and is_settled is false",
    timestampColumn: "payment_created_at",
  },

  RotaryReconSummary: {
    fields:
      "ROUND(SUM(payment_amount),2) as captured_amount, ROUND(SUM(CASE WHEN is_settled IS true THEN payment_amount ELSE 0  END),2) as settled_amount, ROUND(SUM(CASE WHEN is_settled IS false THEN payment_amount ELSE 0  END), 2) as not_yet_settled_amount",
    whereClause: " AND payment_status='captured'",
    filter: {},
    timestampColumn: "payment_created_at",
  },

  RotaryGroupBySettlementPeriod: {
    fields:
      "CONCAT('T+', DATETIME_DIFF(DATETIME(settled_at,'Asia/Calcutta'), DATETIME(payment_created_at,'Asia/Calcutta'), DAY)) as SettlementPeriod, count(*) as Settlements",
    groupBy: "1",
    orderBy: "1",
    whereClause: " AND payment_status='captured' and is_settled is true",
    filter: {},
    timestampColumn: "payment_created_at",
  },

  RotaryTransactionsByDate: {
    fields:
      "FORMAT_DATETIME('%d-%b', DATETIME(payment_created_at,'Asia/Calcutta')) AS `Date`, COUNTIF(payment_status='captured') AS `CapturedPayments` , COUNTIF(payment_status='failed') AS `FailedPayments`",
    filter: {},
    groupBy: "1",
    orderBy: "1",
    timestampColumn: "payment_created_at",
  },

  RotaryReconciliation: {
    fields: [
      "payment_id as TxnId",
      "FORMAT_DATETIME('%d-%m-%y %H:%M:%S', DATETIME(payment_created_at,'Asia/Calcutta')) as TxnDate",
      "payment_amount as Amount",
      "payment_status as TxnStatus",
      "FORMAT_DATETIME('%d-%m-%y %H:%M:%S', DATETIME(settled_at,'Asia/Calcutta')) as SettlementDate",
      "is_settled as SettlementStatus",
      "CONCAT('T+', DATETIME_DIFF(DATETIME(settled_at,'Asia/Calcutta'), DATETIME(payment_created_at,'Asia/Calcutta'), DAY)) as SettlementPeriod",
      "is_reconciled as ReconciliationStatus",
      "payment_name as name",
      "payment_email as email",
      "payment_contact as contact",
      "payment_pan as pan",
      "payment_purpose as purpose",
      "payment_fee as fee",
      "payment_tax as tax",
      "fee_exclusive_tax",
      "credit",
    ],
    filter: {},
    whereClause: " AND payment_id is not null",
    timestampColumn: "payment_created_at",
  },

  RotaryReconciliationForReport: {
    fields: [
      "FORMAT_DATETIME('%d-%m-%y %H:%M:%S', DATETIME(payment_created_at,'Asia/Calcutta')) as TxnDate",
      "payment_amount as Amount",
      "credit as settled_amount",
      "FORMAT_DATETIME('%d-%m-%y %H:%M:%S', DATETIME(settled_at,'Asia/Calcutta')) as SettlementDate",
      "payment_email as email",
      "payment_contact as contact",
      "payment_pan as pan",
      "payment_purpose as purpose",
      "payment_fee as fee",
      "payment_tax as tax",
      "fee_exclusive_tax",
    ],
    filter: {},
    // whereClause: " AND payment_id is not null",
    timestampColumn: "payment_created_at",
  },

  KiviReconciliation: {
    fields: [
      "payment_id as TxnId",
      "FORMAT_DATETIME('%d-%m-%y %H:%M:%S', DATETIME(payment_created_at,'Asia/Calcutta')) as TxnDate",
      "payment_amount as Amount",
      "payment_status as TxnStatus",
      "FORMAT_DATETIME('%d-%m-%y %H:%M:%S', DATETIME(settled_at,'Asia/Calcutta')) as SettlementDate",
      "is_settled as SettlementStatus",
      "CONCAT('T+', DATETIME_DIFF(DATETIME(settled_at,'Asia/Calcutta'), DATETIME(payment_created_at,'Asia/Calcutta'), DAY)) as SettlementPeriod",
      "is_reconciled as ReconciliationStatus",
      "payment_id as id",
      "payment_amount as amount",
      "payment_currency as currency",
      "payment_status as status",
      "payment_order_id as order_id",
      "payment_invoice_id as invoice_id",
      "payment_international as international",
      "payment_amount_refunded as amount_refunded",
      "payment_amount_transferred as amount_transferred",
      "payment_refund_status as refund_status",
      "payment_captured as captured",
      "payment_description as description",
      "payment_card_id as card_id",
      "payment_card as card",
      "payment_bank as bank",
      "payment_wallet as wallet",
      "payment_vpa as vpa",
      "payment_email as email",
      "payment_contact as contact",
      "payment_fee as fee",
      "payment_tax as tax",
      "payment_error_code as error_code",
      "payment_error_description as error_description",
      "payment_created_at as created_at",
      "payment_card_type as card_type",
      "payment_card_network as card_network",
      "currency",
      "fee_exclusive_tax",
      "tax",
      "debit",
      "credit",
      "payment_method",
      "card_type",
      "issuer_name",
      "entity_created_at",
      "st_payment_captured_at",
      "payment_notes",
      "refund_notes",
      "arn",
      "entity_description",
      "order_id",
      "order_receipt",
      "order_notes",
      "dispute_id",
      "dispute_created_at",
      "dispute_reason",
      "settlement_id",
      "settled_at",
      "settlement_utr",
      "settled_by",
    ],
    filter: {},
    // whereClause: " AND payment_id is not null",
    timestampColumn: "payment_created_at",
  },
};

export function getQueryConfig(key) {
  return queryConfigs[key];
}

export function setConfigsConnectorsCache(key, value) {
  cache[key] = value;
}

export function getConfigsConnectorsCache(key) {
  return cache[key];
}

export function clearConnectorsCache() {
  cache = {};
}

export function setLoggedInUserCache(data) {
  cache["loggedInUser"] = data;
}

export function getLoggedInUserCache(data) {
  return cache["loggedInUser"];
}

export function setAddedConnectorsCache(data) {
  let addedConnectors = {};
  data.forEach((conn) => {
    addedConnectors[conn.id] = conn;
  });
  cache["addedConnectors"] = addedConnectors;
}

export function getAddedConnectorsCache() {
  return cache["addedConnectors"];
}

export function getConnectorsAsArray() {
  const availableConnectors = getAddedConnectorsCache();
  const connectors = [];
  for (const value of Object.values(availableConnectors)) {
    connectors.push(value);
  }
  return connectors;
}

export function getAddedConnectorById(connectorId) {
  let connector = getAddedConnectorsCache()[connectorId];
  return connector;
}
