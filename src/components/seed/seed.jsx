import React, { Component } from 'react';
import Track from '../item/track/track';
import Artist from '../item/artist/artist';
import Button from '../button/button';

import { CONTING_DELAY, TRACKTYPE, ARTISTTYPE, INTERFACE_TYPE } from '../../constants';

class Selection extends Component {
    timeout = null;

    handleMouseOver = (id, type, event) => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.props.informationRequestCallback(id, type, event), CONTING_DELAY);
    }

    render() {
        const { type, id } = this.props.seed
        return (
            <div>
                {(INTERFACE_TYPE === "hover") ?
                    // interface type ="hover"
                    <div className="seed-wrapper" onMouseOver={(e) => this.handleMouseOver(id, type, e)} onMouseLeave={() => clearTimeout(this.timeout)}>
                        {type === TRACKTYPE && <Track type="seed" track={this.props.seed} />}
                        {type === ARTISTTYPE && <Artist type="seed" artist={this.props.seed} />}
                        <Button className="remove" buttonType="removeButton" onClick={() => this.props.onSelectionRemoveCallback(this.props.seed)} />
                    </div> :
                    // interface type = "mouse"
                    <div className="seed-wrapper" onContextMenu={(e) => this.props.informationRequestCallback(id, type, e)} >
                        {type === TRACKTYPE && <Track type="seed" track={this.props.seed} />}
                        {type === ARTISTTYPE && <Artist type="seed" artist={this.props.seed} />}
                        <Button className="remove" buttonType="removeButton" onClick={() => this.props.onSelectionRemoveCallback(this.props.seed)} />
                    </div>


                }
            </div>
        );
    }
}

export default Selection;
