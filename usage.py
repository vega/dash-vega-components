import altair as alt
from dash import Dash, Input, Output, callback, html
from vega_datasets import data

import dash_vega_components as dvc

app = Dash(__name__)

app.layout = html.Div(
    [
        html.H1("Vega Chart", id="header1"),
        dvc.Vega(id="vega-chart"),
        html.H1("Vega-Lite Chart"),
        dvc.Vega(id="vega-lite-chart"),
        html.H1("Altair Charts"),
        # Scale factor should not do anything here as renderer is not svg
        dvc.Vega(id="altair-chart", opt={"actions": False}, svgRendererScaleFactor=2),
        # Here it should work
        dvc.Vega(
            id="altair-chart-scaled",
            opt={"renderer": "svg"},
            svgRendererScaleFactor=1.3,
        ),
    ]
)


@callback(Output("vega-lite-chart", "spec"), Input("header1", "children"))
def display_vega_lite_chart(_):
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart with embedded data.",
        "data": {
            "values": [
                {"a": "A", "b": 28},
                {"a": "B", "b": 55},
                {"a": "C", "b": 43},
                {"a": "D", "b": 91},
                {"a": "E", "b": 81},
                {"a": "F", "b": 53},
                {"a": "G", "b": 19},
                {"a": "H", "b": 87},
                {"a": "I", "b": 52},
            ]
        },
        "mark": "bar",
        "encoding": {
            "x": {"field": "a", "type": "nominal", "axis": {"labelAngle": 0}},
            "y": {"field": "b", "type": "quantitative"},
        },
    }


@callback(Output("vega-chart", "spec"), Input("header1", "children"))
def display_vega_chart(_):
    return {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "description": "A basic stacked bar chart example.",
        "width": 500,
        "height": 200,
        "padding": 5,
        "data": [
            {
                "name": "table",
                "values": [
                    {"x": 0, "y": 28, "c": 0},
                    {"x": 0, "y": 55, "c": 1},
                    {"x": 1, "y": 43, "c": 0},
                    {"x": 1, "y": 91, "c": 1},
                    {"x": 2, "y": 81, "c": 0},
                    {"x": 2, "y": 53, "c": 1},
                    {"x": 3, "y": 19, "c": 0},
                    {"x": 3, "y": 87, "c": 1},
                    {"x": 4, "y": 52, "c": 0},
                    {"x": 4, "y": 48, "c": 1},
                    {"x": 5, "y": 24, "c": 0},
                    {"x": 5, "y": 49, "c": 1},
                    {"x": 6, "y": 87, "c": 0},
                    {"x": 6, "y": 66, "c": 1},
                    {"x": 7, "y": 17, "c": 0},
                    {"x": 7, "y": 27, "c": 1},
                    {"x": 8, "y": 68, "c": 0},
                    {"x": 8, "y": 16, "c": 1},
                    {"x": 9, "y": 49, "c": 0},
                    {"x": 9, "y": 15, "c": 1},
                ],
                "transform": [
                    {
                        "type": "stack",
                        "groupby": ["x"],
                        "sort": {"field": "c"},
                        "field": "y",
                    }
                ],
            }
        ],
        "scales": [
            {
                "name": "x",
                "type": "band",
                "range": "width",
                "domain": {"data": "table", "field": "x"},
            },
            {
                "name": "y",
                "type": "linear",
                "range": "height",
                "nice": True,
                "zero": True,
                "domain": {"data": "table", "field": "y1"},
            },
            {
                "name": "color",
                "type": "ordinal",
                "range": "category",
                "domain": {"data": "table", "field": "c"},
            },
        ],
        "axes": [
            {"orient": "bottom", "scale": "x", "zindex": 1},
            {"orient": "left", "scale": "y", "zindex": 1},
        ],
        "marks": [
            {
                "type": "rect",
                "from": {"data": "table"},
                "encode": {
                    "enter": {
                        "x": {"scale": "x", "field": "x"},
                        "width": {"scale": "x", "band": 1, "offset": -1},
                        "y": {"scale": "y", "field": "y0"},
                        "y2": {"scale": "y", "field": "y1"},
                        "fill": {"scale": "color", "field": "c"},
                    },
                    "update": {"fillOpacity": {"value": 1}},
                    "hover": {"fillOpacity": {"value": 0.5}},
                },
            }
        ],
    }


@callback(
    Output("altair-chart", "spec"),
    Output("altair-chart-scaled", "spec"),
    Input("header1", "children"),
)
def display_altair_chart(_):
    source = data.cars()

    chart = (
        alt.Chart(source)
        .mark_circle(size=60)
        .encode(
            x="Horsepower",
            y="Miles_per_Gallon",
            color="Origin",
            tooltip=["Name", "Origin", "Horsepower", "Miles_per_Gallon"],
        )
        .interactive()
    )
    spec = chart.to_dict()
    return spec, spec


if __name__ == "__main__":
    app.run_server(debug=True)
