# Dash Vega Components
With the `Vega` component, you can display [Vega-Altair](https://altair-viz.github.io/) charts in your [Plotly Dash](https://dash.plotly.com/) application. It also supports Vega-Lite and Vega specifications.


```bash
pip install dash-vega-components
```

## Altair example
For the example below, you'll also need:
```bash
pip install altair vega_datasets
```

```python
import altair as alt
from dash import Dash, Input, Output, callback, dcc, html
from vega_datasets import data

import dash_vega_components as dvc

# Passing a stylesheet is not required
app = Dash(
    __name__, external_stylesheets=["https://codepen.io/chriddyp/pen/bWLwgP.css"]
)

app.layout = html.Div(
    [
        html.H1("Altair Chart"),
        dcc.Dropdown(["All", "USA", "Europe", "Japan"], "All", id="origin-dropdown"),
        # Optionally, you can pass options to the Vega component.
        # See https://github.com/vega/vega-embed#options for more details.
        dvc.Vega(id="altair-chart", opt={"renderer": "svg", "actions": False}),
    ]
)


@callback(Output("altair-chart", "spec"), Input("origin-dropdown", "value"))
def display_altair_chart(origin):
    source = data.cars()

    if origin != "All":
        source = source[source["Origin"] == origin]

    chart = (
        alt.Chart(source)
        .mark_circle(size=60)
        .encode(
            x="Horsepower",
            y="Miles_per_Gallon",
            color=alt.Color("Origin").scale(domain=["Europe", "Japan", "USA"]),
            tooltip=["Name", "Origin", "Horsepower", "Miles_per_Gallon"],
        )
        .interactive()
    )
    return chart.to_dict()


if __name__ == "__main__":
    app.run(debug=True)
```
![Example](https://raw.githubusercontent.com/binste/dash-vega-components/main/dvc_example.gif)


You can also pass a Vega or Vega-Lite specification as a dictionary.


## Development
Requires npm
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt

npm install
npm run build
# Test package with
python usage.py
```
Visit http://localhost:8050 in your web browser

To cut a new release, see [RELEASING.md](./RELEASING.md)

This package is based on the [dash-component-boilerplate template](https://github.com/plotly/dash-component-boilerplate).
