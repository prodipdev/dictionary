// load server data form dictionary api
const loadWord = async (searchWord) => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayWord(data[0]);
  }
  catch (error) {
    console.log(error)
  }
}
// dynamic search field
document.getElementById("search-btn").addEventListener('click', () => {
  const wordBody = document.getElementById("dictionary-body");
  const inputField = document.getElementById("input-field");
      // input condition validations
  if (!inputField.value) {
    return;
  }
  loadWord(inputField.value);
  inputField.value = '';
  wordBody.innerHTML = '';
  loadingSpinner(true);   // loading data spinner
})
// display loading information
const displayWord = word => {
  const wordBody = document.getElementById("dictionary-body");
      // not found error handles
  if (!word) {
    wordBody.innerHTML = `
    <h1 class="text-center"><i class="fa-solid fa-triangle-exclamation mr-2 text-yellow-500"></i>Sorry, no results found.</h1>
    `
    loadingSpinner(false);
    return;
  }
      // set information in HTML field
  wordBody.innerHTML = `
      <div class="flex justify-between">
        <div>
          <h1 class="text-4xl font-semibold">${word.word}</h1>
          <p class="text-purple-500">${word.phonetics[1]?.text || ''}</p>
        </div>
        <div>
          <audio controls>
            <source src="${word.phonetics[1]?.audio || ''}" type="audio/mpeg">
          </audio>
        </div>
      </div>
      <p id="word-type" class="mt-8 text-xl text-gray-500 font-semibold">noun</p>
      <hr>
      <p class="mt-2 font-semibold">Definitions</p>
      <ul class="list-disc pl-10">
        <li>${word.meanings[0]?.definitions[0]?.definition || ''}</li>
      </ul>
      <p class="mt-5 text-gray-600 font-semibold">Synonyms: <span class="text-indigo-600">${word.meanings[0]?.synonyms || ''}</span></p>
      <p class="mt-5 text-gray-600 font-semibold">Antonyms: <span class="text-indigo-600">${word.meanings[0]?.antonyms || ''}</span></p>
      <p class="mt-8 text-xl text-gray-500 font-semibold">verb</p>
      <hr>
      <p class="mt-2 font-semibold">Definitions</p>
      <ul class="list-disc pl-10">
        <li>${word.meanings[1]?.definitions[0]?.definition || ''}</li>
      </ul>
      <p class="mt-5 text-gray-600 font-semibold">Synonyms: <span class="text-indigo-600">${word.meanings[1]?.synonyms || ''}</span></p>
      <p class="mt-5 text-gray-600 font-semibold">Antonyms: <span class="text-indigo-600">${word.meanings[1]?.antonyms || ''}</span></p>
      <p id="word-type" class="mt-8 text-xl text-gray-500 font-semibold">interjection</p>
      <hr>
      <p class="mt-2 font-semibold">Definitions</p>
      <ul id="definition-list" class="list-disc pl-10">
      </ul>
      <p class="mt-5 text-gray-600 font-semibold">Synonyms: <span class="text-indigo-600">${word.meanings[2]?.synonyms || ''}</span></p>
      <p class="mt-5 text-gray-600 font-semibold">Antonyms: <span class="text-indigo-600">${word.meanings[2]?.antonyms || ''}</span></p>
      <p class="mt-8 text-sm"><span class=" font-semibold">Source: </span> <a class="text-indigo-600 underline" href="${word.sourceUrls}">${word.sourceUrls}</a></p>
    `;
  const definitionList = document.getElementById('definition-list');
  const definitionItem = word.meanings[2].definitions;
  definitionItem.forEach(item => {
    const list = document.createElement('li')
    list.innerHTML = `
        <li>
        <p>${item.definition}</P>
        ${item.example ? `<p class="text-gray-600">"${item.example}"</p>` : ''}
        </li>
        `
    definitionList.appendChild(list)
  })

    loadingSpinner(false);  // loading data spinner
};
// loading spinner method
const loadingSpinner = (condition) => {
  const mainBody = document.getElementById("loading-spinner");
  if (condition === true) {
    mainBody.innerHTML = `
    <div class="flex justify-center mt-20">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-700 motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
        </div>
    </div>
    `
  } else {
      mainBody.innerHTML = '';
  }
}

loadWord("hello");