import './App.css';
import Grid from './components/Game/Grid';
import Tutorial from './components/Tutorial/Tutorial';

function App() {
  const mediaQuerySmallMobile = window.matchMedia('(max-width: 480px)').matches;
  const mediaQueryMobile = window.matchMedia('(max-width: 768px)').matches;
  const mediaQueryTablet = window.matchMedia('(max-width: 1024px)').matches;
  const mediaQueryDesktop = window.matchMedia('(min-width: 1024px)').matches;
  const gridSize = (mediaQuerySmallMobile && 5) || (mediaQueryMobile && 6) || (mediaQueryTablet && 8) || (mediaQueryDesktop && 10) || 5;

  return (
    <div className="App">
      {/* <Tutorial /> */}
      <Grid size={gridSize} />
    </div>
  );
}

export default App;
