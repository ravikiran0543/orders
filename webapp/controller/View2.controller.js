sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (Controller, Filter, FilterOperator, Sorter) => {
    "use strict";

    return Controller.extend("ord.orders.controller.View2", {
        onInit() {
            // debugger;
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRouteMatched(this.bindTableData, this);

        },
        oModel: null,
        bindTableData: function (oEvent) {
            if (oEvent.getParameter("name") !== "detailLoad") {
                return;
            }
            var that = this;
            var orderId = oEvent.getParameter("arguments").ordId;
            var tableObj = this.byId("_IDGenTable");
           
            this.oModel = this.getOwnerComponent().getModel();
            this.oModel.read("/Orders(" + orderId + ")/Order_Details", {
                // filters: [new Filter("OrderID", FilterOperator.EQ, orderId)],

                // sorter: [
                //     new Sorter("OrderID", false)  // Sort by ProductName, descending
                // ],
                success: function (oData) {
                    console.log(oData);
                    var oJson = new sap.ui.model.json.JSONModel(oData);
                    that.getView().byId("_IDGenTable").setModel(oJson);
                    
                    var oTable = tableObj;
                    // oTable.bindItems("/results");

                    oTable.bindItems({
                        path: "/results",   // Path to the entity set in the model
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: "{OrderID}" }), // Binding to ProductName property
                                new sap.m.Text({ text: "{ProductID}" }),
                                new sap.m.Text({ text: "{UnitPrice}" }),
                                new sap.m.Text({ text: "{Quantity}" }),
                                new sap.m.Text({ text: "{Discount}" })
                            ]
                        })
                    });
                },
                error: function (oErr) {
                    console.log(oErr);
                }
            })


        },

        backToEmpty: function () {
            this.getOwnerComponent().getRouter().navTo("masterMain");
        },

      
        onTableSelect: function (oEvent) {
            debugger;
            var prodId = oEvent.getParameter("listItem").getBindingContext().getProperty("ProductID");
            this.getOwnerComponent().getRouter().navTo("formLoad",{
                "prodId" : prodId
            })
        }



    });
});