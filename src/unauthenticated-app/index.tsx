import React, { useState } from "react";
import { RegisterScreen } from "unauthenticated-app/register";
import { LoginScreen } from "unauthenticated-app/login";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  console.log(1);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        Jump To {isRegister ? "Login" : "Register"}
      </button>
    </div>
  );
};
