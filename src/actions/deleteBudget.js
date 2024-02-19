import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helper";
import { redirect } from "react-router-dom";

export default function deleteBudget({params}) {
  try{
    deleteItem({
      key:'budgets',
      id:params.id,
    })
    const connectedExpenses = getAllMatchingItems({
      category:'expenses',
      key:'budgetId',
      value:params.id
    })
    connectedExpenses.forEach(element => {
      deleteItem(
        {
          key:'expenses',
          id:element.id,
        }
      )
    });
    toast.success('Budget deleted Successfully');
  }catch(e){
    throw new Error('There was an error deleting the Budget Category');
  }
  return redirect('/')
}
