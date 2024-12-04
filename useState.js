// How to implemet your own useState hook in React?

let currentHook, firstHook = null;

function useState(initialValue) {
  const hook = _initializeHook(initialValue);

  const setState = (newVal) => {
    hook.state = typeof newVal === "function" ? newVal(hook.state) : newVal;
    _scheduleRender(hook.index);
  };
  return [hook.state, setState];
}

function _initializeHook(initialValue) {
  if (!currentHook) {
    currentHook = { state: initialValue, next: null, index: 1 };
    firstHook = currentHook;
  } else if (!currentHook.next) {
    currentHook.next = {
      state: initialValue,
      next: null,
      index: currentHook.index + 1,
    };
    currentHook = currentHook.next;
  }
  return currentHook;
}

function _scheduleRender(index) {
  console.log("Rendering After setState Hook Numer: ", index);
}

function _printHooks() {
  let currentHook = firstHook; // Start from the head of the list
  let index = 0;
  console.log("Current list of hooks:");
  console.log("Order is important, as it shows the order of rendering");
  while (currentHook) {
    console.log(`Hook ${index}:`, currentHook.state);
    currentHook = currentHook.next;
    index++;
  }
  console.log("--- End of hooks ---");
}

// Example usage
function MyComponent() {
  const [isActive, setIsActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [age, setAge] = useState(20);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("React");

  setIsDarkMode(true);
  setAge(21);
  setCount((prev) => prev + 1);
  setName("ReactJS");
  setIsActive(true);

  console.log("NOTE:: Hooks 'set' call order is preserved");
}

MyComponent();

// import { useState } from './useState.js';
// use the above line to use this hook in another file
export { useState };
