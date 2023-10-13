import altair as alt
from dash import Dash, Input, Output, callback, dcc, html
from vega_datasets import data

import dash_vega_components

app = Dash(__name__)

app.layout = html.Div(
    [
        html.H1("Altair Chart"),
        dcc.Dropdown(["USA", "Europe", "Japan"], "USA", id="origin-dropdown"),
        dash_vega_components.Vega(
            id="altair-chart", opt={"renderer": "svg", "actions": False}
        ),
    ]
)


@callback(Output("altair-chart", "spec"), Input("origin-dropdown", "value"))
def display_altair_chart(origin):
    source = data.cars()

    source = source[source["Origin"] == origin]

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
    return chart.to_dict()


if __name__ == "__main__":
    app.run_server(debug=True)
