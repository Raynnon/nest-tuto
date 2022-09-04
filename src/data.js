"use strict";
exports.__esModule = true;
exports.data = exports.ReportType = void 0;
var ReportType;
(function (ReportType) {
    ReportType["INCOME"] = "income";
    ReportType["EXPENSE"] = "expense";
})(ReportType = exports.ReportType || (exports.ReportType = {}));
exports.data = {
    report: [{
            id: "uuid1",
            source: "Salary",
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME
        },
        {
            id: "uuid2",
            source: "Youtube",
            amount: 2500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME
        }, {
            id: "uuid3",
            source: "Food",
            amount: 2500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE
        }]
};
/* data.report.push({
    id: "uuid",
    source: "Salary",
    amount: 7500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.INCOME
}) */ 
