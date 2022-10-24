import { Component } from "react";
import { Offline, Online } from "react-detect-offline";

import "antd/dist/antd.min.css";
import MenuTabs from "../menu";
import ListItems from "../list-items";
import SearchInput from "../search";

export default class App extends Component {
  state = {
    language: "en-Us",
    page: 1,
    query: "return",
  };

  onQueryChange = (query) => {
    console.log("got new query", `${query}`);
    this.setState({
      query,
      page: 1,
    });
  };
  changePage = (page) => {
    console.log("change page", `${page}`);
    this.setState({
      page,
    });
  };

  render() {
    return (
      <>
        <Online>
          <MenuTabs />
          <SearchInput changeQuery={this.onQueryChange} />
          <div className="content-box">
            <ListItems userQuery={this.state} changePage={this.changePage} />
          </div>
        </Online>
        <Offline>
          <h1>Check Your Connection, Please!</h1>
        </Offline>
      </>
    );
  }
}
