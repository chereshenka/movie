import { Component } from "react";
import { List, Pagination } from "antd";

import Item from "../card";
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
  }
  componentDidUpdate(prevProps) {
    if (this.props.userQuery !== prevProps.userQuery) {
      this.updateListData(this.props.userQuery.tab);
    }
  }
  updateListData(tab) {
    this.setState({
      loading: true,
    });
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
      return;
    }
    this.swapiService
      .getMovies(userQuery)
      .then((res) => {
        this.setState({
          fullData: res,
          data: res.results,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  rateList() {
    const { userQuery } = this.props;
    this.swapiService
      .getRatedMovies(userQuery.page)
      .then((res) => {
        this.setState({
          fullData: res,
          data: res.results,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  rateFilm = (value, id) => {
    this.swapiService.rateMovie(value, id);
  };

  changePageNumber = (e) => {
    this.props.changePage(e);
    this.rateList(e);
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
          renderItem={(item) => (
            <Item
              ratedList={this.props.userQuery.rateList}
              rating={this.rateFilm}
              item={item}
            />
          )}
        />
        <Pagination
          defaultCurrent={1}
          pageSize={20}
          current={this.props.userQuery.page}
          onChange={this.changePageNumber}
          total={fullData.total_results}
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
