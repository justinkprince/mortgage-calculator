import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value) {
  if (value === undefined || value === null) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const valueBounds = {
  min: -3,
  max: 6,
};

export function calculateValues(
  mortgageAmount,
  downPaymentPercentage,
  closingCostPercentage,
  buyerAgentCommissionPercentage,
  sellerAgentCommissionPercentage
) {
  if (!mortgageAmount || isNaN(mortgageAmount) || mortgageAmount <= 0) {
    return [];
  }

  const baseAmount = parseFloat(mortgageAmount);
  const results = [];

  // Generate 11 values from baseAmount to baseAmount + 100k in 10k increments
  for (let i = valueBounds.min; i <= valueBounds.max; i++) {
    const currentAmount = baseAmount + i * 10000;
    const downPayment = currentAmount * (downPaymentPercentage / 100);
    const closingCost = currentAmount * (closingCostPercentage / 100);
    const buyerAgentCommission =
      currentAmount * (buyerAgentCommissionPercentage / 100);
    const sellerAgentCommission =
      currentAmount * (sellerAgentCommissionPercentage / 100);
    const total =
      downPayment + closingCost + buyerAgentCommission + sellerAgentCommission;

    results.push({
      isCurrentAmount: currentAmount === Number(mortgageAmount),
      mortgageAmount: currentAmount,
      downPayment,
      closingCost,
      buyerAgentCommission,
      sellerAgentCommission,
      total,
    });
  }

  return results;
}
