import { Component } from "react";
import Item from "../card";
import { List, Pagination } from "antd";
import SwapiService from "../../services/swapi-service";

import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

export default class ListItems extends Component {
  swapiService = new SwapiService();
  state = {
    data: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateListData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.userQuery !== prevProps.userQuery) {
      this.updateListData();
    }
  }

  updateListData() {
    const { userQuery } = this.props;
    if (!userQuery) {
      console.log(userQuery, "wrong block");
      return;
    }
    this.swapiService
      .getMovies(userQuery)
      .then((res) => {
        this.setState({
          data: res,
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

  //   setData = (text) => {};
  render() {
    const { data, loading, error } = this.state;
    if (!data.length) {
      return <Spinner />;
    }
    const spinner = loading ? <Spinner /> : null;
    const errorInformation = error ? <ErrorIndicator /> : null;
    const contentBlock = !(loading || errorInformation) ? (
      <>
        <List
          grid={{ gutter: 30, column: 2, lg: 1010 }}
          dataSource={data}
          renderItem={(item) => <Item item={item} />}
        />
        <Pagination
          defaultCurrent={1}
          total={50}
          style={{ marginBottom: 20 }}
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
