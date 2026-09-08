const form = document.getElementById('form') as HTMLFormElement;
const outputDiv = document.getElementById('output-container') as HTMLDivElement;

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
    const response: Response = await fetch('api/callApi', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();

    // Turn Data into styled results
    // outputDiv will hold 10 movieDivs
    // a movieDiv will hold a posterDiv and a movieInfoDiv (flex row)
    // a movieInfoDiv will hold a title, year, and overview (flex col)
    outputDiv.replaceChildren();
    for (const movie of data) {
      const movieDiv: HTMLDivElement = document.createElement("div");
      movieDiv.classList.add("movie-container");

      const posterDiv: HTMLDivElement = document.createElement("div");
      posterDiv.classList.add("poster-container");

      const poster: HTMLImageElement = document.createElement("img");
      poster.classList.add("poster");
      poster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      poster.alt = `Poster of ${movie.title}`;
      poster.loading = 'lazy';
      posterDiv.appendChild(poster);

      movieDiv.appendChild(posterDiv);

      const movieInfoDiv: HTMLDivElement = document.createElement("div");
      movieInfoDiv.classList.add("movie-info-container");

      const title: HTMLHeadingElement = document.createElement("h2");
      title.classList.add("movie-info-header");
      title.innerText = `${movie.title.toUpperCase()}`;

      const year: HTMLHeadingElement = document.createElement("h2");
      year.classList.add("movie-info-header");
      year.innerText = `${movie.release_date.slice(0, 4)}`;

      const overview: HTMLParagraphElement = document.createElement("p");
      overview.classList.add("movie-info-overview");
      overview.innerText = `${movie.overview}`;

      movieInfoDiv.appendChild(title);
      movieInfoDiv.appendChild(year);
      movieInfoDiv.appendChild(overview);
      movieDiv.appendChild(movieInfoDiv);

      outputDiv.appendChild(movieDiv);
    }

    // console.log(data);
    // outputDiv.innerText = JSON.stringify(data, null, 2);
  }
  catch (error)
  {
    console.error(error);
  }
}

form.addEventListener('submit', showResult);