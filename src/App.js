import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
function App() {
  const languages = [
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bosnian",
    "Bulgarian",
    "Catalan",
    "Cebuano",
    "Chichewa",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Corsican",
    "Croatian",
    "Czech",
    "Danish",
    "Dari",
    "Dhivehi",
    "Dogri",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Ewe",
    "Faroese",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Frisian",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hebrew",
    "Hindi",
    "Hmong Daw",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Indonesian",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Khmer",
    "Korean",
    "Kurdish (Kurmanji)",
    "Kyrgyz",
    "Lao",
    "Latin",
    "Latvian",
    "Lingala",
    "Lithuanian",
    "Luxembourgish",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Mongolian",
    "Myanmar (Burmese)",
    "Nepali",
    "Norwegian Bokmål",
    "Norwegian Nynorsk",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Romanian",
    "Russian",
    "Samoan",
    "Scots Gaelic",
    "Serbian",
    "Sesotho sa Leboa",
    "Shona",
    "Sindhi",
    "Sinhala",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swedish",
    "Tagalog (Filipino)",
    "Tajik",
    "Tamil",
    "Telugu",
    "Thai",
    "Tibetan",
    "Tigrinya",
    "Tonga",
    "Turkish",
    "Turkmen",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu",
  ];
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <form>
          <textarea
            placeholder="Enter your text here"
            rows={5}
            id="input-txt"
          ></textarea>
          <select id="language">
            <option value="en">Select Language</option>
            {languages.map((language) => (
              <option key={language} value={language.toLowerCase()}>
                {language}
              </option>
            ))}
          </select>
          <textarea disabled rows={5} id="output-txt"></textarea>
          <button onClick={handleClick}>Translate</button>
        </form>
      </main>
      <footer>Powered By <img style={{height: '100%'}} src="https://git.amantes30.com/SVG/gemini.svg"></img></footer>
    </div>
  );
}

export default App;
async function handleClick(e) {
  e.target.disabled = true;
  e.preventDefault();
  e.target.innerHTML = "Translating...";
  e.target.classList.add("loading");
  const inputTxt = document.getElementById("input-txt");
  const language = document.getElementById("language").value;
  await Translate(inputTxt.value, language).then(() => {
    e.target.innerHTML = "Translate";
    e.target.disabled = false;
    e.target.classList.remove("loading");
  });
}
async function Translate(text, language) {
  const outputTxt = document.getElementById("output-txt");

  try {
    if (!process.env.REACT_APP_API_KEY) {
      alert("API Key not found");
      return;
    }
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Translate the following text from to ${language}: ${text} \ 
    If the text is already in French, just return the same text. Do not translate it or do not explain about it.`;
    const result = await model.generateContent(prompt);
    outputTxt.innerHTML = result.response.text();
    
  } catch (e) {
    
    alert(e);
  }
}
