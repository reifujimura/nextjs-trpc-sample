import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const hello = trpc.user.list.useQuery();
  const utils = trpc.useContext();
  const add = trpc.user.add.useMutation({
    onSuccess: () => {
      utils.user.list.invalidate();
    },
  });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  const [name, setName] = useState("");
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button
        onClick={() => {
          add.mutate({ name });
          setName("");
        }}
      >
        Add
      </button>
      <div
        style={{
          width: "100vw",
          borderBottom: "2px solid black",
        }}
      />
      <p>
        {hello.data.map((user) => (
          <div key={user.id}>{JSON.stringify(user)}</div>
        ))}
      </p>
    </div>
  );
}
