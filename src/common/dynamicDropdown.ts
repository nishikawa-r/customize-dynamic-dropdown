import { dyDropDwn } from "@type/dynamicDropdown";
import { Table as kucTable } from "kintone-ui-component"
import { KintoneRestAPIClient, KintoneRecordField } from '@kintone/rest-api-client';
import { Subtable, InSubtable } from "@kintone/rest-api-client/lib/KintoneFields/types/field";

class dynamicDropdown {
    public Settings: dyDropDwn.Settings;
    public RespValue: dyDropDwn.RespValue;
    constructor() {
        this.RespValue = {
            AllCodeResponceValue: {},
            CodeArr: [],
            BranchNoList: [],
            BranchNoArr: [],
            LookUpValue: null
        }
        this.Settings = {
            requestAllCodeBody: {
                app: 0,
                condition: "order by レコード番号 asc",
                fields: []
            },
            Code: null,
            BranchCode: null,
            kucTable: new kucTable(),
            propertyArr: []
        }
    }
    public CodeOptionsList(parentObj: dyDropDwn.defaultObj) {
        let self = this;
        let CodeList: dyDropDwn.DropdownItem[] = [];
        this.RespValue.CodeArr = [{ label: "-----", value: "-----" }];
        console.log(this.RespValue.CodeArr, parentObj);
        console.log(parentObj);
        this.RespValue.AllCodeResponceValue[parentObj.app].records.forEach((element) => {
            console.log(element);
            let subTitle = (parentObj.subTitle != "") ? `(${element[parentObj.subTitle].value})` : "";
            CodeList.push({ "label": element[parentObj.parentOptionCode].value + subTitle, "value": element[parentObj.parentOptionCode].value?.toString() });
            CodeList.forEach((ele, index) => {
                self.RespValue.CodeArr[index + 1] = ele;
                console.log(ele);
            });
        });
        return self.RespValue.CodeArr;
    }
    public BranchNoOptionsList(parentObj: dyDropDwn.defaultObj, childObj: dyDropDwn.defaultObj, childName: string) {
        let self = this;
        this.RespValue.BranchNoList = null;
        console.log(parentObj.parentOptionCode);
        this.RespValue.BranchNoArr = [{ label: "-----", value: "-----" }];
        let TableValue = this.RespValue.AllCodeResponceValue[parentObj.app].records.filter((ele) => ele[parentObj.parentOptionCode].value == this.Settings.Code);
        if (TableValue.length == 0) {
            this.RespValue.BranchNoArr = [...this.RespValue.BranchNoArr];
        }
        else {
            this.RespValue.BranchNoList = TableValue?.map((ele) => {
                let test: dyDropDwn.SubtableRow = <dyDropDwn.SubtableRow>ele[childObj.parentOptionTable].value;
                test.value.forEach((ele) => {
                    let subTitle = (childObj.subTitle != "") ? `(${ele.value[childObj.subTitle].value})` : "";
                    return {
                        "label": `${ele.value[childObj.parentOptionCode].value}` + subTitle, "value": `${ele.value[childObj.parentOptionCode].value}`
                    }
                }
            }
            });
        this.RespValue.BranchNoArr = [...this.RespValue.BranchNoArr, ...this.RespValue.BranchNoList];
    }
        return this.RespValue.BranchNoArr;
    }
}
export default dynamicDropdown;
