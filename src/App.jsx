import "./styles.css";
import { useReducer, useState } from "react";
import data from "./data";
import UsersComponent from "./users";
// import { Button, TextField } from "@mui/material";

/** Instructions
   0. Fork this codesandbox and sync it with your github 
   1. import users data from data.ts
   1.1. Utilize TypeScript in your implementation
   2. On load:
   2.1. Filter the users data array to only include users where age >= 18
   2.2. Map the users data array to only include username, address, age and companyName
   2.3. Add a new ID to each user object, which should consist of a randomized sequence (6 characters) of the following: {ABCDEF123456}
   2.4. Sort the array (asc) by age, then by companyName
   2.5. Dispatch the data to the local users state
   3. Display the users' properties using a loop in the tsx, preferably in a styled "Card" form
   3.1. Add a "remove" button to each card - this should remove the user from the state
   3.2. Store the removed users in a new state instance
   3.3. Using the second input, add a method to search for a user's username with the onChange event
   3.4. The removed users should also be found if the input is being used to search for a username
   3.5. In the case where a removed user is shown during a search, there should be a "restore" button, which would insert the removed user back into the users array
   4. Extend the reducer:
   4.1. Count must always be >= 0, in all cases
   4.2. Add a case to increment count with a random number, between 1 and 10
   4.3. Add a case to increment to the nearest odd number, if already odd - increment to next odd
   4.4. Add a case to decrease the count by the input of the first textfield
   4.5. Add a case to reset the count
   4.6. Add buttons to said cases
   4.7. Add styling using MUI
   5. Provide the link to your forked repo with your answers
   */
// Initial state for the reducer
const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      // Ensure count doesn't go below 0
      return { count: Math.max(0, state.count - 1) };
    case "reset":
      return { count: 0 };
    case "increment_random":
      // Increment by a random number between 1 and 10
      const randomIncrement = Math.floor(Math.random() * 10) + 1;
      return { count: state.count + randomIncrement };
    case "increment_to_next_odd":
      // Increment to next odd number
      if (state.count % 2 === 0) {
        return { count: state.count + 1 }; // If even, increment by 1 to make it odd
      } else {
        return { count: state.count + 2 }; // If odd, increment by 2 to get the next odd number
      }
    case "decrease_by_input":
      const decreaseValue = action.payload;
      // Ensure count doesn't go below 0 after decrease
      return { count: Math.max(0, state.count - decreaseValue) };
    default:
      return countState;
  }
}

export default function App() {
  // const [users] = useState([]);
  // const [numberInput] = useState(0);
  // const [text] = useState("");
  const [countState, dispatch] = useReducer(reducer, initialState);
  const [decreaseInput, setDecreaseInput] = useState("");
  // Handle input change for the decrease value
  const handleInputChange = (e) => {
    setDecreaseInput(e.target.value);
  };

  // Handle decreasing by the input value
  const handleDecrease = () => {
    const decreaseValue = parseInt(decreaseInput, 10);
    if (!isNaN(decreaseValue) && decreaseValue >= 0) {
      dispatch({ type: "decrease_by_input", payload: decreaseValue });
    } else {
      alert("Please enter a valid number greater than or equal to 0.");
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Count: {countState.count}</h1>

        {/* <TextField
        className=""
        defaultValue={numberInput}
        type="number"
        style={{ display: "block" }}
      /> */}

        {/* Input field for decreasing count */}
        <div style={{ marginBottom: 0, marginBottom: 30 }}>
          <input
            type="number"
            value={decreaseInput}
            onChange={handleInputChange}
            placeholder="Enter number to decrease"
          />
          <button onClick={handleDecrease}>Decrease by Input</button>
        </div>
        <button onClick={() => dispatch({ type: "increment" })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "decrement" })}>
          Decrement
        </button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <button onClick={() => dispatch({ type: "increment_random" })}>
          Increment by Random
        </button>
        <button onClick={() => dispatch({ type: "increment_to_next_odd" })}>
          Increment to Next Odd
        </button>

        <h4 style={{ marginBottom: 0, marginTop: 30 }}>Search for a user</h4>

        {/* <TextField
        defaultValue={text}
        style={{ display: "block", margin: "auto" }}
      /> */}

        <UsersComponent />
      </div>
    </div>
  );
}
