# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Vega(Component):
    """A Vega component.
You can use this component to display Altair charts or Vega-Lite/Vega specifications in your Dash app.

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- opt (dict; optional):
    Vega-Embed options. See https://github.com/vega/vega-embed#options
    for more details.

- spec (dict; optional):
    A Vega or Vega-Lite spec. To pass an Altair chart, use
    chart.to_dict().

- svgRendererScaleFactor (number; optional):
    A number which is used to scale the chart in case the svg renderer
    is used. This is useful when you want to increase the size of the
    chart keeping the relative proportions of all chart elements to
    each other the same. Default value is 1."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_vega_components'
    _type = 'Vega'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, spec=Component.UNDEFINED, opt=Component.UNDEFINED, svgRendererScaleFactor=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'opt', 'spec', 'svgRendererScaleFactor']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'opt', 'spec', 'svgRendererScaleFactor']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(Vega, self).__init__(**args)
