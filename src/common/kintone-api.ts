import { KintoneRestAPIClient } from '../../node_modules/@kintone/rest-api-client';
import { api } from '@type/kintone-api';

export class kintoneApi {
    public client: KintoneRestAPIClient;
    constructor() {
        this.client = new KintoneRestAPIClient();
    }
    public async GetTestingItems(params: api.param.get): Promise<api.get<api.RecordData[]>> {
        return await this.client.record.getAllRecords(params).then((resp) => resp).catch((err) => err);
    }
}
