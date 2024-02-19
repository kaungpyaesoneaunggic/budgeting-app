import React from "react";
import { createExpense, deleteItem, fetchData } from "../helper";
import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { toast } from "react-toastify";

export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

export async function expensesAction({request}){
  const data = await request.formData();
  const {_action,...values}= Object.fromEntries(data);

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

export default function ExpensesPage() {
  const {expenses} = useLoaderData();
  return (
    <div className="grid-lg">
      <h2>All Expenses</h2>
      {expenses && expenses.length > 0 ? 
      (
        <div className="grid-mid">
          <h3>Recent Expenses <small className="accent">Total &#40; {expenses.length} &#41;</small></h3>
          <Table expenses={expenses}/>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
