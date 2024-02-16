import React from 'react'

export default function BudgetItem({budget}) {
  const {id,name, amount,color}=budget;
  return (
    <div className='budget'>
      <div className='progress-text'>
        <h4>
          {name}
        </h4>
        <p>{amount} Used</p>
      </div>
    </div>
  )
}
