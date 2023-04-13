import { ClerkProvider, SignedIn, SignIn } from "@clerk/clerk-react";

const SignUpPage = () => (
  // <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" 
  //  redirectUrl="/todos"/>
  <SignIn redirectUrl="/todos"/>
);

export default SignUpPage;