import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GOOGLE_CLIENT_ID, BACKEND_URL } from "../config";

const saveUserToLocalStorage = (user) => {
  localStorage.setItem("googleUser", JSON.stringify(user));
};

const GoogleAuth = ({ callbackAuthentication }) => {
  const handleSuccess = async (response) => {
    const userObject = jwtDecode(response.credential);
    console.log("User info:", userObject);
    saveUserToLocalStorage(userObject);
    callbackAuthentication(userObject);
    try {
      await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
      });
    } catch (error) {
      console.error("Failed to send user data to backend:", error);
    }
  };

  const handleFailure = (error) => {
    console.log("Google Sign-In failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex justify-center mt-4">
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
