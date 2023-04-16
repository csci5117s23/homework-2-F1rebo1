import '@/styles/globals.css'
import {useState, useEffect} from 'react'
import '../styles/App.css';
import '../styles/todo.css';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { Client } from "@clerk/clerk-sdk-node";

const CLERK_API_BASE_URL = process.env.API_ENDPOINT;
const CLERK_API_KEY = process.env.API_KEY;

const clerk = new Client({
  apiKey: CLERK_API_KEY,
  apiBaseUrl: CLERK_API_BASE_URL,
});

const pubkey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App({ Component, pageProps }) {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true)
  }, [])

  // useEffect(()=>{
  //   // Call Codehooks backend API
  //   const fetchData = async () => {
  //     const response = await fetch(`https://${API_ENDPOINT}/test`, {
  //       method: "GET",
  //       headers: { "x-apikey": API_KEY }
  //     });
  //     const data = await response.json();
  //     // Change application state and reload
  //     setMessage(data.message);
  //     setVisits(data.visits);
  //     setLoad(true)
  //   }
  //   fetchData();
  // },[])

  return load && (
    <>
      <ClerkProvider {...pageProps}>
        <div>
            <meta charSet="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <title>Productivity Corner</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
        </div>
        <div className="App">
          {/* <header className="App-header">
            <Component {...pageProps}></Component>
          </header> */}
          <Component {...pageProps} clerk={clerk}></Component>
        </div>
      </ClerkProvider>
    </>
  );
}