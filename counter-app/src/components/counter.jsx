import { Button } from "bootstrap";
import { event } from "jquery";
import React, { Component } from "react";

class Counter extends React.Component {
  /*state removed in order to reset state and have single source of truth state = {
    value: this.props.counter.value,
    tags: ["tag1", "tag2", "tag3"],
  };*/



  styles = {
    fontSize: "10px",
    fontWeight: "bold",
  };

  /*renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }*/

  /*handleIncrement = (event) => {
    console.log(event);
    // only used to see value of this console.log("increment clicked", this);
    this.setState({ value: this.state.value + 1 });
  };*/

  render() {
    return (
      <React.Fragment>
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.props.counter;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
