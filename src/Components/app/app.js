import { Component } from "react";
import { Input, Menu, Card, List, Pagination, Rate } from "antd";

import "antd/dist/antd.min.css";

// import Menu from '../menu';
// import ListItems from '../list-items';
// import Search from '../search';
// import Pagination from '../pagination';

export default class App extends Component {
  constructor() {
    super();
    this.items = [
      { label: "Search", key: "search" },
      { label: "Rated", key: "rated" },
    ];
    this.data = [
      {
        title: "Title 1",
      },
      {
        title: "Title 2",
      },
      {
        title: "Title 3",
      },
      {
        title: "Title 4",
      },
      {
        title: "Title 5",
      },
      {
        title: "Title 5",
      },
    ];
  }

  render() {
    return (
      <>
        <Menu mode="horizontal">
          <Menu.Item key="search">Search</Menu.Item>
          <Menu.Item key="rated">Rated</Menu.Item>
        </Menu>
        <Input placeholder="Type to search..." />
        <List
          grid={{ gutter: 0, column: 2, lg: 1010 }}
          dataSource={this.data}
          renderItem={(item) => (
            <List.Item>
              <Card
                style={{
                  width: 454,
                  height: 281,
                  display: "flex",
                  flexDirection: "row",
                  border: "none",
                  boxShadow: "4px 4px 8px -5px rgba(34, 60, 80, 0.2)",
                }}
                cover={
                  <img
                    style={{ height: 281 }}
                    alt="example"
                    src="https://s3.amazonaws.com/static.rogerebert.com/uploads/movie/movie_poster/the-way-back-2020/large_way-back-poster.jpg"
                  />
                }
              >
                <div className="item__header">
                  <h3 className="item__title">The way back</h3>
                  <span className="item__rate">6.6</span>
                </div>

                <p className="item__birth">March 5, 2020</p>
                <div className="item__category-list">
                  <button className="item__category-item">Action</button>
                  <button className="item__category-item">Drama</button>
                </div>
                <p className="item__description">
                  A former basketball all-star, who has lost his wife and family
                  foundation in a struggle with addiction attempts to regain his
                  soul and salvation by becoming the coach of a disparate
                  ethnically mixed high ...
                </p>
                <Rate count={10} allowHalf defaultValue={2.5} />
              </Card>
            </List.Item>
          )}
        />
        <Pagination defaultCurrent={1} total={50} />
      </>
    );
  }
}
