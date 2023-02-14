import { dyDropDwn } from "@type/dynamicDropdown";
export const events = ['app.record.create.show', 'app.record.edit.show'];
export const tableCode = 'セット項目テーブル';
export const tableLabel = 'セット項目テーブル';
export const spaceCode = 'LookUp_Space';
export const kucTable: dyDropDwn.kucTable = {
    枝番号: {
        type: "dropdown",
        columnLabel: "枝番号",
        defaultRowData: [{ label: "-----", value: "-----" }],
        isLookUp: false,
        lookUpField: null,
        lookUpTable: "",
        lookUpkey: "",
        doLookUpchange: "",
        parent: "検査項目コード",
        parentOptionCode: "枝番号",
        parentOptionTable: "検査内容テーブル",
        subTitle: "枝名",
        app: 569
    },
    検査項目コード: {
        type: "dropdown",
        columnLabel: "検査項目コード",
        defaultRowData: "",
        isLookUp: false,
        lookUpField: null,
        lookUpTable: "",
        lookUpkey: "",
        doLookUpchange: "",
        parent: "",
        parentOptionCode: "検査項目コード",
        parentOptionTable: "",
        subTitle: "検査項目名",
        app: 569
    },
    検査項目名: {
        type: "text",
        columnLabel: "検査項目名",
        defaultRowData: "",
        isLookUp: true,
        lookUpField: "検査項目名",
        lookUpTable: "",
        lookUpkey: "検査項目コード",
        doLookUpchange: "検査項目コード",
        parent: "",
        parentOptionCode: "",
        parentOptionTable: "",
        subTitle: "",
        app: 569
    },
    枝名: {
        type: "text",
        columnLabel: "枝名",
        defaultRowData: "",
        isLookUp: true,
        lookUpField: "枝名",
        lookUpTable: "検査内容テーブル",
        lookUpkey: "枝番号",
        doLookUpchange: "枝番号",
        parent: "",
        parentOptionCode: "",
        parentOptionTable: "",
        subTitle: "",
        app: 569
    }
}
