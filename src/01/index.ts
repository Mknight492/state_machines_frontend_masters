import { stat } from "fs";

const elBox = document.querySelector("#box");

// Pure function that returns the next state,
// given the current state and sent event
function transition(state, event) {
  switch (state) {
    // Add your state/event transitions here
    // to determine and return the next state
    case "idle":
      switch (event) {
        case "CLICK":
          return "active";
      }
    case "active":
      switch (event) {
        case "CLICK":
          return "idle";
      }
    default:
      return state;
  }
}

function transition2(state, event) {
  var sm = {
    idle: {
      on: {
        CLICK: "active",
      },
    },
    active: {
      on: {
        CLICK: "idle",
      },
    },
  };

  return sm[state]?.on[event] ?? state;
}

// Keep track of your current state
let currentState = "idle";

function send(event) {
  // Determine the next value of `currentState`
  currentState = transition2(currentState, event);

  console.log(currentState);

  elBox.dataset.state = currentState;
}

elBox.addEventListener("click", () => {
  // send a click event
  send("CLICK");
});
