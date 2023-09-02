import axios from "axios";
import { useState } from "react";

const options = {
  method: "POST",
  url: "https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "aba137c49amsh32dde91dcb0393ep111d24jsnfca9fbf37732",
    "X-RapidAPI-Host":
      "plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com",
  },
  data: {
    text: "This is a test with a minimum of 40 characters to check plagiarism for.",
    language: "bn",
    includeCitations: false,
    scrapeSources: false,
  },
};

export default function Home() {
  let [value, setValue] = useState("");
  let [sources, setSources] = useState(null);
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      options.data.text = value;
      let res = await axios.request(options);
      setSources(res.data.sources);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Bangla Article plagiarism and Citation checker
        </h1>

        <textarea
          className="w-full p-2 border rounded mb-2 h-32 resize-y focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={value}
          onChange={handleInput}
          placeholder="Enter your text here..."
          rows={5}
        />

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full shadow-md transition duration-300 ease-in-out"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {sources &&
          sources.map((s, i) => (
            <div key={i} className="mt-4 bg-gray-100 p-4 rounded">
              <p>
                Source Url:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={s.url}
                  className="text-blue-600 hover:underline"
                >
                  Click here
                </a>
              </p>
              {s?.matches.map((m, j) => (
                <div key={j} className="mt-2">
                  <p>Match Text: {m.matchText}</p>
                  <p>Similarity: {m.score}%</p>
                </div>
              ))}
            </div>
          ))}
      </div>
    </main>
  );
}
