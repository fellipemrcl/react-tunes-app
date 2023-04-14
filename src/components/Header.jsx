import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: '',
    loading: false,
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    if (user) {
      this.setState({
        user,
        loading: false,
      });
    }
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          {loading ? <Loading /> : (
            <p data-testid="header-user-name">{ user.name }</p>
          )}
        </div>
        <div>
          <Link to="/search" data-testid="link-to-search" />
        </div>
        <div>
          <Link to="/favorites" data-testid="link-to-favorites" />
        </div>
        <div>
          <Link to="/profile" data-testid="link-to-profile" />
        </div>
      </header>
    );
  }
}

export default Header;
