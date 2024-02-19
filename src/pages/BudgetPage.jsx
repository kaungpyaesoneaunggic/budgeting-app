import React from "react";
import { createExpense, deleteItem, getAllMatchingItems } from "../helper";
import { useLoaderData } from "react-router-dom";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import BudgetItem from "../components/BudgetItem";
import { toast } from "react-toastify";

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  if (!budget) {
    throw new Error("The Budget does not found");
  }

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });
  return { budget, expenses };
}

export async function budgetAction({request}){
  const data = await request.formData();
  const {_action,...values}= Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key:'expenses',
        id: values.expenseId,
      });
      return toast.success(`Expense Deleted!`);
    } catch (e) {
      throw new Error("There was a problem deleting your expense :((");
    }
  } 
}

export default function BudgetPage() {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg" style={{ '--accent':budget.color }}>
      <h1 className="h2">
        <div className="flex-lg">
          <BudgetItem budget={budget} showDelete={true}></BudgetItem>
          <AddExpenseForm budgets={[budget]} />
        </div>
        <br></br>
        {expenses && expenses.length > 0 && (
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.name}</span>
              &nbsp;Expenses
            </h2>
            <Table expenses={expenses} showBudget={false}/>
          </div>
        )}
      </h1>
    </div>
  );
}
