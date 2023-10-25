import React from 'react';
import PropTypes from 'prop-types';
import { Vega as RealComponent } from '../LazyLoader';

/**
 * You can use this component to display Altair charts or Vega-Lite/Vega specifications in your Dash app.
 */
const Vega = (props) => {
    return (
        <React.Suspense fallback={null}>
            <RealComponent {...props} />
        </React.Suspense>
    );
};

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

export default Vega;

export const defaultProps = Vega.defaultProps;
export const propTypes = Vega.propTypes;
