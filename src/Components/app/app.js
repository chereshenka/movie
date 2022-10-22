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
    this.getMovies();
  }
  state = {
    data: [],
  };

  getMovies = async function () {
    // const data = input.value;
    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=544f8f911707c9ed5070d258fb62dbb5&language=en-US&page=1&query=return`
    );
    if (response.ok) {
      let result = await response.json();
      this.setData(result.results);
    } else {
      console.log(`couldnt get data`);
    }
    //  renderAutocomplete(res, data);
  };

  setData = (result) => {
    this.setState(() => {
      return { data: result };
    });
  };

  render() {
    const { data } = this.state;
    console.log(data);
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

                <p className="item__birth">March 5, 2020</p>
                <div className="item__category-list">
                  <button className="item__category-item">Action</button>
                  <button className="item__category-item">Drama</button>
                </div>
                <div className="item__overview">
                  <p className="item__description">{item.overview}</p>
                </div>
                <Rate
                  count={10}
                  allowHalf
                  defaultValue={item.vote_average}
                  style={{ marginBottom: 5, position: "absolute", bottom: 5 }}
                />
              </Card>
            </List.Item>
          )}
        />
        <Pagination defaultCurrent={1} total={50} />
      </>
    );
  }
}
