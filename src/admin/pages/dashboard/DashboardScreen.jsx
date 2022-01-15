import React, { useState } from "react";
import LoginScreen from "../login/LoginScreen";

const DashboardScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return isLoggedIn ? (
    <LoginScreen />
  ) : (
    <DashboardContainer>
      {/* TODO: Dashboard with edit, modify and delete functions */}
    </DashboardContainer>
  );
};

const DashboardContainer = ({ children }) => {
  return (
    <div className="container flex mx-auto justify-center">
      <div className="w-10/12 h-full mt-10">
        <div className="w-full h-96 bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
