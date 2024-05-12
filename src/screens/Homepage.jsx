import React, { useEffect } from "react";
import styles from "../styles/Homepage.module.scss";
import Signin from '../components/Auth/Signin'
import Signup from '../components/Auth/Signup'
import { useAuth } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Homepage() {

  const { user } = useAuth()

  if (user?.id) { 
    return <Navigate to={'/home'}></Navigate>
  }

  return (
    <div className={styles.base}>
      <div className={styles.forms}>
        <div>
          <p>login</p>
          <Signin />
        </div>
        <div>
          <p>register</p>
          <Signup />
        </div>
      </div>
    </div>
  );
}
