"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AppController = void 0;
var common_1 = require("@nestjs/common");
var data_1 = require("./data");
var notFound = new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
var filteredType = function (type) {
    if (type === data_1.ReportType.INCOME || type === data_1.ReportType.EXPENSE) {
        return data_1.data.report.filter(function (report) {
            return report.type === type;
        });
    }
    throw notFound;
};
var AppController = /** @class */ (function () {
    function AppController() {
    }
    AppController.prototype.getAllReports = function (type) {
        return filteredType(type);
    };
    AppController.prototype.getReportById = function (type, id) {
        var filteredReport = filteredType(type).find(function (report) { return report.id === id; });
        if (filteredReport) {
            return filteredReport;
        }
        throw notFound;
    };
    AppController.prototype.createReport = function (body) {
        var newReport = {
            id: id
        };
        return "created";
    };
    AppController.prototype.UpdateReportById = function () {
        return "Updated";
    };
    AppController.prototype.DeleteReportById = function () {
        return "Deleted";
    };
    __decorate([
        (0, common_1.Get)(),
        __param(0, (0, common_1.Param)("type"))
    ], AppController.prototype, "getAllReports");
    __decorate([
        (0, common_1.Get)(":id"),
        __param(0, (0, common_1.Param)("type")),
        __param(1, (0, common_1.Param)("id"))
    ], AppController.prototype, "getReportById");
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], AppController.prototype, "createReport");
    __decorate([
        (0, common_1.Put)(":id")
    ], AppController.prototype, "UpdateReportById");
    __decorate([
        (0, common_1.Delete)(":id")
    ], AppController.prototype, "DeleteReportById");
    AppController = __decorate([
        (0, common_1.Controller)("/report/:type")
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
