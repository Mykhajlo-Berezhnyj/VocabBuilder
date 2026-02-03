import { useEffect, useReducer, useRef, useState } from "react";
import { useForm } from "react-hook-form";

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

type FormValues = {
  name: string;
};

export function ControlledInput() {
  const [value, setValue] = useState("");

  //   useEffect(()=> {
  // // console.log("🚀 ~ ControlledInput ~ value:", value);
  //   },[value])

  const onSubmit = (data: FormValues) => {
    console.log("🚀 ~ ControlledInput ~ Submitvalue:", data);
  };

  const { register, handleSubmit, formState: {error, isValid} } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input
        type="text"
        name = "name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      /> */}
      <input {...register("userName")} />
      <button type="submit">Send</button>
    </form>
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
