import React, { Component } from 'react';
import { Seed } from '../../../components';

import { EMPTY_SEEDVIEW_TEXT } from '../../../constants'

class SeedView extends Component {
    render() {
        const { seeds, onSelectionRemoveCallback, informationRequestCallback } = this.props
        const seedDisplays = seeds.map(seed =>
            <Seed key={seed.id} seed={seed}
                onSelectionRemoveCallback={onSelectionRemoveCallback} informationRequestCallback={informationRequestCallback} />)
        return (
            <div className="seedview">
                <span className="seedview-title">My Seeds - {seeds.length}/5</span>
                <div className="seed-container" style={{marginLeft: "10px"}} >
                    {seeds.length > 0 ? seedDisplays : <span>{EMPTY_SEEDVIEW_TEXT}</span>}
                </div>
            </div>
        );
    }
}

export default SeedView;
