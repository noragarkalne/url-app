import React, { Component } from "react";
import { FormGroup, Label, Input, Button, Table } from "reactstrap";
import axios from "axios";
import "./app.css";

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

        <Table>
          <thead>
            <tr>
              <th>ShortUrl</th>
            </tr>
          </thead>
          <tbody itemType="url">
            <a href={this.state.newUrlData.url}>{this.state.shorturl}</a>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
