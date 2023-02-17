import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { dynamicDropdown as dynamicDropDown } from "@common/dynamicDropdown";
import KucTable from "@common/kucTable";
import { dyDropDwn } from "@type/dynamicDropdown";
import { kintone as kintoneType } from "@type/kintone";
import { events, tableCode, tableLabel, spaceCode } from "@common/static"
import { Label } from '@kintone/kintone-ui-component';

kintone.events.on(events, async (event: kintoneType.Event) => {
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
                            return new Promise(async (resolve, reject) => {
                                initialObj[property] = [];
                                initialObj[property] = await SubTableLookUp.intialCodeSelect(recordTableRow.value, property, SubTableLookUp.forDynamicValueAcquisition);
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
            const root = createRoot(
                kintone.app.record.getSpaceElement(spaceCode) as HTMLElement
            );
            kintone.app.record.setFieldShown(tableCode, false);
            root.render(
                <>
                    <Label text={tableLabel} />
                    <KucTable
                        data={data}
                        defaultRowData={SubTableLookUp.defaultRowData}
                        dynamicDropdown={SubTableLookUp as dynamicDropDown}
                    />
                </>
            );
            resolve("")
        });
    }).then((kucTable) => {
        return new Promise(function (resolve, reject) {

            resolve("");
        });
    })
});


