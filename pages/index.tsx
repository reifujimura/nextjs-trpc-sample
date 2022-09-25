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
      <div className="col">
        <input
          className="text-field"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="btn" onClick={() => add.mutate({ name })}>
          Add
        </button>
      </div>
      <div className="divider" />
      <div className="content">
        <p>
          {hello.data.map((user) => (
            <div key={user.id}>{JSON.stringify(user)}</div>
          ))}
        </p>
    </div>
  );
}
