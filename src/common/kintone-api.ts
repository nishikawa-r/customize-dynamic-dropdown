import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { api } from '@type/kintone-api';

export class kintoneApi {
    public readonly client: KintoneRestAPIClient;
    constructor() {
        this.client = new KintoneRestAPIClient();
    }
    public async GetTestingItems(params: api.param.get): Promise<api.get<api.RecordData[]>> {
        return await this.client.record.getAllRecords(params).then((resp) => resp).catch((err) => err);
    }
    public async GetFormFieldDetail(params: api.param.getAppField): Promise<api.response.appField> {
        return await this.client.app.getFormFields(params).then((resp) => resp).catch((err) => err);
    }
}
