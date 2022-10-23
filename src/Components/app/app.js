import { Component } from "react";
import { Input, Menu, Card, List, Pagination, Rate } from "antd";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { Offline, Online } from "react-detect-offline";

import "antd/dist/antd.min.css";
import SwapiService from "../../services/swapi-service";

import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
// import ListItems from '../list-items';
// import Search from '../search';
// import Pagination from '../pagination';

export default class App extends Component {
  swapiService = new SwapiService();
  state = {
    data: [],
    loading: true,
    error: false,
  };

  constructor() {
    super();
    this.setData();
  }

  setData() {
    this.swapiService
      .getMovies()
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

  cutDescription(text) {
    let preview = text.slice(0, 190);
    if (preview.length === 190) {
      let previewArr = preview.split(" ");
      previewArr[previewArr.length - 1] = "...";
      return previewArr.join(" ");
    } else {
      return preview;
    }
  }

  render() {
    const { data, loading, error } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const errorInformation = error ? <ErrorIndicator /> : null;
    const contentBlock = !(loading || errorInformation) ? (
      <Content data={data} shortDescription={this.cutDescription} />
    ) : null;

    return (
      <>
        <Online>
          <Menu mode="horizontal">
            <Menu.Item key="search">Search</Menu.Item>
            <Menu.Item key="rated">Rated</Menu.Item>
          </Menu>
          <Input placeholder="Type to search..." />
          {contentBlock}
          {errorInformation}
          {spinner}
        </Online>
        <Offline>
          <h1>Check Your Connection, Please!</h1>
        </Offline>
      </>
    );
  }
}

const Content = ({ data, shortDescription }) => {
  return (
    <>
      <List
        grid={{ gutter: 30, column: 2, lg: 1010 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <Card
              style={{
                width: 454,
                height: 281,
                display: "flex",
                flexDirection: "row",
                border: "none",
                boxShadow: "4px 4px 8px -5px rgba(34, 60, 80, 0.2)",
                margin: "0 auto",
              }}
              cover={
                <img
                  style={{ height: 281, width: 183 }}
                  alt={item.title}
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                />
              }
            >
              <div className="item__header">
                <h3 className="item__title">{item.title}</h3>
                <span className="item__rate">{item.popularity.toFixed(1)}</span>
              </div>

              <p className="item__birth">
                {format(parseISO(item.release_date), "MMMM d, y")}
              </p>
              <div className="item__category-list">
                <button className="item__category-item">Action</button>
                <button className="item__category-item">Drama</button>
              </div>
              <div className="item__overview">
                <p className="item__description">
                  {shortDescription(item.overview)}
                </p>
              </div>
              <Rate
                count={10}
                allowHalf
                defaultValue={item.vote_average}
                style={{ marginBottom: 5, position: "absolute", bottom: 2 }}
              />
            </Card>
          </List.Item>
        )}
      />
      <Pagination defaultCurrent={1} total={50} style={{ marginBottom: 20 }} />
    </>
  );
};
