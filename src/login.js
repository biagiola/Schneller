import React, { Component } from 'react'
import axios from 'axios'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { changeShowNavbar, setUsername, setAuthToken } from '../actions'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    email: '',
    password: '',
    location: '*',
    registerMessage: ''
  }
    this.onSubmit = this.onSubmit.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeEmail(e) {
    this.setState({
    email: e.target.value
    });
  }

  changePassword(e) {
    this.setState({
    password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:5000/auth/login', newUser)
      .then(res => {
        this.props.setUsername(res.data.name);
        this.props.setAuthToken(res.data.token);
        console.log(res)
        console.log('this.props.showNavbar sigup.js', this.props.showNavbar);
        this.props.history.push('/dashboard')
      })
      .catch(error => {
        console.log(error);
        //alert(error.response.data)
      }
    )
  }

  render() {
    return (
    <div className="wrapper container mt-5">
      <form onSubmit={this.onSubmit} className="form-group">
      <input
        id="femail"
        type="text"
        className="form-control"
        placeholder="enter your email..."
        value={this.state.email}
        onChange={this.changeEmail} />
      <br />
      <input
        id="fpwd"
        type="text"
        className="form-control"
        placeholder="enter your password..."
        value={this.state.password}
        onChange={this.changePassword} />
      <br />
      <button className="btn btn-primary">Login</button>
      </form>
    </div>
    )
  }
}

SignUp.propTypes = {
  showNavbar: PropTypes.bool,
  changeShowNavbar: PropTypes.func,
  setUsername: PropTypes.func,
  setAuthToken: PropTypes.func
}

const mapStateToProps = state => ({
  showNavbar: state.casa.switchNavbar,
})

const mapDispatchToProps = dispatch => {
  return {
    changeShowNavbar: () => dispatch(changeShowNavbar()),
    setUsername: name => dispatch(setUsername(name)),
    setAuthToken: token => dispatch(setAuthToken(token))
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);