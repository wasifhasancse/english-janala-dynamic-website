// get lesson button API data
const lessonButtonSection = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((getButton) => getButton.json())
    .then((getButtonJson) => showButton(getButtonJson.data));
};

// get clicked lesson button word data
const getWordLevel = (lessonButtonId) => {
  fetch(`https://openapi.programming-hero.com/api/level/${lessonButtonId}`)
    .then((getWordData) => getWordData.json())
    .then((getWordDataJson) => showWordData(getWordDataJson.data));
};

// show clicked lesson button word data
const showWordData = (getWordData) => {
  const wordDataCardContainer = document.getElementById("lesson-word-show");
  wordDataCardContainer.innerHTML = "";

  // show empty message
  if (getWordData.length == 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.classList =
      "col-span-full bg-base-300 py-20 w-11/12 mx-auto rounded-xl flex flex-col items-center justify-center text-center gap-5";
    emptyMessage.innerHTML = `
    
        <img class="mx-auto" src="./assets/alert-error.png" alt="alert-error">
        <p class="font-bangla text-md md:text-lg text-gray-600">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <p class="font-bangla text-xl md:text-4xl font-semibold">
          নেক্সট Lesson এ যান
        </p>`;
    wordDataCardContainer.append(emptyMessage);
    return;
  }

  // show word list
  getWordData.forEach((wordData) => {
    const wordDataCard = document.createElement("div");
    wordDataCard.classList = "bg-base-200 p-10 space-y-10 rounded-lg mx-auto";
    wordDataCard.innerHTML = `
    <div class="text-center space-y-3.5">
          <h2 class="font-bold text-3xl">${wordData.word ? wordData.word : "Word পাওয়া যায় নি"}</h2>
          <p class="font-medium text-lg">Meaning / Pronounciation</p>
          <p class="font-bangla font-semibold text-2xl text-gray-600">${wordData.meaning ? wordData.meaning : "Meaning পাওয়া যায় নি"} / ${wordData.pronunciation ? wordData.pronunciation : "Pronunciation পাওয়া যায় নি"}</p>
        </div>
        <div class="flex items-center justify-between">
          <button class="btn btn-soft btn-primary text-xl"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn btn-soft btn-primary text-xl"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    `;
    wordDataCardContainer.append(wordDataCard);
  });
};

// get lesson button container and show lesson button
const showButton = (getButtonJson) => {
  const lessenButtonContainer = document.getElementById("lessons-button");
  getButtonJson.forEach((buttonData) => {
    const createButton = document.createElement("div");
    // createButton.classList = "btn btn-outline btn-primary group";
    createButton.innerHTML = `
    <button onclick="getWordLevel(${buttonData.level_no})" class="btn btn-outline btn-primary group">
    <img class="group-hover:invert"
      src="./assets/fa-book-open.png" alt="fa-book-open"> Lesson - ${buttonData.level_no}
    </button>`;
    lessenButtonContainer.append(createButton);
  });
};
lessonButtonSection();
