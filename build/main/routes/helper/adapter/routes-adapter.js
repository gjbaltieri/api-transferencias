"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeAdapter = void 0;
const routeAdapter = (controller) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const httpRequest = {
            body: req.body,
            user: req.user,
            query: req.query
        };
        const httpResponse = yield controller.handle(httpRequest);
        if (httpResponse.statusCode === 200) {
            return res.status(httpResponse.statusCode).json(httpResponse.body);
        }
        else {
            return res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
        }
    });
};
exports.routeAdapter = routeAdapter;
