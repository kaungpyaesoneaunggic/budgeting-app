import React from 'react'
//assets
import logoMark from '../assets/logomark.svg'
import { Form, NavLink } from 'react-router-dom'
import {TrashIcon} from '@heroicons/react/24/solid'

export default function Nav({userName}) {
  return (
    <div>
      <nav>
        <NavLink
        to='/'
        aria-label='Go to Home'
        >
        <img src={logoMark} alt='' height={30}/>
        <span>Home Budget</span>
        </NavLink>
        {userName &&(
          <Form
          method='post'
          action='/logout'
          onSubmit={(event)=>{
            if(!confirm("Delete All user data?")){
              event.preventDefault()
            }
          }}
          >
            <button type='submit' className='btn btn--warning'>
              <span>Delete User</span>
              <TrashIcon width={20}/>
            </button>
          </Form>
        )}
      </nav>
    </div>
  )
}
