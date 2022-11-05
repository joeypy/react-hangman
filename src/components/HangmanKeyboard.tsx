import styles from '../../styles/Keyboard.module.css';

interface Props {}

const KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export const HangmanKeyboard = (props: Props) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
        gap: '.5rem',
      }}
    >
      {KEYS.map((key) => (
        <button className={`${styles.btn}`} key={key}>
          {key}
        </button>
      ))}
    </div>
  );
};
