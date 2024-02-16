import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";

export default function AddBudgetForm() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();
  useEffect(()=>{
    if(!isSubmitting){
      formRef.current.reset();
      focusRef.current.focus();
    }
  },[isSubmitting])
  return (
    <div className="form-wrapper">
      <h3 className="h3">Create budget</h3>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g - Groceries.."
            ref={focusRef}
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
            />
          </div>

          <button className="btn btn--dark" disabled={isSubmitting}>
            <span>Create Budget</span>
            <CurrencyDollarIcon width={20} />
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
