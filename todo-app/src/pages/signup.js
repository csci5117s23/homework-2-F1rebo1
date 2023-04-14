import { ClerkProvider, SignedIn, SignIn } from "@clerk/clerk-react";
import { useSignIn } from "@clerk/clerk-react";

// const { isLoaded, signIn, setActive } = useSignIn();

const SignUpPage = () => (
  <>
    <SignIn redirectUrl="/todos" afterSignInUrl="/todos" afterSignUpUrl="/todos"></SignIn>
  </>
);

export default SignUpPage;