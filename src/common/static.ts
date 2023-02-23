import { dyDropDwn } from "@type/dynamicDropdown";
export const events = ['app.record.create.show', 'app.record.edit.show'];
export const tableCode = '商品在庫数テーブル';
export const tableLabel = '商品在庫数テーブル';
export const spaceCode = 'LookUp_Space';
export const recordErrorMessage = "レコードの値が重複しているためルックアップが取得できません"
export const subTableErrorMessage = "サブテーブルの値が重複しているためルックアップが取得できません"
export const successMessage = "参照先からデータが取得されました"
export const duplicateError = "値が重複しているためサブタイトルが表示できません"
export const alertHideMessage = "アラートを閉じる"
export const kucTable: dyDropDwn.kucTable = {
    商品カテゴリー: {
        type: "dropdown",
        columnLabel: "商品カテゴリー",
        defaultRowData: [{ label: "-----", value: "-----" }],
        isLookUp: false,
        lookUpField: null,
        lookUpTable: "",
        lookUpkey: "",
        doLookUpchange: "",
        parent: "",
        parentOptionCode: "商品カテゴリー",
        parentOptionTable: "",
        subTitle: "商品例",
        app: 2
    },
    商品名: {
        type: "dropdown",
        columnLabel: "商品名",
        defaultRowData: [{ label: "-----", value: "-----" }],
        isLookUp: false,
        lookUpField: null,
        lookUpTable: "",
        lookUpkey: "",
        doLookUpchange: "",
        parent: "商品カテゴリー",
        parentOptionCode: "商品名",
        parentOptionTable: "商品テーブル",
        subTitle: "メーカー",
        app: 2
    },
    商品在庫数: {
        type: "dropdown",
        columnLabel: "商品在庫数",
        defaultRowData: [{ label: "-----", value: "-----" }],
        isLookUp: false,
        lookUpField: null,
        lookUpTable: "",
        lookUpkey: "",
        doLookUpchange: "",
        parent: "商品カテゴリー",
        parentOptionCode: "在庫数",
        parentOptionTable: "在庫数ドロップダウン用テーブル",
        subTitle: "",
        app: 2
    },
    単位: {
        type: "text",
        columnLabel: "単位",
        defaultRowData: "",
        isLookUp: true,
        lookUpField: "単位",
        lookUpTable: "商品テーブル",
        lookUpkey: "商品名",
        doLookUpchange: "商品名",
        parent: "",
        parentOptionCode: "",
        parentOptionTable: "",
        subTitle: "",
        app: 2
    },
    商品例: {
        type: "text",
        columnLabel: "商品例",
        defaultRowData: "",
        isLookUp: true,
        lookUpField: "メーカー",
        lookUpTable: "商品テーブル",
        lookUpkey: "商品名",
        doLookUpchange: "商品名",
        parent: "",
        parentOptionCode: "",
        parentOptionTable: "",
        subTitle: "",
        app: 2
    },
}
