import { useReducer } from "react";

type State = {
  name: string;
  email: string;
  password: string;
};

type Action =
  | { type: "set_name"; payload: string }
  | { type: "set_email"; payload: string }
  | { type: "set_password"; payload: string }
  | { type: "reset" };

const initialState = {
  name: "",
  email: "",
  password: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set_name":
      return { ...state, name: action.payload };
    case "set_email":
      return { ...state, email: action.payload };
    case "set_password":
      return { ...state, password: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export function FormTest() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "set_name", payload: e.target.value })
        }
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={state.email}
        onChange={(e) =>
          dispatch({ type: "set_email", payload: e.target.value })
        }
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={state.password}
        placeholder="Password"
        onChange={(e) =>
          dispatch({ type: "set_password", payload: e.target.value })
        }
      />
      <button
        onClick={() => {
          dispatch({ type: "reset" });
        }}
      >
        Reset
      </button>
    </div>
  );
}
