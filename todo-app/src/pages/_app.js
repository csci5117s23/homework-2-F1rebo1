import '@/styles/globals.css'
import {useState, useEffect} from 'react'
import '../styles/App.css';
import '../styles/todo.css';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true)
  }, [])
  return load && (
    <>
      <ClerkProvider {...pageProps} >
        {/* <head>
            <meta charSet="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <title>Hello Bulma!</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
        </head> */}
        <div>
            <meta charSet="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <title>Productivity Corner</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
        </div>
        <div className="App">
          <header className="App-header">
            <Component {...pageProps}></Component>
          </header>
        </div>
      </ClerkProvider>
    </>
  );
}