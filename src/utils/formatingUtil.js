import { lightFormat } from "date-fns";

export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-IN").format(number);
};

export const formatNumberEN = (number) => {
  return new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
};

export const formatCurrencyCompact = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 2,
  }).format(number);
};
export const formatCurrencyEN = (number) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "currency",
    minimumFractionDigits: 2,
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    compactDisplay: "short",
  }).format(number);
};

export const formatCurrency = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
};

export const formatDateString = (dateString) => {
  return dateString
    ? lightFormat(Date.parse(dateString), "yyyy-MM-dd HH:mm:ss")
    : "";
};
