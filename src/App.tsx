import { useState } from 'react';
import { HangmanDrawing } from './components/HangmanDrawing';
import { HangmanKeyboard } from './components/HangmanKeyboard';
import { HangmanWord } from './components/HangmanWord';
import words from './wordList.json';

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));

  console.log(wordToGuess);

  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        margin: '0 auto',
      }}
    >
      <h2>Lose Win</h2>
      <HangmanDrawing numberOfGuessed={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <div style={{ alignSelf: 'stretch' }}>
        <HangmanKeyboard />
      </div>
    </div>
  );
}

export default App;
