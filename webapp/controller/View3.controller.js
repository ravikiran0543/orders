sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ord.orders.controller.View3", {
        onInit() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRouteMatched(this.bindSF, this);
        },
        bindSF : function(oEvent){
            var that = this;
            if (oEvent.getParameter("name")==="formLoad") {
                var prodId = oEvent.getParameter("arguments").prodId;

                var oModel = this.getOwnerComponent().getModel();

                oModel.read("/Products("+prodId+")",{
                    success : function(oData){
                        debugger;
                        var oJson = new sap.ui.model.json.JSONModel(oData);
                        that.getView().byId("sfId").setModel(oJson);
                    },
                    error : function(oErr){
                        console.log(oErr);
                    }
                    
                }

                )
            
            }
            
        },
        backtoDetailView : function(){
            this.getOwnerComponent().getRouter().navTo("detailLoad");
        }
    });
});