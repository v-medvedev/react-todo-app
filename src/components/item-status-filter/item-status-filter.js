import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  
  state = {
    filterBy: 'all'
  };

  toggleFilter = (filterBy) => {
    this.setState({
      filterBy
    });
    this.props.onFilterToggle(filterBy);
  };

  render() {
    const { filterBy } = this.state;
    return (
      <div className="btn-group">
        <button type="button"
                className={"btn " + (filterBy === 'all' ? 'btn-info' : 'btn-outline-secondary')}
                onClick={ () => this.toggleFilter('all') }>All</button>
        <button type="button"
                className={"btn " + (filterBy === 'active' ? 'btn-info' : 'btn-outline-secondary')}
                onClick={ () => this.toggleFilter('active') }>Active</button>
        <button type="button"
                className={"btn " + (filterBy === 'done' ? 'btn-info' : 'btn-outline-secondary')}
                onClick={ () => this.toggleFilter('done') }>Done</button>
      </div>
    );
  }
};
