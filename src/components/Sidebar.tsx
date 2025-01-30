import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h3>Player Stats</h3>
      <p>Health: █████</p>
      <p>Inventory:</p>
      <ul>
        <li>🗡️ Basic Sword</li>
        <li>🛡️ Wooden Shield</li>
      </ul>
    </aside>
  );
};

export default Sidebar;