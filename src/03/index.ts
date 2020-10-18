import { createMachine, interpret } from "xstate";

const elBox = document.querySelector("#box");

const machine = createMachine({
  // Create your state machine here
  // ...
  initial: "inactive",
  states: {
    inactive: {
      on: {
        mousedown: "active",
      },
    },
    active: {
      on: {
        mouseout: "inactive",
        mouseup: "inactive",
      },
    },
  },
});

// Create a service using interpret(...)
const service = interpret(machine);
// Listen to state transitions and set
// `elBox.dataset.state` to the state value as before.
// ...
service.onTransition((state) => {
  if (state.value === "Test") {
  }
  elBox.dataset.state = state.value;
});

service.start();
// Start the service.
// ...

elBox.addEventListener("mousedown", service.send);

elBox.addEventListener("mouseout", service.send);

elBox.addEventListener("mouseup", service.send);
