import { useEffect, useReducer, useRef, useState } from "react";

export function InputUncontroled() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputEl = inputRef.current;
    const handler = () => {
      console.log("🚀 ~ inputRef.current.value:", inputRef.current.value);
    };
    inputEl?.addEventListener("input", handler);

    return () => {
      inputEl?.removeEventListener("input", handler);
    };
  }, []);

  const handleSubmit = () => {
    alert(inputRef.current?.value);
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Відправити</button>
    </div>
  );
}

export function ControlledInput() {
  const [value, setValue] = useState("");
  console.log("🚀 ~ ControlledInput ~ value:", value);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

type State = {
  count: number;
};

type Action = { type: "increment" } | { type: "decrement" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
