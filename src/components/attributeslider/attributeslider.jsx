import React, { Component } from 'react';
import Slider from 'react-input-slider';

class AttributeSlider extends Component {

    timeout = null;

    state = {
        value: null
    }

    componentDidMount = () => {
        let value = this.props.attribute.value;
        if (this.props.attribute.name === "tempo") value = (this.props.attribute.value - 80) / 80
        this.setState({ value })
    }

    onChangeTimeoutHandler = () => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.onAttributeChangeCallback(this.state.value, this.props.attribute)
        }, 300);
    }

    render() {
        const { attribute, selecting } = this.props
        let colors = selecting ? ['#b3b3b3', '#535353', '#181818'] : ['#b3b3b3', '#f59542', '#f07307'];
        let disabled = selecting

        return (
            <div className="attribute-slider">
                <span style={{color: "#1db954"}}>{attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1)} </span>
                <Slider
                    axis="x"
                    xstep={.05}
                    xmin={0}
                    xmax={1}
                    x={this.state.value}
                    disabled={disabled}
                    onChange={({ x }) => { this.setState({ value: x }); this.onChangeTimeoutHandler() }}
                    styles={{
                        track: { backgroundColor: colors[0] }, active: { backgroundColor: colors[1] },
                        thumb: { width: 20, height: 20, backgroundColor: colors[2] }
                    }}
                />
            </div>
        );
    }
}

export default AttributeSlider;
