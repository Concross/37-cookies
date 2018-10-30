import React from 'react';
import { connect } from 'react-redux';
import { playersFetchAll, playerCreateRequest, playerUpdateRequest } from '../../action/player-actions';
import Player from '../player';
import PlayerForm from '../player-form';

export class PlayersContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
    };
  }
  componentWillMount() {
    this.setState({ isFetching: true });
    this.props.actions.playersFetchAll();
    this.setState({ isFetching: false });
  }

  render() {
    const { actions, players } = this.props;
    return (
      <div className="players-container">
        <h1>Players</h1>
        <PlayerForm onComplete={actions.playerCreateRequest} />
        {this.state.isFetching
          ? (<h3>I'm fetching!</h3>)
          : (
            <ul>
              {
                players.map(player => {
                  return (
                    <li key={player._id}>
                      <Player player={player}>
                        <PlayerForm player={player} onComplete={actions.playerUpdateRequest} />
                      </Player>
                    </li>
                  );
                })}
            </ul>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    actions: {
      playersFetchAll: () => dispatch(playersFetchAll()),
      playerCreateRequest: player => dispatch(playerCreateRequest(player)),
      playerUpdateRequest: player => dispatch(playerUpdateRequest(player)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersContainer);
