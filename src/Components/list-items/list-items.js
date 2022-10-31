import { Component } from "react";
import Item from "../card";
import { List, Pagination } from "antd";
import SwapiService from "../../services/swapi-service";

import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

export default class ListItems extends Component {
  swapiService = new SwapiService();
  state = {
    fullData: [],
    data: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateListData(this.props.userQuery.tab);
    // this.swapiService.getSessionToken().then((res) => {
    //   console.log(res, "session id");
    // });
  }
  componentDidUpdate(prevProps) {
    if (this.props.userQuery !== prevProps.userQuery) {
      this.updateListData(this.props.userQuery.tab);
    }
  }
  updateListData(tab) {
    console.log("tab changed", tab);
    if (tab === "search") {
      this.searchList();
    }
    if (tab === "rated") {
      this.rateList();
    }
  }
  searchList() {
    const { userQuery } = this.props;
    if (!userQuery) {
      console.log(userQuery, "wrong block");
      return;
    }
    this.swapiService
      .getMovies(userQuery)
      .then((res) => {
        this.setState({
          fullData: res,
          data: res.results,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  rateList() {
    this.swapiService
      .getRatedMovies()
      .then((res) => {
        console.log(res, "rate list");
        this.setState({
          fullData: res,
          data: res.results,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  changePageNumber = (e) => {
    this.props.changePage(e);
  };
  render() {
    const { data, loading, error, fullData } = this.state;

    const spinner = loading && !error ? <Spinner /> : null;
    const errorInformation =
      (!data.length || error) && !loading ? (
        <ErrorIndicator
          description="Request Failed"
          message="Can't find anything with your request, try another one"
        />
      ) : null;
    const contentBlock = !(loading && errorInformation) ? (
      <>
        <List
          grid={{ gutter: 30, column: 2, lg: 1010 }}
          dataSource={data}
          renderItem={(item) => <Item item={item} />}
        />
        <Pagination
          defaultCurrent={1}
          current={this.props.userQuery.page}
          onChange={this.changePageNumber}
          total={fullData.total_pages}
          style={{ marginBottom: 20 }}
          hideOnSinglePage
          showSizeChanger={false}
        />
      </>
    ) : null;
    return (
      <>
        {contentBlock}
        {errorInformation}
        {spinner}
      </>
    );
  }
}
