import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import vegaEmbed, { EmbedOptions } from 'vega-embed';
import * as d3 from 'd3';
import * as debounce from 'lodash.debounce';


export default class Vega extends Component {
    constructor(props) {
        super(props);
        this.getRef = this.getRef.bind(this);
        this.divId = "vega-".concat(uuidv4());
        this.finalize = null;
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
            JSON.stringify(this.props.spec) !== JSON.stringify(prevProps.spec) ||
            JSON.stringify(this.props.style) !== JSON.stringify(prevProps.style) ||
            JSON.stringify(this.props.signalsToObserve) !== JSON.stringify(prevProps.signalsToObserve) ||
            this.props.className !== prevProps.className
        ) {
            this.update();
        }
    }

    cleanJson(data) {
        return JSON.parse(JSON.stringify(data))
    }

    update() {
        if (!this.props.spec) { return; }
        // Function exists if a view has been rendered before with this component
        // If so, it's better to call finalize before creating a new view to clean up
        // timers, event listeners, etc.
        if (this.finalize) { this.finalize(); }

        vegaEmbed(this.el, this.props.spec, this.props.opt).then((result) => {
            this.finalize = result.finalize;
            this.vegaView = result.view;
            let vegaSignals = this.vegaView.getState().signals || {};
            // Ignore the 'unit' signal as it's rather complex,
            // contains references which can't be serialized to JSON, and it's
            // not useful to most users in the Dash context
            if ('unit' in vegaSignals) {
                delete vegaSignals.unit;
            };
            // Only add signals to the props if they are in the signalsToObserve
            // list or if the list is equal to ['all'].
            // If the list is empty, no signals will be added to the props.
            let filteredSignals = {};
            if (this.props.signalsToObserve[0] === 'all') {
                filteredSignals = vegaSignals;
            } else {
                for (let signal in vegaSignals) {
                    if (this.props.signalsToObserve.includes(signal)) {
                        filteredSignals[signal] = vegaSignals[signal];
                    }
                }
            }
            vegaSignals = filteredSignals;

            // Initially, set all signals so that the evaluated values are available
            // even if they never change. Else, the code below would only add
            // signals to the props if they change.
            this.props.setProps({ signalData: vegaSignals });

            const wait = this.props.debounceWait;
            const maxWait = wait;

            // Register signal listeners to update the props when signals change.
            const signalHandler = (name, value) => {
                // Not sure if this is needed but it's in the Jupyterchart
                // implementation in Vega-Altair. Worth to be
                // on the safe side for now.
                const cleanedValue = this.cleanJson(value);
                // Get a shallow copy of the signals. Shallow should be enough
                // as we overwrite the top level values anyway.
                let signalData = { ...this.props.signalData };
                signalData[name] = cleanedValue;
                this.props.setProps({ signalData: signalData });
            };
            for (let signal in vegaSignals) {
                this.vegaView.addSignalListener(signal, debounce(signalHandler, wait, { maxWait: maxWait }));
            }

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
        return <div id={this.divId} ref={this.getRef} className={this.props.className} style={this.props.style} />;
    }
}

Vega.defaultProps = { svgRendererScaleFactor: 1, signalsToObserve: [], signalData: {}, debounceWait: 10 };

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
     * A list of signal names to observe for changes. If you use Altair, these are the
     * names of the parameters you define. The values of these signals
     * will be available in the signalData property. You can pass ["all"] to
     * observe all signals.
     * Defaults to no signals.
     */
    signalsToObserve: PropTypes.arrayOf(PropTypes.string),

    /**
     * A read-only dictionary of signals with the key being the name of the signal.
     * The easiest way to make sense of it is to display the whole signalData dictionary
     * in your app layout or print it to the console
     * so that you see what the structure looks like.
     */
    signalData: PropTypes.object,

    /**
     * Generic style overrides on the Vega div
     */
    style: PropTypes.object,

    /**
     * Additional className of the Vega div
     */
    className: PropTypes.string,

    /**
     * Debouncing wait time in milliseconds before signals property is updated
     * Default value is 10.
     */
    debounceWait: PropTypes.number,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
