sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ord.orders.controller.View1", {
        onInit() {
        },
        onItemPress: function (oEvent) {
            // debugger;
            var orderId = oEvent.getParameter("listItem").getBindingContext().getProperty("OrderID");
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detailLoad", {
                "ordId": orderId
            })
        }
    });
});