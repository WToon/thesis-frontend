import React, { Component } from 'react';
import Artist from '../../item/artist/artist';
import Track from '../../item/track/track';

import { ARTISTTYPE, TRACKTYPE } from '../../../constants'
import Button from '../../button/button';

import { CONTING_DELAY, INTERFACE_TYPE } from '../../../constants';


class searchResults extends Component {

    timeout = null;

    handleMouseOver = (id, type, event) => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.props.informationRequestCallback(id, type, event), CONTING_DELAY);
    }

    render() {
        const { searchResults, onSelectionAddCallback, informationRequestCallback, details } = this.props
        return (
            <>
                {INTERFACE_TYPE === "hover" ?
                    <div className="search-result-wrapper">
                        {searchResults.map(item => {
                            let className = "";
                            if (details.track && details.track.id === item.id) { className = "detailed" }
                            return <div key={item.id} className={`searchresult ${className}`}
                                onMouseOver={(e) => this.handleMouseOver(item.id, item.type, e)} onMouseLeave={() => clearTimeout(this.timeout)}>
                                {item.type === ARTISTTYPE && <Artist artist={item} />}
                                {item.type === TRACKTYPE && <Track track={item} />}
                                <Button buttonType="addButton" onClick={() => onSelectionAddCallback(item)} />
                            </div>
                        }
                        )}
                    </div>
                    :
                    <div className="search-result-wrapper2">
                        {searchResults.map(item => {
                            let className = "";
                            if (details.track && details.track.id === item.id) { className = "detailed" }
                            return <div key={item.id} className={`searchresult ${className}`}>
                                {item.type === ARTISTTYPE && <Artist artist={item} />}
                                {item.type === TRACKTYPE && <Track track={item} />}
                                <Button buttonType="detailButton" onClick={(e) => informationRequestCallback(item.id, item.type, e)} />
                                <Button buttonType="addButton" onClick={() => onSelectionAddCallback(item)} />
                            </div>
                        }
                        )}
                    </div>
                }
            </>
        );
    }
}

export default searchResults;
