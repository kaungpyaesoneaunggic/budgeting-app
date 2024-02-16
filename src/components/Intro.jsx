import React from "react";
import { Form } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import illustration from '../assets/illustration.jpg';

export default function Intro() {
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>Personal Budgeting is the secret to your Financial Freedom!</p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
            required
          />
          <input type="hidden" name="_action" value='newUser'/>
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserIcon width={20}/>
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Person with Money" width={600}/>
    </div>
  );
}
