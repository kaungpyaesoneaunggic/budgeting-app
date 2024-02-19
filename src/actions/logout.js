import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";
import { toast } from "react-toastify";

export async function logoutAction(){
  //delete the user
  deleteItem({
    key:'userName'
  }),
  deleteItem({
    key:'expenses'
  })
  deleteItem({
    key:'budgets'
  })
  

  toast.success('User Logged Out')

  //return redirect
  return redirect('/')
}