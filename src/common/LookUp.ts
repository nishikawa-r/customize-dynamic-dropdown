import { dyDropDwn } from "@type/dynamicDropdown";
import { Record as DefaultRecord } from '@kintone/rest-api-client/lib/client/types';
export class LookUp {
    public Settings: dyDropDwn.Settings;
    public RespValue: dyDropDwn.RespValue;
    constructor() {
        const kucTable = {};
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
            kucTable: kucTable,
            propertyArr: []
        }
    }
    public CreateLookUpObj(value: DefaultRecord) {
        let Kuc = this.Settings.kucTable;
        let LookUpObj: dyDropDwn.LookUp = {};
        this.Settings.propertyArr = Object.keys(Kuc).filter((property) => {
            return Kuc[property].isLookUp == true
        });
        this.Settings.propertyArr.forEach((property: string) => {
            if (typeof value[Kuc[property].lookUpField as string] != "undefined") {
                (LookUpObj as dyDropDwn.LookUp)[property] = value[Kuc[property].lookUpField as string].value as string;
            }
        });
        console.log(LookUpObj);
        return LookUpObj;
    }
    // public SettingLookUpObj(e) {
    //     let Kuc = this.Settings.kucTable;
    //     let LookUpObj = {};
    //     this.Settings.propertyArr = Object.keys(Kuc).filter((property) => {
    //         return Kuc[property].isLookUp == true && Kuc[property].doLookUpchange == e.fieldName
    //     });
    //     this.Settings.propertyArr.forEach((property) => {
    //         LookUpObj[property] = Kuc[property];
    //     });
    //     console.log(LookUpObj);
    //     return LookUpObj;
    // }
    // public GetLookUpValue(lookUpObj: dyDropDwn.kucTableItems, e) {
    //     let self = this;
    //     // this.RespValue.LookUpValue = null;
    //     let SettingLookUpObj = this.SettingLookUpObj(e);
    //     console.log(this.Settings.Code);
    //     Object.keys(SettingLookUpObj).forEach((property) => {
    //         let TableValue = this.RespValue.AllCodeResponceValue[lookUpObj.app as number].records.filter((ele) => ele[lookUpObj.parentOptionCode as string].value == this.Settings.Code);
    //         if (this.Settings.kucTable[property].lookUpTable != "") {
    //             this.RespValue.LookUpValue = TableValue?.map((ele, index) => {
    //                 if (index == 0) {
    //                     let test: dyDropDwn.SubtableRow[] = (ele[this.Settings.kucTable[property].lookUpTable as string].value as dyDropDwn.SubtableRow[]);
    //                     return test.map((ele) => {
    //                         if (ele.value[this.Settings.kucTable[property].lookUpkey as string].value == this.Settings.BranchCode) {
    //                             return this.CreateLookUpObj(ele.value);
    //                         }
    //                         return;
    //                     }).filter(e => e)[0];
    //                 }
    //             }).flat()[0] as dyDropDwn.LookUp;
    //         }
    //         else {
    //             this.RespValue.LookUpValue = this.CreateLookUpObj(TableValue[0]);
    //         }
    //     });
    //     console.log(this.RespValue.LookUpValue);
    // }
}
