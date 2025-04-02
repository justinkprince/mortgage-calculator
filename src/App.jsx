import React, { useState, useEffect } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { calculateValues, formatCurrency } from "./lib/utils";
import { useToast } from "./hooks/use-toast";

// Default values
const DEFAULT_VALUES = {
  mortgageAmount: "",
  downPaymentPercentage: 5,
  closingCostPercentage: 3,
  buyerAgentCommissionPercentage: 3,
  sellerAgentCommissionPercentage: 3,
};

function App() {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState(DEFAULT_VALUES);
  const [results, setResults] = useState([]);

  // Load values from URL params or localStorage on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const storedValues =
      JSON.parse(localStorage.getItem("mortgageCalculatorValues")) || {};

    const initialValues = { ...DEFAULT_VALUES };

    // Check URL params first
    if (urlParams.has("mortgageAmount")) {
      initialValues.mortgageAmount = urlParams.get("mortgageAmount");
    } else if (storedValues.mortgageAmount) {
      initialValues.mortgageAmount = storedValues.mortgageAmount;
    }

    if (urlParams.has("downPaymentPercentage")) {
      initialValues.downPaymentPercentage = Number(
        urlParams.get("downPaymentPercentage")
      );
    } else if (storedValues.downPaymentPercentage !== undefined) {
      initialValues.downPaymentPercentage = storedValues.downPaymentPercentage;
    }

    if (urlParams.has("closingCostPercentage")) {
      initialValues.closingCostPercentage = Number(
        urlParams.get("closingCostPercentage")
      );
    } else if (storedValues.closingCostPercentage !== undefined) {
      initialValues.closingCostPercentage = storedValues.closingCostPercentage;
    }

    if (urlParams.has("buyerAgentCommissionPercentage")) {
      initialValues.buyerAgentCommissionPercentage = Number(
        urlParams.get("buyerAgentCommissionPercentage")
      );
    } else if (storedValues.buyerAgentCommissionPercentage !== undefined) {
      initialValues.buyerAgentCommissionPercentage =
        storedValues.buyerAgentCommissionPercentage;
    }

    if (urlParams.has("sellerAgentCommissionPercentage")) {
      initialValues.sellerAgentCommissionPercentage = Number(
        urlParams.get("sellerAgentCommissionPercentage")
      );
    } else if (storedValues.sellerAgentCommissionPercentage !== undefined) {
      initialValues.sellerAgentCommissionPercentage =
        storedValues.sellerAgentCommissionPercentage;
    }

    setFormValues(initialValues);
  }, []);

  // Update results when form values change
  useEffect(() => {
    const results = calculateValues(
      formValues.mortgageAmount,
      formValues.downPaymentPercentage,
      formValues.closingCostPercentage,
      formValues.buyerAgentCommissionPercentage,
      formValues.sellerAgentCommissionPercentage
    );

    setResults(results);

    // Save to localStorage
    localStorage.setItem(
      "mortgageCalculatorValues",
      JSON.stringify(formValues)
    );

    // Update URL if values differ from defaults (but only if we have a mortgage amount)
    if (formValues.mortgageAmount) {
      const params = new URLSearchParams();

      // Only add params that differ from defaults
      if (formValues.mortgageAmount !== DEFAULT_VALUES.mortgageAmount) {
        params.set("mortgageAmount", formValues.mortgageAmount);
      }

      if (
        formValues.downPaymentPercentage !==
        DEFAULT_VALUES.downPaymentPercentage
      ) {
        params.set("downPaymentPercentage", formValues.downPaymentPercentage);
      }

      if (
        formValues.closingCostPercentage !==
        DEFAULT_VALUES.closingCostPercentage
      ) {
        params.set("closingCostPercentage", formValues.closingCostPercentage);
      }

      if (
        formValues.buyerAgentCommissionPercentage !==
        DEFAULT_VALUES.buyerAgentCommissionPercentage
      ) {
        params.set(
          "buyerAgentCommissionPercentage",
          formValues.buyerAgentCommissionPercentage
        );
      }

      if (
        formValues.sellerAgentCommissionPercentage !==
        DEFAULT_VALUES.sellerAgentCommissionPercentage
      ) {
        params.set(
          "sellerAgentCommissionPercentage",
          formValues.sellerAgentCommissionPercentage
        );
      }

      const search = params.toString();
      const newUrl = `${window.location.pathname}${search ? `?${search}` : ""}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [formValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "mortgageAmount" ? value : Number(value),
    }));
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast({
          title: "URL Copied!",
          description: "The calculator URL has been copied to your clipboard.",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error("Could not copy URL: ", err);
        toast({
          title: "Error",
          description: "Failed to copy URL to clipboard.",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Mortgage Calculator
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="mortgageAmount" className="block mb-2">
                  Mortgage Amount ($)
                </Label>
                <Input
                  id="mortgageAmount"
                  name="mortgageAmount"
                  type="number"
                  placeholder="Enter mortgage amount"
                  value={formValues.mortgageAmount}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="downPaymentPercentage" className="block mb-2">
                  Down Payment (%)
                </Label>
                <Input
                  id="downPaymentPercentage"
                  name="downPaymentPercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formValues.downPaymentPercentage}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="closingCostPercentage" className="block mb-2">
                  Closing Cost (%)
                </Label>
                <Input
                  id="closingCostPercentage"
                  name="closingCostPercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formValues.closingCostPercentage}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label
                  htmlFor="buyerAgentCommissionPercentage"
                  className="block mb-2"
                >
                  Buyer's Agent Commission (%)
                </Label>
                <Input
                  id="buyerAgentCommissionPercentage"
                  name="buyerAgentCommissionPercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formValues.buyerAgentCommissionPercentage}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label
                  htmlFor="sellerAgentCommissionPercentage"
                  className="block mb-2"
                >
                  Seller's Agent Commission (%)
                </Label>
                <Input
                  id="sellerAgentCommissionPercentage"
                  name="sellerAgentCommissionPercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formValues.sellerAgentCommissionPercentage}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <Button onClick={handleShare} className="w-full md:w-auto">
                  Share Calculator
                </Button>
              </div>
            </div>

            {results.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Results</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Mortgage Amount
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Down Payment
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Closing Costs
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Buyer's Agent
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Seller's Agent
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result, index) => (
                        <tr
                          key={index}
                          className={result.isCurrentAmount ? "bg-blue-50" : ""}
                        >
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(result.mortgageAmount)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(result.downPayment)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(result.closingCost)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(result.buyerAgentCommission)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(result.sellerAgentCommission)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(result.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Mortgage Calculator. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
