import './Header.css';
import homeIcon from '../icons/home.png'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation()

    return (
      <header>
        <h1>rancid tomatillos</h1>
        <div></div>
        { location.pathname !== '/' && (<Link to="/" className="homeButton"><img src={homeIcon} alt="Home Button" /></Link>)}
      </header>
    )
}

export default Header;