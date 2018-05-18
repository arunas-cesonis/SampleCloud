import React, { Component } from "react";
import classNames from "classnames";

class FilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      username: "",
      currentSample: ""
    };
    this.displayName = this.displayName.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(sample, username) {
    //Check the db and get the sample URL or something like that
    const webURL = "http://localhost:3000/uploads";
    const sampleURL =
      webURL + "/" + username.toLowerCase() + "/" + sample.toLowerCase();
    console.log("Handling Sample");
    console.log("Sample: ", sampleURL);
    console.log("Username: ", username);
    this.setState({ currentSample: sample });
    this.props.handlePlay(sampleURL, username);
  }

  displayName(username) {
    if (username) {
      return "Viewing: " + username;
    }
  }

  render() {
    const files = this.props.listFiles;
    const username = this.props.currentUser;

    return (
      <div className="br_flist">
        <div className="br_ftitle">{this.displayName(username)}</div>
        <ul className="br_samplesBar">
          {files.map((file, i) => (
            <Item
              key={i}
              file={file}
              currentSample={this.state.currentSample}
              username={username}
              handler={this.handleFile}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const Item = props => {
  return (
    <li
      className={classNames("br_file", {
        active: props.file === props.currentSample
      })}
      onClick={() => props.handler(props.file, props.username)}
    >
      {props.file}
    </li>
  );
};

export default FilesList;
