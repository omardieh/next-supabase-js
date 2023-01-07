import { useUser } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useEffect, useState } from "react";
import { Auth, Typography, Button } from "@supabase/ui";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";

const LoginPage = () => {
  const { user, error } = useUser();
  const [data, setData] = useState({});

  console.log(user);
  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("test").select("*");
      console.log(data, "data");
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  if (!user)
    return (
      <>
        {error && <p>{error.message}</p>}
        <Auth
          // view="update_password"
          supabaseClient={supabaseClient}
          providers={["google"]}
        />
      </>
    );

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default LoginPage;
