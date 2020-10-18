import { createMachine, interpret, assign } from "xstate";


const elBox = document.querySelector("#box");

const setPoint = (context, { clientX, clientY }) => {
  // Set the data-point attribute of `elBox`
  // ...
  // console.log(event);
  elBox.dataset.point = `${clientX},${clientY}`;
};

const machine = createMachine<unknown, MouseEvent>({
  initial: "idle",
  context:{
    count: 0
  }
  states: {
    idle: {
      on: {
        mousedown: {
          // Add your action here
          // ...

          target: "dragging",
          actions: (context, { clientX, clientY }) => {
            // Set the data-point attribute of `elBox`
            // ...
            // console.log(event);
            elBox.dataset.point = `${clientX},${clientY}`;
          }
        },
      },
    },
    dragging: {
      entry: assign({
          count: ({count},e)=>count+1
      }),
      on: {
        mouseup: {
          target: "idle",
        },
      },
    },
  },
});

const service = interpret(machine);

service.onTransition((state) => {
  console.log(state);

  elBox.dataset.state = state.value;
});

service.start();

elBox.addEventListener("mousedown", service.send);
elBox.addEventListener("mouseout", service.send);
elBox.addEventListener("mouseup", service.send);
