import { Component } from "react";
import { Alert, Input, Menu, Card, List, Pagination, Rate, Spin } from "antd";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import SwapiService from "../../services/swapi-service";

// import Menu from '../menu';
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
    const { data } = this.state;

    const antIcon = (
      <LoadingOutlined
        style={{
          fontSize: 24,
        }}
        spin
      />
    );
    const loading = () => <Spin indicator={antIcon} />;
    const error = () => (
      <Alert
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        showIcon
      />
    );

    return (
      <>
        <Menu mode="horizontal">
          <Menu.Item key="search">Search</Menu.Item>
          <Menu.Item key="rated">Rated</Menu.Item>
        </Menu>
        <Input placeholder="Type to search..." />
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
                  <span className="item__rate">
                    {item.popularity.toFixed(1)}
                  </span>
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
                    {this.cutDescription(item.overview)}
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
        <Pagination
          defaultCurrent={1}
          total={50}
          style={{ marginBottom: 20 }}
        />
      </>
    );
  }
}
