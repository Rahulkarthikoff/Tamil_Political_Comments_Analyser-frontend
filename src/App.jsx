import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setSentiment('');
    try {
      const response = await axios.post('https://tamil-political-analyser-api.onrender.com', { text });
      setSentiment(response.data.sentiment);
    } catch (error) {
      setSentiment('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="colorful-bg">
      <div className="app-container">
        <h1 className="gradient-text">Tamil Political Comments Sentiment Analyzer</h1>
        <textarea
          className="colorful-textarea"
          rows="4"
          cols="50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        />
        <button
          className="colorful-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
        {loading && (
          <div className="loader"></div>
        )}
        {sentiment && !loading && (
          <div className="prediction-box colorful-prediction">
            <strong>Prediction:</strong> <span className="prediction-text">{sentiment}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
