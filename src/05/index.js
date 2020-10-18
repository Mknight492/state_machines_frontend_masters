import { createMachine, assign, interpret } from "xstate";

const elBox = document.querySelector("#box");
const elBody = document.body;

const machine = createMachine({
  initial: "idle",
  // Set the initial context
  context: {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    px: 0,
    py: 0,
  },
  states: {
    idle: {
      on: {
        mousedown: {
          // Assign the point
          // ...
          target: "dragging",
          actions: assign({
            px: (_c, { clientX }) => clientX,
            py: (_c, { clientY }) => clientY,
          }),
        },
      },
    },
    dragging: {
      on: {
        mousemove: {
          // Assign the delta
          // (no target!)
          actions: assign({
            dx: (_c, { clientX }) => clientX - _c.px,
            dy: (_c, { clientY }) => clientY - _c.py,
          }),
        },
        mouseup: {
          // Assign the position
          target: "idle",
          actions: assign({
            x: ({ x, dx }) => x + dx,
            y: ({ y, dy }) => y + dy,
            dx: 0,
            dy: 0,
            px: 0,
            py: 0,
          }),
        },
      },
    },
  },
});

const service = interpret(machine);

service.onTransition((state) => {
  if (state.changed) {
    console.log(state.context);

    elBox.dataset.state = state.value;

    elBox.style.setProperty("--dx", state.context.dx);
    elBox.style.setProperty("--dy", state.context.dy);
    elBox.style.setProperty("--x", state.context.x);
    elBox.style.setProperty("--y", state.context.y);
  }
});

service.start();

// Add event listeners for:
// - mousedown on elBox
// - mousemove on elBody
// - mouseup on elBody

elBox.addEventListener("mousedown", service.send);
elBody.addEventListener("mousemove", service.send);
elBody.addEventListener("mouseup", service.send);
