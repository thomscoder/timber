import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Tutorial from '../Tutorial/Tutorial';
import Difficulty from './Difficulty';

// import css
import './Navbar.css';

function TimberNavbar() {
  const [showTutorialPage, setShowTutorialPage] = useState<boolean>(false);

  const showTutorial = () => {
    setShowTutorialPage(true);
  };

  return (
    <>
      <Navbar style={{ ...styles }}>
        <Container>
          <Navbar.Text>
            <Difficulty />
          </Navbar.Text>
          <Navbar.Brand>
            <span>🍃</span> Timber
          </Navbar.Brand>
          <Navbar.Text>
            <button onClick={showTutorial} type="button" id="tutorial">
              ?
            </button>
          </Navbar.Text>
        </Container>
      </Navbar>
      {showTutorialPage && <Tutorial show={true} onHide={() => setShowTutorialPage(false)} />}
    </>
  );
}

const styles: React.CSSProperties = {
  position: 'absolute',
  top: '0',
  left: '0',
  height: '65px',
  boxShadow: '0px 0px 10px rgba(3, 3, 3, 0.5)',
  width: '100%',
};

export default TimberNavbar;
