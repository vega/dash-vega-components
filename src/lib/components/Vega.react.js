import React from 'react';
import PropTypes from 'prop-types';
import { Vega as RealComponent } from '../LazyLoader';

const Vega = (props) => {
    return (
        <React.Suspense fallback={null}>
            <RealComponent {...props} />
        </React.Suspense>
    );
};

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

export default Vega;

export const defaultProps = Vega.defaultProps;
export const propTypes = Vega.propTypes;
