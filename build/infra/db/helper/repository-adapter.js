"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryAdapter = void 0;
const data_source_1 = require("../../../main/data-source");
class RepositoryAdapter {
    get(value) {
        return data_source_1.appDataSource.getRepository(value);
    }
}
exports.RepositoryAdapter = RepositoryAdapter;
