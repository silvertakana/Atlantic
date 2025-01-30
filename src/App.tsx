
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Game from './components/Game';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="main-content">
          <Game />
        </div>
      </div>
    </div>
  );
};

export default App;