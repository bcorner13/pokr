import PropTypes from 'prop-types';
import React from 'react';
import PeopleList from '../components/PeopleList';
import EventEmitter from 'libs/eventEmitter';

export default class PeopleListBox extends React.Component {

  state = { data: [] }

  loadPeopleListFromServer = (callback) => {
    $.ajax({
      url: `${this.props.url}?sync=${window.syncResult}`,
      dataType: 'json',
      cache: false,
      success: data => {
        // TODO
        // This was used for switching roles
        // This should be done via state by setting role into state
        // this.setState({data: []});
        this.setState({ data: data })
        EventEmitter.dispatch("showResultPanel", data)
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadPeopleListFromServer();
    EventEmitter.subscribe("refreshUsers", this.loadPeopleListFromServer);
    // EventEmitter.subscribe("switchUserRoles", this.loadPeopleListFromServer);
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">People</div>
        <div id="peopleListArea" className="panel-body row">
          <div className="peopleListBox">
            <PeopleList data={this.state.data} />
          </div>
        </div>
      </div>
    )
  }
}