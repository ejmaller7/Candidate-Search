import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className='nav'>
      <ul>
        <li><Link to="/"className='nav-link'>Home</Link></li>
        <li><Link to="/SavedCandidates" className='nav-link'>Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
