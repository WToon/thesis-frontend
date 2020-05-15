import React, { Component } from 'react';

import Button from '../button/button';
import Track from '../item/track/track';

import { CONTING_DELAY, INTERFACE_TYPE } from '../../constants';


class Recommendation extends Component {
    timeout = null;

    handleMouseOver = (id, type, event) => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.props.informationRequestCallback(id, type, event), CONTING_DELAY);
    }

    render() {
        const { track, playing, playlistAddHandler, handlePreviewRequest, informationRequestCallback, details } = this.props
        let className = "";
        if (details.track && details.track.id === track.id) { className = "detailed" }
        return (
            <div>
                {INTERFACE_TYPE === "hover" ?
                    <div className={ `recommendation-wrapper ${className}`}
                        onMouseOver={(e) => this.handleMouseOver(track.id, "track", e)} onMouseLeave={() => clearTimeout(this.timeout)}>
                        <Button className="preview-button" onClick={() => handlePreviewRequest(track.preview_url)}
                            buttonType={playing ? "pauseButton" : "playButton"} />
                        <Track className="recommended-track" track={track} />
                        <Button buttonType="likeButton" onClick={() => playlistAddHandler(track)} />
                    </div> :
                    <div className={ `recommendation-wrapper2 ${className}`} onContextMenu={(e) => informationRequestCallback(track.id, "track", e)}>
                        <Button onClick={() => handlePreviewRequest(track.preview_url)}
                            buttonType={playing ? "pauseButton" : "playButton"} />
                        <Track className="recommended-track" track={track} />
                        <Button buttonType="likeButton" onClick={() => playlistAddHandler(track)} />
                    </div>
                }
            </div>
        );
    }
}

export default Recommendation;
