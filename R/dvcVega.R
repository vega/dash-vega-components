# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dvcVega <- function(id=NULL, opt=NULL, spec=NULL) {
    
    props <- list(id=id, opt=opt, spec=spec)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Vega',
        namespace = 'dash_vega_components',
        propNames = c('id', 'opt', 'spec'),
        package = 'dashVegaComponents'
        )

    structure(component, class = c('dash_component', 'list'))
}
