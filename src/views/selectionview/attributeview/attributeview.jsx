import React, { Component } from 'react';
import { AttributeSlider } from '../../../components';
import { EMPTY_ATTRIBUTE_TEXT } from '../../../constants'

class AttributeView extends Component {
    render() {
        const { onAttributeChangeCallback, attributes, selecting } = this.props
        const attributesDisplayed = attributes.map((attribute, index) => {
            return <AttributeSlider key={index} attribute={attribute} selecting={selecting} onAttributeChangeCallback={onAttributeChangeCallback} />;
        })
        return (
            <div className="attributeview">
                {
                    selecting ?
                        <><span className="attributeview-title">Get started</span><span>{EMPTY_ATTRIBUTE_TEXT}</span></>
                        : <><span className="attributeview-title">Track attributes</span>{attributesDisplayed}</>
                }
            </div>
        );
    }
}

export default AttributeView;
