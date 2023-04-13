import { ClerkProvider, SignedIn, SignIn } from "@clerk/clerk-react";
import { useSignIn } from "@clerk/clerk-react";

// const { isLoaded, signIn, setActive } = useSignIn();

const SignUpPage = () => (
  // <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" 
  //  redirectUrl="/todos"/>
  <>
    <SignIn redirectUrl="/todos" afterSignInUrl="/todos" afterSignUpUrl="/todos"></SignIn>
  </>
);

export default SignUpPage;