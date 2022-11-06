import { SwapiServiceConsumer } from "../swapi-service-context";
import { Component } from "react";

export default class CategoryList extends Component {
  render() {
    const { genres } = this.props;
    return (
      <SwapiServiceConsumer>
        {({ genresList }) => {
          return (
            <div className="item__category-list">
              {genresList.map(({ id, name }) => {
                return genres.includes(id) ? (
                  <button key={id} className="item__category-item">
                    {name}
                  </button>
                ) : (
                  false
                );
              })}
            </div>
          );
        }}
      </SwapiServiceConsumer>
    );
  }
}

/*
              <button className="item__category-item">
                {genresList.children.filter((elem) =>
                  elem.id === el ? elem.name : null
                )}
              </button>
 */
