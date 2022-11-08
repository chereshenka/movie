import { Component } from "react";
import { Offline, Online } from "react-detect-offline";

import SwapiService from "../../services/swapi-service";
import "antd/dist/antd.min.css";
import MenuTabs from "../menu";
import ListItems from "../list-items";
import SearchInput from "../search";
import { SwapiServiceProvider } from "../swapi-service-context/swapi-service-context";

export default class App extends Component {
  state = {
    language: "en-Us",
    page: 1,
    query: "return",
    tab: "search",
    genresList: [],
  };
  swapiService = new SwapiService();

  componentDidMount() {
    this.swapiService
      .getGenreList()
      .then((genreListData) =>
        this.setState({ genresList: genreListData.genres }),
      );
  }

  onQueryChange = (query) => {
    this.setState({
      query,
      page: 1,
    });
  };

  tabChange = (tab) => {
    this.setState({
      tab,
    });
  };
  changePage = (page) => {
    this.setState({
      page,
    });
  };

  render() {
    return (
      <>
        <Online>
          <SwapiServiceProvider value={this.state}>
            <MenuTabs onTabChange={this.tabChange} />
            <SearchInput
              changeQuery={this.onQueryChange}
              hidePanel={this.state.tab}
            />
            <div className="content-box">
              <ListItems userQuery={this.state} changePage={this.changePage} />
            </div>
          </SwapiServiceProvider>
        </Online>
        <Offline>
          <h1>Check Your Connection, Please!</h1>
        </Offline>
      </>
    );
  }
}
