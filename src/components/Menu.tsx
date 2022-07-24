interface MenuProps {
  Visualize: () => void;
  Clear: () => void;
}

const Menu = ({ Visualize, Clear}: MenuProps) => {
  return(
    <div className="menu">
        <h1>PATH VISUALIZER</h1>
        <button type="button" onClick={Visualize}>Visualize</button>
        <button type="button" onClick={Clear}>Clear</button>
    </div>
  )
}
export default Menu;