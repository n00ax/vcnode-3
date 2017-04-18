/* Include Handler Nodes Here */

const route_roleSelector = require("../routes/role-selector/role-selector.js")
const route_dashboard = require("../routes/dashboard/dashboard.js")

/* End */


module.exports = {
    getMap : [
        {
            destinationName : "root",
            destinationPath : "/",
            destinationHandler : route_dashboard.dashboard,
            destinationSubroutes : [
                {
                     destinationName : "subindex",
                     destinationPath : "/subindex",
                     destinationHandler : (req, resp) => {},
                }
            ]
        },
        {
            destinationName : "role selector",
            destinationPath : "/role-selector",
            destinationHandler : route_roleSelector.roleSelector,
            destinationSubroutes : [
                {
                    destinationName: "selected get recall",
                    destinationPath : "/role-selector/select",
                    destinationHandler : route_roleSelector.select
                }
            ]
        }
    ],
    postMap : [

    ],
    putMap : [

    ],
    staticMap : [
        "ui/static"
    ]
}