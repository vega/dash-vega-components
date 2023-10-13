import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import vegaEmbed, { EmbedOptions } from 'vega-embed';


export default class Vega extends Component {
    constructor(props) {
        super(props);
        this.getRef = this.getRef.bind(this);
        this.divId = "vega-".concat(uuidv4());
    }

    getRef(el) {
        this.el = el;
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate(prevProps) {
        if (this.props.spec !== prevProps.spec) {
            this.update();
        }
    }

    update() {
        if (!this.props.spec) { return; }
        vegaEmbed(this.el, this.props.spec, this.props.opt)
    }

    render() {
        return <div id={this.divId} ref={this.getRef} />;
    }
}

Vega.defaultProps = {};

Vega.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * A Vega or Vega-Lite spec
     */
    spec: PropTypes.object,

    /**
     * Vega-Embed options
     */
    opt: PropTypes.object,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
