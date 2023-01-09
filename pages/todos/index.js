import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { supabase } from "/lib/supabase";
import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import classes from "./todos.module.css";
import { useRouter } from "next/router";

export const getServerSideProps = withPageAuth({
  redirectTo: "/account",
  async getServerSideProps() {
    try {
      const { data: todos, error } = await supabase.from("todos").select("*");
      if (error) {
        throw new Error(error);
      }
      return {
        props: { todos },
      };
    } catch (error) {
      throw new Error(error);
    }
  },
});

export default function Todos({ todos }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [todoText, setTodoText] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const addTodo = async () => {
    let { data, error } = await supabase
      .from("todos")
      .insert({ description: todoText, id_user: user.id })
      .single()
      .eq("id_user", user.id);
    if (error) console.log(error);
    else refreshData();
  };

  const removeTodo = async (id_todo) => {
    let { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id_todo", id_todo);
    if (error) console.log(error);
    else refreshData();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const tableHead = ["id", "description", "is_done", "remove"];

  return (
    <div className={classes.main}>
      <form onSubmit={handleOnSubmit}>
        <h2> {user?.user_metadata?.name} Todos </h2>
        <input value={todoText} onChange={(e) => setTodoText(e.target.value)} />
        <button onClick={addTodo}>submit todo</button>
      </form>
      <table className={classes.table}>
        <thead>
          <tr>
            {tableHead.map((e, i) => (
              <th key={i}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {todos.map(({ description, is_done, id_todo }) => (
            <tr key={id_todo}>
              <td>{id_todo.toString().slice(0, -25)}</td>
              <td>{description}</td>
              <td>{is_done ? "yes" : "no"}</td>
              <td onClick={() => removeTodo(id_todo)}>x</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
