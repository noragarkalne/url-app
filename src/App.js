import React, { Component } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    http: {
      id: null,
      url: "",
      short: null,
    },
    newUrlData: {
      id: null,
      url: "",
      short: null,
    },
    shorturl: "",
  };

  addUrl() {
    axios
      .put("http://localhost:3030/api/put/url", this.state.newUrlData)
      .then((response) => {
        this.setState({ shorturl: response.data });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ shorturl: "Please enter valid link!" });
        }
      });
  }
  render() {
    return (
      <div className="App-container">
        <FormGroup>
          <Label for="url" className="App-name">
            Url shortener
          </Label>
          <Input
            className="Input"
            id="url"
            value={this.state.newUrlData.url}
            onChange={(e) => {
              let { newUrlData } = this.state;

              newUrlData.url = e.target.value;

              this.setState({ newUrlData });
            }}
            placeholder="enter your url"
          />
          <Button onClick={this.addUrl.bind(this)} className="App-button">
            shorten url
          </Button>
        </FormGroup>

        <p itemType="url">
          ShortUrl:{" "}
          <a href={this.state.newUrlData.url} target="blank">
            {this.state.shorturl}
          </a>
        </p>
      </div>
    );
  }
}

export default App;
