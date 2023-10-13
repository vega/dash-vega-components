# AUTO GENERATED FILE - DO NOT EDIT

export dvc_vega

"""
    dvc_vega(;kwargs...)

A Vega component.

Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `opt` (Dict; optional): Vega-Embed options
- `spec` (Dict; optional): A Vega or Vega-Lite spec
"""
function dvc_vega(; kwargs...)
        available_props = Symbol[:id, :opt, :spec]
        wild_props = Symbol[]
        return Component("dvc_vega", "Vega", "dash_vega_components", available_props, wild_props; kwargs...)
end

