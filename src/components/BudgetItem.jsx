import React from "react";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helper";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function BudgetItem({ budget, showDelete = false }) {
  const { id, name, amount, color } = budget;
  const totalSpent = calculateSpentByBudget(id);
  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h4>{name}</h4>
        <p>{formatCurrency(amount)}</p>
      </div>
      <progress max={amount} value={totalSpent}>
        {formatPercentage(totalSpent / amount)}
      </progress>
      <div className="progress-text">
        <small>{totalSpent}</small>
        <small>{formatCurrency(amount - totalSpent)}</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!confirm("This budget will be deleted")) {
                event.preventDefault();
              }
            }}
          >
            <button 
            className="btn" type="submit"><TrashIcon width={20}></TrashIcon>Delete Budget</button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <BanknotesIcon width={20} />
            <span>View Details</span>
          </Link>
        </div>
      )}
    </div>
  );
}
