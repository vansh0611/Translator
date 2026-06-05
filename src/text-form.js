import React, { useState, useEffect } from "react";
import translate from "translate";

export default function TextForm(props) {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("hi");

  useEffect(() => {
    if (inputText.trim() !== "") {
      translateText();
    }
  }, [inputText, fromLanguage, toLanguage]);

  const translateText = async () => {
    try {
      const result = await translate(inputText, {
        from: fromLanguage,
        to: toLanguage,
      });

      setTranslatedText(result || "");
    } catch (error) {
      console.log(error);
      alert("Translation Error");
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang =
      fromLanguage === "hi"
        ? "hi-IN"
        : fromLanguage === "gu"
          ? "gu-IN"
          : fromLanguage === "mr"
            ? "mr-IN"
            : fromLanguage === "fr"
              ? "fr-FR"
              : fromLanguage === "es"
                ? "es-ES"
                : "en-US";

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setInputText((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.onerror = (event) => {
      console.log(event.error);
      alert("Mic Error");
    };

    recognition.start();
  };

  const clearText = () => {
    setInputText("");
    setTranslatedText("");
  };

  const copyText = () => {
    navigator.clipboard.writeText(translatedText);
    alert("Copied Successfully");
  };

  const upperText = () => {
    setInputText(inputText.toUpperCase());
  };

  const lowerText = () => {
    setInputText(inputText.toLowerCase());
  };

  const capitalizeText = () => {
    const newText = inputText
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    setInputText(newText);
  };

  const swapLanguages = () => {
    const tempLang = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tempLang);

    const tempText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempText);
  };

  const bg = props.dark ? "#1e1e1e" : "white";
  const color = props.dark ? "white" : "black";

  return (
    <div
      style={{
        backgroundColor: bg,
        color: color,
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1 className="text-center mb-5">{props.title}</h1>

      <div className="container-fluid">
        <div className="row align-items-center mb-3">
          <div className="col">
            <select
              className="form-select"
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="gu">Gujarati</option>
              <option value="mr">Marathi</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          <div
            style={{
              width: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="btn "
              onClick={swapLanguages}
            >
              <span className="material-icons">swap_horiz</span>
            </button>
          </div>

          <div className="col">
            <select
              className="form-select"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="gu">Gujarati</option>
              <option value="mr">Marathi</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="position-relative">
              <textarea
                className="form-control"
                rows="8"
                placeholder="Enter Text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{
                  paddingRight: "50px",
                }}
              />

              <button
                onClick={startListening}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                <span className="material-icons">mic</span>
              </button>
            </div>
          </div>

          <div style={{ width: "70px" }}></div>

          <div className="col">
            <textarea
              className="form-control"
              rows="8"
              value={translatedText}
              readOnly
              placeholder="Translation"
            />
          </div>
        </div>
        <div className="row g-2 mb-3"></div>

        <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
          <button
            className="btn btn-outline-primary btn-sm mx-2"
            onClick={upperText}
          >
            UPPERCASE
          </button>

          <button
            className="btn btn-outline-primary btn-sm mx-2"
            onClick={lowerText}
          >
            lowercase
          </button>

          <button
            className="btn btn-outline-primary btn-sm mx-2"
            onClick={capitalizeText}
          >
            Capitalize
          </button>

          <button
            className="btn btn-outline-primary btn-sm mx-2"
            onClick={clearText}
          >
            Clear
          </button>

          <button
            className="btn btn-outline-primary btn-sm mx-2"
            onClick={copyText}
          >
            Copy
          </button>
        </div>

        <div className="container mt-5">
          <h3>Text Summary</h3>

          <p>
            {inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length}{" "}
            Words | {inputText.length} Characters
          </p>

          <p>
            Reading Time:{" "}
            {(
              0.008 *
              (inputText.trim() === ""
                ? 0
                : inputText.trim().split(/\s+/).length)
            ).toFixed(2)}{" "}
            Minutes
          </p>

          <h3>Preview</h3>

          <p>{inputText.length > 0 ? inputText : "Nothing to Preview"}</p>
        </div>
      </div>
    </div>
  );
}
