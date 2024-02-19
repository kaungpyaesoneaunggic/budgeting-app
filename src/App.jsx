import { RouterProvider, createBrowserRouter } from "react-router-dom";
//Routes
import Main, { mainLoader } from "./layouts/Main";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import { logoutAction } from "./actions/logout";

//libraries

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import deleteBudget from "./actions/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path:'/',
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error/>
      },
      {
        path:'expenses',
        element: <ExpensesPage/>,
        loader: expensesLoader,
        action:expensesAction,
        errorElement:<Error/>
      },
      {
        path:'/budget/:id',
        element: <BudgetPage/>,
        loader: budgetLoader,
        action:budgetAction,
        errorElement:<Error/>,
        children:[
          {path:'delete',
        action: deleteBudget}
        ]
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer />
    </>
  );
}

export default App;
