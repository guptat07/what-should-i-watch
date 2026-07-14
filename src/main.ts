// 1. Grab your HTML elements (with basic TS type casting)
const button = document.getElementById('my-button') as HTMLButtonElement;
const outputDiv = document.getElementById('output') as HTMLDivElement;

// 2. Add your classic event listener
button.addEventListener('click', () => {
  outputDiv.innerText = "Button clicked! This is where your API logic will go.";
  console.log("TS is connected and working perfectly!");
});