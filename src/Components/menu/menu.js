import { Menu } from "antd";
import { Component } from "react";

export default class MenuTabs extends Component {
  items = [
    { label: "Search", key: "search" },
    { label: "Rated", key: "rated" },
  ];

  render() {
    return <Menu mode="horizontal" items={this.items} />;
  }
}
