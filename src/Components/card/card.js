import { Component } from "react";
import { format, parseISO } from "date-fns";
import { Card, Rate } from "antd";
import CategoryList from "../category-list";

import SwapiService from "../../services/swapi-service";

export default class Item extends Component {
  swapiService = new SwapiService();
  state = {
    value: null,
  };

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

  userFilmRating = (value, id) => {
    console.log(value, id, "user rated film");
    this.setState({
      value,
    });
    localStorage.setItem(id, value);
    this.swapiService.rateMovie(value, id);
  };

  render() {
    const { item } = this.props;
    const rating = Number(localStorage.getItem(item.id));
    const circleColor =
      item.vote_average < 3
        ? "#E90000"
        : item.vote_average < 5
        ? "#E97E00"
        : item.vote_average < 7
        ? "#E9D100"
        : "#66E900";
    return (
      <Card
        key={item.title}
        style={{
          width: 454,
          height: 281,
          display: "flex",
          flexDirection: "row",
          border: "none",
          boxShadow: "4px 4px 8px -5px rgba(34, 60, 80, 0.2)",
          margin: "0 auto 35px",
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
          <span className="item__rate" style={{ borderColor: circleColor }}>
            {item.vote_average.toFixed(1)}
          </span>
        </div>

        <p className="item__birth">
          {format(parseISO(item.release_date), "MMMM d, y")}
        </p>
        <CategoryList genres={item.genre_ids} />
        <div className="item__overview">
          <p className="item__description">
            {this.cutDescription(item.overview)}
          </p>
        </div>
        <Rate
          onChange={(value) => this.userFilmRating(value, item.id)}
          count={10}
          allowHalf
          allowClear
          value={rating}
          defaultValue={0}
          style={{ marginBottom: 5, position: "absolute", bottom: 2 }}
        />
      </Card>
    );
  }
}
