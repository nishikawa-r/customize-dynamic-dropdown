import { dyDropDwn } from "@type/dynamicDropdown";
import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Record as DefaultRecord } from '@kintone/rest-api-client/lib/client/types';
import { tableCode, spaceCode, recordErrorMessage, subTableErrorMessage } from "@common/static"
export class LookUp {
    public Settings: dyDropDwn.Settings;
    public RespValue: dyDropDwn.RespValue;
    public message = subTableErrorMessage;
    public isVisible = false;
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
                query: "order by レコード番号 asc",
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
    public SettingLookUpObj(e: any) {
        let Kuc = this.Settings.kucTable;
        let LookUpObj: any = {};
        this.Settings.propertyArr = Object.keys(Kuc).filter((property) => {
            return Kuc[property].isLookUp == true && Kuc[property].doLookUpchange == e.fieldName
        });
        this.Settings.propertyArr.forEach((property) => {
            LookUpObj[property] = Kuc[property];
        });
        console.log(LookUpObj);
        return LookUpObj;
    }
    public GetLookUpValue(lookUpObj: any, e: any) {
        let self = this;
        // this.RespValue.LookUpValue = null;
        let SettingLookUpObj = this.SettingLookUpObj(e);
        console.log(this.Settings.Code);
        Object.keys(SettingLookUpObj).forEach((property) => {
            let TableValue = this.RespValue.AllCodeResponceValue[lookUpObj.app as number].records.filter((ele) => ele[lookUpObj.parentOptionCode as string].value == this.Settings.Code);
            if (this.Settings.kucTable[property].lookUpTable != "") {
                const LookUpValue = TableValue?.map((ele, index) => {
                    let test: dyDropDwn.SubtableRow[] = (ele[this.Settings.kucTable[property].lookUpTable as string].value as dyDropDwn.SubtableRow[]);
                    return test.map((ele) => {
                        if (ele.value[this.Settings.kucTable[property].lookUpkey as string].value == this.Settings.BranchCode) {
                            return this.CreateLookUpObj(ele.value);
                        }
                        return;
                    }).filter(e => e);
                }).flat() as dyDropDwn.LookUp[];
                if (LookUpValue.length == 1) {
                    this.isVisible = false;
                    this.RespValue.LookUpValue = LookUpValue[0];
                }
                else if (LookUpValue.length > 1) {
                    this.message = subTableErrorMessage;
                    this.isVisible = true;
                    Object.keys(this.Settings.kucTable).forEach((property) => {
                        if (e.fieldName == this.Settings.kucTable[property].lookUpkey) {
                            (this.RespValue.LookUpValue as dyDropDwn.LookUp) = { [property]: "" };
                        }
                    });
                }
                else {
                    this.isVisible = false;
                    Object.keys(this.Settings.kucTable).forEach((property) => {
                        if (e.fieldName == this.Settings.kucTable[property].lookUpkey) {
                            (this.RespValue.LookUpValue as dyDropDwn.LookUp) = { [property]: "" };
                        }
                    });
                }
            }
            else {
                if (TableValue.length != 1) {
                    this.message = recordErrorMessage;
                    this.isVisible = true;
                    Object.keys(this.CreateLookUpObj(TableValue[0])).forEach((e) => {
                        (this.RespValue.LookUpValue as dyDropDwn.LookUp) = { [e]: "" };
                    })
                }
                else {
                    this.isVisible = false;
                    this.RespValue.LookUpValue = this.CreateLookUpObj(TableValue[0]);
                }
            }
        });
        console.log(this.RespValue.LookUpValue);
    }

}

