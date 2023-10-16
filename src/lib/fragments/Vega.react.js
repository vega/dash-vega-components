import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import vegaEmbed, { EmbedOptions } from 'vega-embed';
import * as d3 from 'd3';


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
        if (this.props.id !== prevProps.id ||
            this.props.svgRendererScaleFactor !== prevProps.svgRendererScaleFactor ||
            JSON.stringify(this.props.opt) !== JSON.stringify(prevProps.opt) ||
            JSON.stringify(this.props.spec) !== JSON.stringify(prevProps.spec)
        ) {
            this.update();
        }
    }

    update() {
        if (!this.props.spec) { return; }
        vegaEmbed(this.el, this.props.spec, this.props.opt).then(() => {
            const options = this.props.opt || {};
            const renderer = options.renderer || 'canvas';
            if (renderer === 'svg' && this.props.svgRendererScaleFactor !== 1) {
                // Adjustment of width and height is based on https://github.com/vega/vega-lite/issues/1758#issuecomment-264677556
                const svg = d3.select("#" + this.divId + " svg");
                const scaleFactor = this.props.svgRendererScaleFactor;
                const w = svg.attr("width");
                const h = svg.attr("height");
                svg.attr("width", w * scaleFactor);
                svg.attr("height", h * scaleFactor);
            }
        })
    }

    render() {
        return <div id={this.divId} ref={this.getRef} />;
    }
}

Vega.defaultProps = { svgRendererScaleFactor: 1 };

Vega.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * A Vega or Vega-Lite spec. To pass an Altair chart, use chart.to_dict().
     */
    spec: PropTypes.object,

    /**
     * Vega-Embed options. See https://github.com/vega/vega-embed#options for more details.
     */
    opt: PropTypes.object,

    /**
     * A number which is used to scale the chart in case the svg renderer is used.
     * This is useful when you want to increase the size of the chart keeping
     * the relative proportions of all chart elements to each other the same.
     * Default value is 1.
     */
    svgRendererScaleFactor: PropTypes.number,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
