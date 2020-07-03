//lets  create a single variable for this by doing this: //
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// we have to do is to create a new instance of speech recognition //
const recognition = new SpeechRecognition();

//we will take the recognition variable and set a property called interimResults and set this to true//
recognition.interimResults = true;

// we need to create a new paragraph using the document.createElement method //
let p = document.createElement("p");
p.classList.add("para");
let words = document.querySelector(".words");
words.appendChild(p);

/*Now we want a situation where by when we click on the mic element it 
starts recording and when we stop talking the mic element is disabled */

let mic = document.querySelector("#circlein");

let speechToText = "";
recognition.addEventListener("result", (e) => {
  let interimTranscript = "";
  for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
    let transcript = e.results[i][0].transcript;
    console.log(transcript);

    if (e.results[i].isFinal) {
      speechToText += transcript;
    } else {
      interimTranscript += transcript;
    }
  }

  recognition.addEventListener("soundend", () => {
    mic.style.backgroundColor = null;
  });

  document.querySelector(".para").innerHTML = speechToText + interimTranscript;
});

mic.addEventListener("click", () => {
  recognition.start();
  mic.style.backgroundColor = "#6BD6E1";
});
