import '../styles/Header.css';
import { useTheme, Theme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="app-header">
      <h1>Adventure Game</h1>
      <div className="theme-selector">
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="theme-dropdown"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="atlantic">Atlantic</option>
        </select>
      </div>
    </header>
  );
};

export default Header;