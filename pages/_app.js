import "../styles/globals.css";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";

function MyApp({ Component, pageProps }) {
  return (
    <main className={"main__app"}>
      <UserProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </UserProvider>
    </main>
  );
}

export default MyApp;
