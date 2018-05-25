"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var daum_post_service_1 = require("./daum-post.service");
describe('DaumPostService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [daum_post_service_1.DaumPostService]
        });
    });
    it('should be created', testing_1.inject([daum_post_service_1.DaumPostService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=daum-post.service.spec.js.map