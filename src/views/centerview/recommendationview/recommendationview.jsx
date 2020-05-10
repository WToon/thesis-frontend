import React, { Component } from 'react';
import { Recommendation } from '../../../components';

class RecommendationView extends Component {

    preview = null;
    currentPreview = null;

    state = {
        playingPreview: false,
    }

    handlePreviewRequest = (preview_url) => {
        if (this.currentPreview === preview_url) {
            this.state.playingPreview ?
                this.preview.pause() : this.preview.play()
            this.setState({ playingPreview: !this.state.playingPreview })
        }
        else {
            if (this.preview) this.preview.pause();
            this.preview = new Audio(preview_url);
            this.currentPreview = preview_url;
            this.preview.volume = 0.1;
            this.preview.play();
            this.preview.addEventListener("ended", () => {
                this.setState({ playingPreview: false })
            });
            this.setState({ playingPreview: true })
        }
    }

    componentWillUnmount = () => {
        if (this.preview) this.preview.pause();
    }

    render() {
        const { recommendations, informationRequestCallback, playlistAddHandler, details } = this.props
        return (
            <div className="recommendations-wrapper">
                {recommendations.tracks ?
                    recommendations.tracks.filter(recommendation => recommendation.preview_url).map(track =>
                        <Recommendation key={track.id} track={track} details={details}
                            handlePreviewRequest={this.handlePreviewRequest} playing={(this.currentPreview === track.preview_url) && this.state.playingPreview}
                            playlistAddHandler={playlistAddHandler} informationRequestCallback={informationRequestCallback} />
                    ) : <div className="get-started">Select some artists or tracks to base your recommendations on.</div>}
            </div>
        );
    }
}

export default RecommendationView;
