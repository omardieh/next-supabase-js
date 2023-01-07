import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";

export const getServerSideProps = withAuthRequired();

export default function Profile({ user }) {
  return (
    <>
      <div>Hello {user.email}</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
