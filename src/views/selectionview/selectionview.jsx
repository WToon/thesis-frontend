import React, { Component } from 'react';

import AttributeView from './attributeview/attributeview';
import SeedView from './seedview/seedview';

class SelectionView extends Component {

    render() {
        const { seeds, attributes, onSelectionRemoveCallback, onAttributeChangeCallback, informationRequestCallback, selecting } = this.props
        return (
            <div className="selectionview-container ">
                <div className="title" >Selections</div>
                <AttributeView className="attribute-view" attributes={attributes} onAttributeChangeCallback={onAttributeChangeCallback} selecting={selecting} />

                <SeedView className="seed-view" seeds={seeds} onSelectionRemoveCallback={onSelectionRemoveCallback} informationRequestCallback={informationRequestCallback} />
            </div>
        );
    }
}

export default SelectionView;
