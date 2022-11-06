import { Menu } from "antd";
import { Component } from "react";

import SwapiService from "../../services/swapi-service";

export default class MenuTabs extends Component {
  swapiService = new SwapiService();

  items = [
    { label: "Search", key: "search" },
    { label: "Rated", key: "rated" }
  ];

  render() {
    return (
      <Menu
        mode="horizontal"
        items={this.items}
        onClick={(e) => this.props.onTabChange(e.key)}
      />
    );
  }
}
