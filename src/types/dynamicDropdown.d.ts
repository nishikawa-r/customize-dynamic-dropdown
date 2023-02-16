import { Record as DefaultRecord } from '@kintone/rest-api-client/lib/client/types';
import { InSubtable } from '@kintone/rest-api-client/lib/KintoneFields/types/field';
import { api } from "@type/kintone-api"
import { TableColumn, CellRendererProps } from "@kintone/kintone-ui-component"
import React from 'react';
export declare module dyDropDwn {
    type DropdownItem = {
        value: string;
        label?: string;
        isDisabled?: boolean;
    };
    type TextProps = {
        value?: string;
        isDisabled?: boolean;
        isVisible?: boolean;
        placeholder?: string;
        onChange?: (value: string | null) => void;
        onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
    };
    type column = {
        header: string;
        tdProps?: (cellProps: CellRendererProps) => Record<string, any>;
        cell: (cellProps: CellRendererProps) => JSX.Element;
    };
    type Dropdown = {
        items?: DropdownItem[];
        value?: string;
    };
    type defaultData = {
        items?: DropdownItem[];
        value?: string;
    }
    type kucTable = {
        [key: string]: kucTableItems
    }
    type kucTableItems = {
        type: string,
        columnLabel: string,
        defaultRowData: DropdownItem[] | null | string,
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
        defaultRowData: DropdownItem[] | string,
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
        propertyArr: Array<string>
    }
    type LookUp = {
        [fieldCode: string]: string
    }
    type RespValue = {
        AllCodeResponceValue: { [key: string]: DefaultResp },
        CodeArr: DropdownItem[],
        BranchNoList: DropdownItem[][],
        BranchNoArr: DropdownItem[],
        LookUpValue: LookUp | null
    }
    type forDynamicValueAcquisition = {
        childObj: kucTable
    }
    type fieldsList = {
        (): string[];
    }

}
