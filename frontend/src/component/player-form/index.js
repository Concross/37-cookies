import React from 'react';

export default class PlayerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.player ? props.player.firstName : '',
      lastName: props.player ? props.player.lastName : '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName } = this.state;
    const player = {
      firstName,
      lastName,
      role: 'player',
    };
    console.log(player);
    this.props.onComplete(player);
  }

  render() {
    return (
      <div className="player-form-container">
        <form id="player-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>{this.state.firstName ? 'Update Player' : 'Add Player'}</legend>
            <label htmlFor="firstName">
              First Name:
              <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} autoComplete="off" />
            </label>
            <label htmlFor="lastName">
              Last Name:
              <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} autoComplete="off" />
            </label>
            <button type="submit" >{this.state.firstName ? 'Update' : 'Add'}</button>
          </fieldset>
        </form>
      </div>
    );
  }
}
