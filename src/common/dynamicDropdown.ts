import { kintoneApi } from "@common/kintone-api";
import { duplicateError, kucTable } from "@common/static";
import { dyDropDwn } from "@type/dynamicDropdown";
import { kintone } from "@type/kintone";
export class dynamicDropdown {
    public readonly Settings: dyDropDwn.Settings;
    public readonly RespValue: dyDropDwn.RespValue;
    public forDynamicValueAcquisition: dyDropDwn.forDynamicValueAcquisition;
    public CodeArr: ({ [key: string]: dyDropDwn.DropdownItem[] });
    public readonly columns: dyDropDwn.column[];
    public readonly initialData: ({ [key: string]: dyDropDwn.defaultData })[];
    public defaultRowData: ({ [key: string]: dyDropDwn.defaultData });
    public initialObj: ({ [key: string]: dyDropDwn.defaultData });
    constructor() {
        const kucTable: dyDropDwn.kucTable = {}
        this.CodeArr = {};
        this.columns = [];
        this.initialData = [];
        this.forDynamicValueAcquisition = { childObj: {} };
        this.defaultRowData = {};
        this.initialObj = {};
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
    public CodeOptionsList(parentObj: dyDropDwn.defaultObj) {
        let self = this;
        let CodeList: dyDropDwn.DropdownItem[] = [{ label: "-----", value: "-----" }];
        this.RespValue.CodeArr = [{ label: "-----", value: "-----" }];
        console.log(this.RespValue.CodeArr, parentObj);
        console.log(parentObj);
        this.RespValue.AllCodeResponceValue[parentObj.app].records.forEach((element) => {
            console.log(element);
            let i = 0;
            let subTitle = (parentObj.subTitle != "") ? `(${element[parentObj.subTitle].value})` : "";
            CodeList.push({ "label": element[parentObj.parentOptionCode].value + subTitle, "value": (element[parentObj.parentOptionCode].value?.toString()) as string });
        });
        let CodeArr: dyDropDwn.DropdownItem[] = Array.from(
            CodeList.reduce((map, currentitem) =>
                map.set(currentitem.value, currentitem),
                new Map()
            ).values()
        );
        this.RespValue.CodeArr = CodeArr.map((map, index, arr) => {
            let len = CodeList.filter((e) => { return e.value == map.value }).length;
            if (len == 1) {
                return map;
            }
            else {
                map.label = (parentObj.subTitle != "") ? map.value + `(${duplicateError})` : map.value;
                return map;
            }
        });
        return this.RespValue.CodeArr;
    }
    public BranchNoOptionsList(parentObj: dyDropDwn.defaultObj, childObj: dyDropDwn.defaultObj, childName: string) {
        let self = this;
        this.RespValue.BranchNoList = [[{ label: "", value: "" }]];
        console.log(parentObj.parentOptionCode);
        this.RespValue.BranchNoArr = [{ label: "-----", value: "-----" }];
        let TableValue = this.RespValue.AllCodeResponceValue[parentObj.app].records.filter((ele) => ele[parentObj.parentOptionCode].value == this.Settings.Code);
        if (TableValue.length == 0) {
            this.RespValue.BranchNoArr = [...this.RespValue.BranchNoArr];
        }
        else {
            this.RespValue.BranchNoList = TableValue?.map((ele, index) => {
                if (index > -1) {
                    let test: dyDropDwn.SubtableRow[] = (ele[childObj.parentOptionTable].value as dyDropDwn.SubtableRow[]);
                    return test.map((ele) => {
                        let subTitle = (childObj.subTitle != "") ? `(${ele.value[childObj.subTitle].value})` : "";
                        return {
                            label: `${ele.value[childObj.parentOptionCode].value}` + subTitle, value: `${ele.value[childObj.parentOptionCode].value}`
                        }
                    });
                }
            }) as dyDropDwn.DropdownItem[][];
            let duplicateBranchList = this.RespValue.BranchNoList.flat();
            let BranchNoList = Array.from(
                this.RespValue.BranchNoList.flat().reduce((map, currentitem) =>
                    map.set(currentitem.value, currentitem),
                    new Map()
                ).values()
            );
            let resBranchNoList = BranchNoList.map((map, index, arr) => {
                let len = duplicateBranchList.filter((e) => { return e.value == map.value }).length;
                if (len == 1) {
                    return map;
                }
                else {
                    map.label = (childObj.subTitle != "") ? map.value + `(${duplicateError})` : map.value;
                    return map;
                }
            });

            this.RespValue.BranchNoArr = [...this.RespValue.BranchNoArr, ...resBranchNoList];
        }
        return this.RespValue.BranchNoArr;
    }
    public appList(): Array<number> {
        let appListArr = Object.keys(this.Settings.kucTable).map((column) => {
            let array = [this.Settings.kucTable[column].app];
            return array
        });
        return appListArr.flat().filter(e => e).filter((e, i, self) => { return self.indexOf(e) == i }) as number[]
    };
    public ForDynamicValueAcquisition(): dyDropDwn.forDynamicValueAcquisition {
        let child: dyDropDwn.kucTable = {};
        let parent = Object.keys(this.Settings.kucTable).map((property) => {
            if (this.Settings.kucTable[property].parent != "") {
                return child[property] = this.Settings.kucTable[property];
            }
            return;
        }).filter(e => e)[0];
        return { "childObj": child };
    }
    public setCodeArr(forDynamicValueAcquisition: dyDropDwn.forDynamicValueAcquisition) {
        this.CodeArr = {};
        Object.keys(forDynamicValueAcquisition.childObj).forEach(async (child) => {
            return this.CodeArr[forDynamicValueAcquisition.childObj[child].parent as string] = this.CodeOptionsList(((this.Settings.kucTable[forDynamicValueAcquisition.childObj[child].parent as string]) as dyDropDwn.defaultObj));
        });
        return;
    };
    public async OptionalAppRecordAcquisition(doAppList: Array<number>) {
        await Promise.all(doAppList.map(async (app) => {
            let fieldsList = [""];
            const dofieldsList = () => {
                let fieldListArr = Object.keys(this.Settings.kucTable).map((column) => {
                    let array = (app == this.Settings.kucTable[column].app) ? [this.Settings.kucTable[column].parentOptionCode, this.Settings.kucTable[column].parentOptionTable, this.Settings.kucTable[column].lookUpTable, this.Settings.kucTable[column].subTitle] : [];
                    return array
                });
                fieldsList = fieldListArr.flat().filter(e => e).filter((e, i, self) => { return self.indexOf(e) == i }) as string[]
            };
            dofieldsList();
            this.Settings.requestAllCodeBody.app = app;
            this.Settings.requestAllCodeBody.fields = fieldsList;
            const api = new kintoneApi();
            const view = await api.GetTestingItems(this.Settings.requestAllCodeBody);
            this.RespValue.AllCodeResponceValue[app] = { records: [] };
            this.RespValue.AllCodeResponceValue[app].records = view;
            console.log(view)
        }))
    };
    public setParentDeafultValue(forDynamicValueAcquisition: dyDropDwn.forDynamicValueAcquisition) {
        Object.keys(forDynamicValueAcquisition.childObj).forEach(async (child) => {
            this.Settings.kucTable[forDynamicValueAcquisition.childObj[child].parent as string].defaultRowData = this.CodeArr[forDynamicValueAcquisition.childObj[child].parent as string];
            console.log(this.Settings.kucTable[forDynamicValueAcquisition.childObj[child].parent as string].defaultRowData);
        });
        return;
    }
    public intialSetOptionssubTitle(e: kintone.record, child: string, forDynamicValueAcquisition: dyDropDwn.forDynamicValueAcquisition) {
        this.Settings.Code = e[forDynamicValueAcquisition.childObj[child].parent as string].value;
        this.Settings.BranchCode = e[child].value;
    };
    public async intialCodeSelect(e: kintone.record, property: string, forDynamicValueAcquisition: dyDropDwn.forDynamicValueAcquisition): Promise<dyDropDwn.Dropdown> {
        return new Promise((resolve, reject) => {
            this.RespValue.BranchNoArr = [{ label: "-----", value: "-----" }];
            let result: ({ [key: string]: dyDropDwn.Dropdown }) = {};
            let resultObj: ({ [key: string]: dyDropDwn.DropdownItem[] }) = {};
            let childName = "";
            let select = Object.keys(forDynamicValueAcquisition.childObj).forEach(async (child) => {
                if (e[forDynamicValueAcquisition.childObj[child].parent as string] && e[forDynamicValueAcquisition.childObj[child].parent as string].value != "-----" && e[forDynamicValueAcquisition.childObj[child].parent as string].value != "") {
                    if (property == child) {
                        this.intialSetOptionssubTitle(e, child, forDynamicValueAcquisition);
                        resultObj[property] = this.BranchNoOptionsList((this.Settings.kucTable[forDynamicValueAcquisition.childObj[child].parent as string]) as dyDropDwn.defaultObj, (this.Settings.kucTable[child]) as dyDropDwn.defaultObj, property);
                        console.log(typeof e[property] != "undefined");
                        let arr;
                        if (this.Settings.kucTable[property].subTitle != "" || typeof e[property] != "undefined") {
                            console.log(resultObj[property]);
                            arr = resultObj[property].filter((ele) => ele.value == e[property].value);
                            console.log(arr);
                            arr = (arr.length > 0) ? arr[0].value : "-----";
                        }
                        result[child] = {
                            items: resultObj[property],
                            value: ((typeof e[property] != "undefined") && (arr != "-----")) ? e[property].value : "-----"
                        };
                        console.log(result[child]);
                        childName = child;
                    }
                }
            });
            console.log(result);
            resolve(result[childName] ?? {
                items: [{ label: "-----", value: "-----" }],
                value: (typeof e[property] != "undefined") ? e[property].value : "-----"
            });
        });
    };
    public init() {
        return new Promise(async (resolve, reject) => {
            this.Settings.kucTable = kucTable;
            this.forDynamicValueAcquisition = this.ForDynamicValueAcquisition();
            const doAppList = this.appList();
            await this.OptionalAppRecordAcquisition(doAppList);
            this.setCodeArr(this.forDynamicValueAcquisition);
            this.setParentDeafultValue(this.forDynamicValueAcquisition);
            this.defaultRowData = {};
            this.initialObj = {};
            Object.keys(this.Settings.kucTable).map((property) => {
                if (this.Settings.kucTable[property].type == "dropdown") {
                    this.defaultRowData[property] = { items: (this.Settings.kucTable[property].defaultRowData as dyDropDwn.DropdownItem[]), value: (this.Settings.kucTable[property].defaultRowData as dyDropDwn.DropdownItem[])[0].value }
                    this.initialObj[property] = { items: (this.Settings.kucTable[property].defaultRowData as dyDropDwn.DropdownItem[]), value: (this.Settings.kucTable[property].defaultRowData as dyDropDwn.DropdownItem[])[0].value }
                }
                else {
                    this.defaultRowData[property] = { value: this.Settings.kucTable[property].defaultRowData as string }
                    this.initialObj[property] = { value: this.Settings.kucTable[property].defaultRowData as string }
                }
            });
            this.initialData.push(this.initialObj);
            resolve("ok");
        });
    }
}
