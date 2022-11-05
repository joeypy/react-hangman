import { useCallback, useEffect, useState } from 'react';
import { HangmanDrawing } from './components/HangmanDrawing';
import { HangmanKeyboard } from './components/HangmanKeyboard';
import { HangmanWord } from './components/HangmanWord';
import words from './wordList.json';

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetters = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key;

      if (!key.match(/^[a-z]/)) return;

      event.preventDefault();
      addGuessedLetters(key);
    };

    document.addEventListener('keypress', handler);
    // removing the addEventListener
    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key;

      if (key !== 'Enter') return;

      event.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener('keypress', handler);
    // removing the addEventListener
    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

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
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {isWinner && 'Winner! - Refresh to try again'}
        {isLoser && 'Nice Try! - Refresh to try again'}
      </div>
      <HangmanDrawing numberOfGuessed={incorrectLetters.length} />
      <HangmanWord
        revealWord={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: 'stretch' }}>
        <HangmanKeyboard
          disabled={isLoser || isWinner}
          activeLetters={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetters={addGuessedLetters}
        />
      </div>
      <div>{(isWinner || isLoser) && "Press 'Enter' to try again."}</div>
    </div>
  );
}

export default App;
