import React, { Component } from 'react';
import { SEARCH_TEXT, SEARCH_DELAY } from '../../../constants'

class SearchBar extends Component {

    timeout = null;

    render() {
        return (
            <div className="searchbar-wrapper">
                <input className="searchbar"
                onKeyUp={(e) => {
                    clearTimeout(this.timeout);
                    let value = e.target.value;
                    this.timeout = setTimeout(() => this.props.onChangeHandler(value), SEARCH_DELAY)
                }}
                placeholder={SEARCH_TEXT} />
            </div>
        );
    }
}

export default SearchBar;
