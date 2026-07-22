const form = document.getElementById('form') as HTMLFormElement;
const outputDiv = document.getElementById('output') as HTMLDivElement;

const showResult = async (event: SubmitEvent) =>
{
  event.preventDefault();
  // `as` is a type assertion, not renaming (unlike how it works in python imports)
  // this doesn't actually guarantee freedom from runtime errors!!!
  // always ensure this is actually an input element in the HTML.
  const inputElement = document.getElementById('user-input') as HTMLInputElement;
  if (!inputElement)
  {
    return;
  }
  const input: string = inputElement.value;
  if (!input)
  {
    return;
  }

  try
  {
    const response: Response = await fetch('api/callgemini', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();

    console.log(data);
    outputDiv.innerText = JSON.stringify(data, null, 2);
  }
  catch (error)
  {
    console.error(error);
  }
  // if (inputElement != null)
  // {
  //   // let input: string = inputElement.value;
  //   outputDiv.innerText = ;
  // }
}

form.addEventListener('submit', showResult);