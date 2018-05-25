"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var regex_service_1 = require("./regex.service");
describe('RegexService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [regex_service_1.RegexUtils]
        });
    });
    it('should be created', testing_1.inject([regex_service_1.RegexUtils], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=regex.service.spec.js.map