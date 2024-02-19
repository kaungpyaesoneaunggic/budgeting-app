import React from 'react'
import Expenseitem from './ExpenseItem'

export default function Table({expenses, showBudget=true}) {
  return (
    <div className='table'>
      <table>
        <thead>
          <tr className='expenseHeader'>
            {['Name','Amount','Date',showBudget?'Budget':''].map((i,index)=>(
              <th key={index}>{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense)=>(
            <tr key={expense.id}>
              <Expenseitem expense={expense} showBudget={showBudget}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
