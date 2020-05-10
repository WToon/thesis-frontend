import React, { Component } from 'react';

import { SpotifyService } from '../../../services/spotify-service';
import { ServiceProviderContext } from '../../../lib/service-provider-context';
import SearchBar from '../../../components/search/searchbar/searchbar';
import SearchResults from '../../../components/search/searchresults/searchresults';

class Search extends Component {
    static contextType = ServiceProviderContext;

    state = {
        searchResults: [],
    }

    onChangeHandler = (searchQuery) => {
        searchQuery ?
            this.context.get(SpotifyService).searchRequest(searchQuery)
                .then(res => {
                    if (res.tracks) {
                        const selectedItemIds = this.props.seeds.map(seed => seed.id);
                        const unselectedItems = res.tracks.items.filter(item => (!selectedItemIds.includes(item.id)))
                        this.setState({ searchResults: unselectedItems });
                    }
                }) : this.setState({ searchResults: [] });
    }

    onSelectionAddCallback = (selection) => {
        const remove = this.props.seeds.length < 5
        this.props.onSelectionAddCallback(selection)
        // Remove an item from the search results after it has been selected
        if (remove)
            this.setState(prevState => {
                const removeIndex = prevState.searchResults.findIndex(item => item.id === selection.id);
                const searchResults = prevState.searchResults.slice();
                searchResults.splice(removeIndex, 1);
                return { searchResults }
            })
    }

    render() {
        return (
            <div className="search-view">
                <SearchBar className="search-bar" onChangeHandler={this.onChangeHandler} />
                {this.state.searchResults[0] ?
                    <SearchResults className="search-results" searchResults={this.state.searchResults} details={this.props.details}
                        onSelectionAddCallback={this.onSelectionAddCallback} informationRequestCallback={this.props.informationRequestCallback} />
                    : <div className="get-started">
                        <span style={{ height: "150px" }}></span>
                        <span>Get started by picking 5 of your favourite songs and artists.</span>
                        <span>Adjust the track attributes to your liking.</span>
                    </div>}
            </div >
        );
    }
}

export default Search;
