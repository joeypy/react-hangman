interface Props {
  guessedLetters: string[];
  wordToGuess: string;
}

export const HangmanWord = ({ guessedLetters, wordToGuess }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '.25em',
        fontSize: '6rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
      }}
    >
      {wordToGuess.split('').map((letter: string, index: number) => (
        <span style={{ borderBottom: '.1em solid black' }} key={index}>
          <span style={{ visibility: guessedLetters.includes(letter) ? 'visible' : 'hidden' }}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};
