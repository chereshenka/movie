import { Component } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { Card, Rate } from "antd";

export default class Item extends Component {
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
    const { item } = this.props;
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
    );
  }
}