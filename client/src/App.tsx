import { Fragment, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import Grid from './components/Game/Grid';
import TimberNavbar from './components/Page/Navbar';
import Timber from './utils/trie';
import { FireworkSpinner } from 'react-spinners-kit';

function App() {
  const trie = new Timber();
  const [loading, setLoading] = useState<boolean>(true);
  const [words, setWords] = useState<string[]>([]);
  const [alphabet, setAlphabet] = useState<string[]>([]);
  const [tre, setTre] = useState<Timber | null>();
  const [startInserting, setStartInserting] = useState<boolean>(false);

  useEffect(() => {
    const workerRandomWords = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
    workerRandomWords.postMessage('save randoms');
    workerRandomWords.onmessage = (e) => {
      const { alphabet: _alphabet, randomWords } = e.data;
      setAlphabet(_alphabet);
      setWords(randomWords);
    };
  }, []);

  useEffect(() => {
    if (words.length > 0 && !startInserting) {
      setStartInserting(true);
      return;
    }
    if (startInserting) {
      insertWordInDatabase(trie, words)
        .then((v) => setTre(v))
        .catch(console.log)
        .finally(() => setLoading(false));
    }
  }, [words, startInserting]);

  useEffect(() => {}, [tre]);
  const formatter = Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'long' });
  return (
    <Fragment>
      <RecoilRoot>
        <TimberNavbar />
        <div className="App">
          {loading ? (
            <div className="loading-wrapper">
              {words.length === 0 ? (
                <div className="loading">
                  <span>Generating random words...</span>
                  <FireworkSpinner size={30} color="#fff" loading={loading} />
                </div>
              ) : (
                <span>
                  Creating a dictionary... <br />
                  <strong>{formatter.format(words.length)}s</strong> words are being inserted
                </span>
              )}
            </div>
          ) : (
            <Grid database={tre!} alphabet={alphabet} />
          )}
        </div>
      </RecoilRoot>
    </Fragment>
  );
}

const insertWordInDatabase = async (trie: Timber, randomWords: string[]): Promise<Timber> => {
  console.time('inserting words in database');
  for (let i = 0; i < randomWords.length; i++) {
    trie.insert(randomWords[i]);
  }
  console.timeEnd('inserting words in database');
  return trie;
};

export default App;
