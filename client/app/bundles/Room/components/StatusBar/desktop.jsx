import {HOC} from './hoc'
import React from 'react'
import {defaultTourColor} from 'libs/barColors'
import css from './index.scss'

class StatusBarDesktop extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      role: this.props.role
    }
  }

  componentDidMount() {
    const originalTitle = "Copy to clipboard";
    $('[data-toggle="tooltip"]').tooltip({container: "#tooltip-area", title: originalTitle})
      .on("click", function() {
        $(this).attr("title", "Copied!").tooltip("fixTitle").tooltip("show");
      }).mouseleave(function() {
        $(this).attr("title", originalTitle).tooltip("fixTitle");
      });

    this.props.addSteps({
      title: 'Title bar',
      text: 'You can change room status or edit from here. Click "Share link" to copy the link of current room.',
      selector: `.${css["room__status_bar"]}`,
      position: 'right',
      style: defaultTourColor
    })

    this.props.addSteps({
      title: 'Switch your role',
      text: 'Change your role to a Watcher or Participant. The Moderator is not allowed to switch roles.',
      selector: `.${css["room__status_bar"]} .dropdown`,
      position: 'top-right',
      style: defaultTourColor
    });
  }

  render() {
    const roomStatusButton = (() => {
      if ('Moderator' === this.state.role) {
        return (
          <button type="button" onClick={this.props.closeRoom} className="btn btn-default close-room">🏁 Close room</button>
        )
      }
    })()

    const editButton = (() => {
      if('Moderator' === this.state.role) {
        return(
          <a href={`/rooms/${this.props.roomId}/edit`} className="btn btn-default">✏️ Edit room</a>
        )
      }
    })();

    const copyLink = () => {
      const aField = document.getElementById("hiddenField");
      aField.hidden   = false;
      aField.value    = window.location.href;
      aField.select();
      document.execCommand("copy");
      aField.hidden = true;
    };

    const operationButtons = (() => {
      if (this.props.roomState !== "draw") {
        return(
          <div className="btn-group pull-right" role="group">
            {editButton}
            <button type="button" onClick={copyLink} className="btn btn-default" data-toggle="tooltip" data-placement="bottom">📻 Share link</button>
            {roomStatusButton}
          </div>
        )
      }
    })();

    const userRoleClassName = role => {
      // Dont allow moderator to switch role at the moment
      if (role === this.state.role || "Moderator" === this.state.role) {
        return "disabled";
      } else {
        return "";
      }
    };

    const currentRoleEmoji = (() => {
      if ("Moderator" === this.state.role) {
        return "👑";
      } else if ("Participant" === this.state.role) {
        return "👷";
      } else {
        return "👲";
      }
    })();

    return (
      <div className={`${css["room__status_bar"]} row`}>
        <div className="col-md-8 col-xs-8">
          <h3 className={`pull-left ${css.room__title}`}>{this.props.roomName}</h3>
          {operationButtons}
          <div id="tooltip-area"></div>
        </div>
        <div className="col-md-4 col-xs-4">
          <div className={`pull-left ${css['tour-guide']}`}>
            <a href="javascript:;" onClick={this.props.playTourGuide}>
              <i className="fa fa-question-circle" aria-hidden="true"></i> Take a tour
            </a>
          </div>
          <div className="dropdown pull-right">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              {currentRoleEmoji} &nbsp;{this.state.role} &nbsp;
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li className={userRoleClassName("Watcher")}><a onClick={this.props.beWatcher} href="javascript:;">Be watcher 👲</a></li>
              <li className={userRoleClassName("Participant")}><a onClick={this.props.beParticipant} href="javascript:;">Be participant 👷</a></li>            </ul>
          </div>
        </div>
        <input type="text" id="hiddenField" className="room--share-link" />
      </div>
    )
  }
}

const StatusBar = HOC(StatusBarDesktop)
export default StatusBar