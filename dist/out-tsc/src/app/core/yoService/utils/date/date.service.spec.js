"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var date_service_1 = require("./date.service");
describe('DateService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [date_service_1.DateUtils]
        });
    });
    it('should be created', testing_1.inject([date_service_1.DateUtils], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=date.service.spec.js.map