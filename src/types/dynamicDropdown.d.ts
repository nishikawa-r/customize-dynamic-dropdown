import { Record as DefaultRecord } from '@kintone/rest-api-client/lib/client/types';
import { InSubtable } from '@kintone/rest-api-client/lib/KintoneFields/types/field';
import { api } from "@type/kintone-api"
export declare module dyDropDwn {
    type DropdownItem = {
        value: string;
        label?: string;
        isDisabled?: boolean;
    };
    type Dropdown = {
        items: DropdownItem[];
        value: string;
    };
    type kucTable = {
        [key: string]: kucTableItems
    }
    type kucTableItems = {
        type: string,
        columnLabel: string,
        defaultRowData: DropdownItem[] | null,
        isLookUp: boolean,
        lookUpField: string | null,
        lookUpTable: string | null,
        lookUpkey: string | null,
        doLookUpchange: string | null,
        parent: string | null,
        parentOptionCode: string | null,
        parentOptionTable: string | null,
        subTitle: string | null,
        app: number | null
    }
    type T = {
        [fieldCode: string]: InSubtable
    }
    type SubtableRow = {
        id: string;
        value: T;
    };
    type DefaultResp = {
        records: DefaultRecord[]
    }
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
        BranchNoList: DropdownItem[][],
        BranchNoArr: DropdownItem[],
        LookUpValue: string | null
    }
    type forDynamicValueAcquisition = {
        childObj: kucTable
    }
    type fieldsList = {
        (): string[];
    }

}
