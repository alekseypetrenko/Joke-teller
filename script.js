const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const textElement = document.getElementById("text");

let textToChange = "";
let index = 0;
let tempArr = [];

function showWords() {
  let splittedText = textToChange.split(" ");
  if (index < splittedText.length) {
    tempArr = [...tempArr, splittedText[index]];
    let str = tempArr.join(" ");
    index++;
    textElement.innerText = str;
    setTimeout(showWords, 200);
  }
}

function tellMeJoke(jokeTextFromAPI) {
  VoiceRSS.speech({
    key: "643992845ee54623950be0d1a92ab839",
    src: jokeTextFromAPI,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJoke() {
  reset();
  const apiURL = "https://v2.jokeapi.dev/joke/Any";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    let jokeTextFromAPI = "";

    if (data.setup) {
      jokeTextFromAPI = `${data.setup} ... ${data.delivery}`;
    } else {
      jokeTextFromAPI = data.joke;
    }
    textToChange = jokeTextFromAPI;
    showWords();
    tellMeJoke(jokeTextFromAPI);
    toggleButton();
  } catch (error) {
    console.log(error);
  }
}

function toggleButton() {
  button.disabled = !button.disabled;
}

function reset() {
  tempArr = [];
  index = 0;
  textElement.innerHTML = "";
  textElement.hidden = false;
}

button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
