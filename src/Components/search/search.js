import { Input } from "antd";
import { Component } from "react";
import debounce from "lodash.debounce";

export default class SearchInput extends Component {
  state = {
    value: null,
  };

  debouncedGetResponse = debounce((val) => this.props.changeQuery(val), 1000, {
    leading: true,
    trailing: true,
  });

  onChange = (e) => {
    const search = e.target.value;
    this.setState({
      value: search,
    });
    this.debouncedGetResponse(search);
  };

  render() {
    const showPanel =
      this.props.hidePanel === "search" ? (
        <Input
          placeholder="Type to search..."
          onChange={this.onChange}
          autoFocus
          value={this.state.value}
        />
      ) : null;
    return <>{showPanel}</>;
  }
}
