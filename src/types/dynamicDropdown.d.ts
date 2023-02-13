import {
    DropdownItem as defaultDropDownItem,
    Table as kucTable
} from "kintone-ui-component";
import { Record as DefaultRecord } from '@kintone/rest-api-client/lib/client/types';
import { InSubtable } from '@kintone/rest-api-client/lib/KintoneFields/types/field';
import { api } from "@type/kintone-api"
export declare module dyDropDwn {
    type DropdownItem = defaultDropDownItem;

    type DefaultResp = {
        records: DefaultRecord[]
    }
    type T = {
        [fieldCode: string]: InSubtable
    }
    type SubtableRow = {
        id?: string;
        value?: Array<T>;
    };
    type defaultObj = {
        type: string,
        columnLabel: string,
        defaultRowData: DropdownItem[],
        isLookUp: boolean,
        lookUpField: string | null,
        lookUpTable: string,
        lookUpkey: string,
        doLookUpchange: string,
        parent: string,
        parentOptionCode: string,
        parentOptionTable: string,
        subTitle: string,
        app: string | number
    };
    type Settings = {
        requestAllCodeBody: api.param.get,
        Code: string | null,
        BranchCode: string | null,
        kucTable: kucTable,
        propertyArr: Array<String>
    }
    type RespValue = {
        AllCodeResponceValue: { [key: string]: DefaultResp },
        CodeArr: DropdownItem[],
        BranchNoList: Array<string> | null,
        BranchNoArr: DropdownItem[],
        LookUpValue: string | null
    }

}
