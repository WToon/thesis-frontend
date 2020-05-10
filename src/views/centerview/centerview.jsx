import React, { Component } from 'react';
import { Button } from '../../components';
import RecommendationView from './recommendationview/recommendationview';
import SearchView from './searchview/searchview';

class CenterView extends Component {

    render() {
        const { recommendations, seeds, onSelectionAddCallback, informationRequestCallback, playlistAddHandler, handleViewToggle, selecting, details } = this.props
        return (
            <div className="centerview-container">
                <div className="title">
                    <span>{selecting ? "Search" : "Recommendations"}</span>
                </div>
                <div>
                    {selecting ?
                        <SearchView details={details} seeds={seeds} onSelectionAddCallback={onSelectionAddCallback} informationRequestCallback={informationRequestCallback} />
                        : <RecommendationView recommendations={recommendations} details={details}
                            informationRequestCallback={informationRequestCallback} playlistAddHandler={playlistAddHandler} />}
                </div>
                <div>
                    <Button onClick={() => handleViewToggle()} buttonType={selecting ? "switchRecommending" : "switchSearching"}>
                        {selecting ? "Explore your recommendations" : "Select some seeds"}
                    </Button>
                </div>
            </div>
        );
    }
}

export default CenterView;
