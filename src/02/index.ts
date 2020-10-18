import { createMachine, interpret } from "xstate";

const elBox = document.querySelector("#box");

const machine = createMachine({
  // Add your object machine definition here
  initial: "idle",
  states: {
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
  },
});

const service = interpret(machine);

service.start();
// Change this to the initial state
// let currentState = undefined;

function send(event) {
  // Determine and update the `currentState`
  var s = service.send("CLICK");
  elBox.dataset.state = "";
}

elBox.addEventListener("click", () => {
  // Send a click event
});
