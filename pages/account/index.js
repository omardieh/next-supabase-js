import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { UserInfoCard } from "/components/User/UserInfoCard/";
import classes from "./account.module.css";

export default function Account() {
  const session = useSession();
  const supabase = useSupabaseClient();

  if (!session) {
    return (
      <section className={classes.section}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          theme="dark"
        />
      </section>
    );
  }

  const {
    user: {
      user_metadata: { name, email, email_verified, picture },
    },
  } = session;

  return (
    <>
      <UserInfoCard
        name={name}
        email={email}
        email_verified={email_verified}
        picture={picture}
      >
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      </UserInfoCard>
    </>
  );
}
