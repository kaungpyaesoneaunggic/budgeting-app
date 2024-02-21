import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import { Form, useFetcher, useLoaderData, useSubmit } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddBudgetForm() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const [budgetName, setBudgetName] = useState("");

  const formRef = useRef();
  const focusRef = useRef();
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  //call budget data
  const { budgets } = useLoaderData();

  // Budget same name checker
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (budgets.map((budget) => budget.name).includes(budgetName)) {
      console.log(budgets)
      console.log(budgetName)
      toast.error("Budget with the same name already exists!");
      return;
    }
    try {
      await fetcher.submit(event.target, { method: "post" })
    } catch (error) {
      toast.error("Error submitting form.");
      console.log("Error submitting form:", error);
    }
  };
  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form
        method="post"
        onSubmit={handleSubmit}
        className="grid-sm"
        ref={formRef}
      >
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g - Groceries.."
            ref={focusRef}
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            required
          />
          <input type="hidden" name="_action" value="createBudget" />
          <div className="grid-xs">
            <label htmlFor="newBudgetAmount">Amount</label>
            <input //spinner is disabled in css
              type="number"
              step="0.01"
              name="newBudgetAmount"
              id="newBudgetAmount"
              placeholder="e.g - $3.04"
              inputMode="decimal"
              min="0"
              required
            />
          </div>

          <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
            <span>Create Budget</span>
            <CurrencyDollarIcon width={20} />
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
