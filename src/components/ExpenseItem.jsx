import React from "react";
import {
  fomratEpochToDate,
  formatCurrency,
  getAllMatchingItems,
} from "../helper";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ExpenseItem({ expense, showBudget}) {
  const fetcher = useFetcher();
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  return (
    <>
      <td className="expenseData">{expense.name}</td>
      <td className="expenseData">{formatCurrency(expense.amount)}</td>
      <td className="expenseData">{fomratEpochToDate(expense.createdAt)}</td>
      {showBudget &&(<td className="expenseData">
        
          <Link
            style={{ "--accent": budget.color }}
            to={`budget/${budget.id}`}
          >
            {budget.name}
          </Link>
      </td>)}
      <td>
        <fetcher.Form method="post">
          <input name="_action" value={"deleteExpense"} type="hidden"></input>
          <input name="expenseId" value={expense.id} type="hidden"></input>
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.id}`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
}
