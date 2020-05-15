import React, { Component } from 'react';
import { Seed } from '../../../components';

class SeedView extends Component {
    render() {
        const { seeds, details, onSelectionRemoveCallback, informationRequestCallback } = this.props
        const seedDisplays = seeds.map(seed =>
            <Seed key={seed.id} seed={seed} details={details}
                onSelectionRemoveCallback={onSelectionRemoveCallback} informationRequestCallback={informationRequestCallback} />)
        while (seedDisplays.length < 5) {
            seedDisplays.push(<div className="seed-wrapper" style={{ height: "100px" }}></div>)
        }
        return (
            <div className="seedview">
                <span className="seedview-title">My favourite songs - {seeds.length}/5</span>
                <div className="seed-container" style={{ marginLeft: "10px" }} >
                    {seedDisplays
                        //seeds.length > 0 ? seedDisplays : <span>{EMPTY_SEEDVIEW_TEXT}</span>
                    }
                </div>
            </div>
        );
    }
}

export default SeedView;
