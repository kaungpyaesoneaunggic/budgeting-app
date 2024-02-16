import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";

//heroicons
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log("There was error", error);
  return (
    <div className="error">
      <h2>
        We got <span style={{ color: "red" }}>ERROR</span>
      </h2>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
