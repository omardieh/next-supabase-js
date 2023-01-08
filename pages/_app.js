import "../styles/globals.css";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import Layout from "/components/Layout";
import Header from "/components/Header";
import Footer from "/components/Footer";

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Header>Hello From Header</Header>
        <main className={"main__app"}>
          <Component {...pageProps} />
        </main>
        <Footer>Hello From Footer</Footer>
      </Layout>
    </SessionContextProvider>
  );
}

export default MyApp;
