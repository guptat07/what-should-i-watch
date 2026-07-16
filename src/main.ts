const form = document.getElementById('form') as HTMLFormElement;
const outputDiv = document.getElementById('output') as HTMLDivElement;


const showResult = (event: SubmitEvent) =>
{
  // `as` is a type assertion, not renaming (unlike how it works in python imports)
  // this doesn't actually guarantee freedom from runtime errors!!!
  // always ensure this is actually an input element in the HTML.
  const inputElement = document.getElementById('user-input') as HTMLInputElement;
  if (inputElement != null)
  {
    let input: string = inputElement.value;
    outputDiv.innerText = input;
  }

  event.preventDefault();
}

form.addEventListener('submit', showResult);