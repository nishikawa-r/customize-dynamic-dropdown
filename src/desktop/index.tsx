import React from 'react';
import { render } from 'react-dom';
import { KucTable } from "../common/kucTable";
import { dynamicDropdown as dynamicDropDown } from "../common/dynamicDropdown";
import { dyDropDwn } from "@type/dynamicDropdown";
import { kintone } from "@type/kintone";
import { events, tableCode, tableLabel } from "../static/static"

kintone.events.on(events, async (event: kintone.Event) => {
    let SubTableLookUp = new dynamicDropDown();
    let DynamicDropDown = await SubTableLookUp.init();
    let SettingKuc = SubTableLookUp.Settings.kucTable;
    let promise = new Promise((resolve, reject) => {
        let initialObj: ({ [key: string]: dyDropDwn.Dropdown }) = {};
        let resultArr: ({ [key: string]: dyDropDwn.Dropdown }[]) = [];
        event.record[tableCode].value.map(async (recordTableRow: Record<string, any>) => {
            let initialObj: any = {}
            Object.keys(SubTableLookUp.Settings.kucTable).forEach(async (property) => {
                if (SettingKuc[property].type == "dropdown") {
                    if (SettingKuc[property].parent != "" && recordTableRow.value[SettingKuc[property].parent as string] && recordTableRow.value[SettingKuc[property].parent as string].value != "") {
                        let DoIntialCodeSelect = () => {
                            return new Promise((resolve, reject) => {
                                let IntialCodeSelect: Promise<dyDropDwn.Dropdown> = SubTableLookUp.intialCodeSelect(recordTableRow.value, property, SubTableLookUp.forDynamicValueAcquisition);
                                initialObj[property].value = IntialCodeSelect;
                                resolve(initialObj[property]);
                            });
                        }
                        initialObj[property] = await DoIntialCodeSelect();
                    }
                    else {
                        let arr;
                        if (SettingKuc[property].subTitle != "") {
                            console.log(SettingKuc[property].defaultRowData);
                            arr = (SettingKuc[property].defaultRowData as dyDropDwn.DropdownItem[]).filter((e) => e.value == recordTableRow.value[property].value);
                            arr = (arr.length > 0) ? arr[0].value : "-----";
                        }
                        console.log(arr);
                        initialObj[property] = {
                            items: SettingKuc[property].defaultRowData, value: ((recordTableRow.value[property].value != "") && (arr != "-----")) ? recordTableRow.value[property].value : (SettingKuc[property].defaultRowData as dyDropDwn.DropdownItem[])[0].value
                        }
                    }
                }
                else {
                    initialObj[property] = { value: recordTableRow.value[property].value || SettingKuc[property].defaultRowData }
                }
                initialObj;
            });
            resultArr.push(initialObj);
        });
        resolve(resultArr);
    }).then((result: any) => { // #3
        return new Promise(function (resolve, reject) {
            console.log({ result });
            const data = (event.record[tableCode].value[0].id != null) ? result : SubTableLookUp.initialData;
            render(<KucTable
                data={data}
                defaultRowData={SubTableLookUp.defaultRowData}
                columns={SubTableLookUp.columns}
            />,
                kintone.app.getHeaderSpaceElement()
            );
            resolve("")
        });
    }).then((kucTable) => {
        return new Promise(function (resolve, reject) {

            resolve("");
        });
    })
});


