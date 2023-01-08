import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { supabase } from "/lib/supabase";

export const getServerSideProps = withPageAuth({
  redirectTo: "/account",
  async getServerSideProps() {
    const { data: todos } = await supabase.from("todos").select("*");
    return {
      props: { todos },
    };
  },
});

export default function Todos({ todos }) {
  console.log(todos);

  return (
    <>
      <div>
        {todos.map((e, i) => {
          const { description, created_at, is_done, id_todo, id_user } = e;
          return <div key={i}> {JSON.stringify(e)} </div>;
        })}
      </div>
    </>
  );
}
