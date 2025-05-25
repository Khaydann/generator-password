import React, { useState, useCallback } from "react";
import "./PasswordGenerator.css";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("P4$5W0rD!");
  const [length, setLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState(3);

  const generatePassword = useCallback(() => {
    let charset = "";
    let newPassword = "";

    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset.length === 0) {
      alert("Please select at least one character type");
      return;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 12) score += 3;
    else if (pass.length >= 8) score += 2;
    else if (pass.length >= 5) score += 1;

    // Character variety contributes points
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSymbol = /[^A-Za-z0-9]/.test(pass);

    const varietyCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(
      Boolean
    ).length;
    score += varietyCount;
    setStrength(Math.min(4, score));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="password-generator">
      <h1>Password Generator</h1>

      <div className="password-display" onClick={copyToClipboard}>
        <span>{password}</span>
      </div>

      <div className="controls">
        <div className="length-control">
          <label>Character Length</label>
          <div>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <span>{length}</span>
          </div>
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Include Uppercase Letters
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            Include Lowercase Letters
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Include Numbers
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Include Symbols
          </label>
        </div>
      </div>

      <div className="strength-meter">
        <span>STRENGTH</span>
        <div className="strength-bars">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`strength-bar ${i < strength ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      <button className="generate-btn" onClick={generatePassword}>
        GENERATE →
      </button>
    </div>
  );
};

export default PasswordGenerator;
