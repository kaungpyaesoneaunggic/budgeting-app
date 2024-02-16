import React from "react";
import { createBudget, createExpense, fetchData, waitt } from "../helper";
import { useLoaderData } from "react-router-dom"; //router dom helper function
import { toast } from "react-toastify";

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
}

export async function dashboardAction({ request }) {
  await waitt();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "newUser") {
    const userName = values.userName;
    try {
      localStorage.setItem("userName", JSON.stringify(userName));
      return toast.success("Welcome," + userName);
    } catch (e) {
      throw new Error("There was error creating your account");
    }
  }
  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Created successfully");
    } catch {
      throw new Error("there was some issues with creating budget");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      })
      return toast.success(`Expense ${values.newExpense} created!`)
    } catch (e) {
      throw new Error("There was a problem creating your expense.")
    }
  }
}

export default function Dashboard() {
  const { userName, budgets } = useLoaderData();
  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h2>
            Welcome! ,<span  className="accent">{userName}</span>
          </h2>
          <div className="grid-sm">
            {/* {budgets ? () : ()} */}
            {budgets && budgets.length > 0 ?
            (
              <div className="grid-lg">
                <div className="flex-lg">
                <AddBudgetForm/>
                <AddExpenseForm budgets={budgets}/>
                </div>

                <h3>Existing Budget</h3>
                <div className="budgets">
                  {budgets.map((budget)=>{
                    <BudgetItem key={budget.id} budget={budget}/>
                  })}
                </div>
              </div>
            ) : (  
              <div>
                <div className="grid-lg">
                  <p>Personal Budgeting is the key to <span className="accent">Financial Freedom</span> !</p>
                <p>Create a <span className="accent">Budget</span> to get started</p>
                    <AddBudgetForm />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
}
