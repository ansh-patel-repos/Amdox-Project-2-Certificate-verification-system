import { SignIn } from "@clerk/clerk-react";

export const Login = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-center p-4">
        <SignIn/>
    </div>
  );
};