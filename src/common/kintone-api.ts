import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { api } from '@type/kintone-api';

class kintoneApi {
    public client: KintoneRestAPIClient;
    constructor() {
        this.client = new KintoneRestAPIClient();
    }
    public async getAllRecords(params: api.param.get): Promise<api.RecordData[]> {
        return await this.client.record.getAllRecords(params);
    }
}
export default kintoneApi
