import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    getUser()
      .then((date) => {
        this.setState({
          name: date.name,
          loading: false,
        });
      })
      .catch((error) => error.message);
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        {loading
          ? <Loading />
          : (
            <div>
              <h2 data-testid="header-user-name">{ name }</h2>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
