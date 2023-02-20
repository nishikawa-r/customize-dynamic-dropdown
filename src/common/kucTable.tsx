import React from 'react';
import { Dropdown, Alert, Button, Text, Table } from '@kintone/kintone-ui-component';
import { kucTable } from "@type/kucTable";
import { LookUp } from "@common/LookUp";
import { events, tableCode, tableLabel, alertHideMessage } from "@common/static"
import { dyDropDwn } from '@type/dynamicDropdown';
export default class KucTable extends React.Component<kucTable.props> {
    private columns: any;
    private data: ({
        [key: string]: dyDropDwn.defaultData;
    }[]);
    private defaultRowData: ({
        [key: string]: dyDropDwn.defaultData;
    });
    state: {
        value: {
            [key: string]: "";
        }[],
        data: ({
            [key: string]: dyDropDwn.defaultData;
        })[],
        message: string,
        isVisible: boolean
    };
    private SubTableLookUp: any;
    private LookUp: any;
    constructor(props: kucTable.props) {
        super(props);
        this.data = props.data;
        const el = this.data;
        this.LookUp = new LookUp();
        this.SubTableLookUp = props.dynamicDropdown;
        this.LookUp.Settings = this.SubTableLookUp.Settings;
        this.LookUp.RespValue = this.SubTableLookUp.RespValue;
        const data = el.map((ele) => {
            let obj: any = {};
            Object.keys(ele).forEach((e: string) => {
                obj[e as any] = ele[e].value;
            });
            return obj;
        });

        const datas = props.data;
        this.state = {
            value: data.length ? data : [{}],
            data: datas,
            message: props.message,
            isVisible: props.isVisible
        }

        this.defaultRowData = props.defaultRowData;
    }
    SetOptionssubTitle = (e: any, child: any) => {
        this.SubTableLookUp.Settings.Code = (this.SubTableLookUp.Settings.kucTable[this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent].subTitle == "")
            ? e.data[this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent]
            : this.SubTableLookUp.Settings.Code = e.data[this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent];
        this.SubTableLookUp.Settings.BranchCode = (this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].subTitle == "")
            ? e.data[child]
            : this.SubTableLookUp.Settings.BranchCode = e.data[child];

        console.log(this.SubTableLookUp.Settings.Code);
        return;
    };
    CodeSelectChange = ({ e, child }: any) => {
        this.SetOptionssubTitle(e, child);
        this.SubTableLookUp.RespValue.BranchNoArr = [{ label: "-----", value: "-----" }];
        if (e.data[e.fieldName] != "-----") {
            this.SubTableLookUp.BranchNoOptionsList(this.SubTableLookUp.Settings.kucTable[e.fieldName], this.SubTableLookUp.Settings.kucTable[child], child);
        }
        e.data[child] = {
            items: this.SubTableLookUp.RespValue.BranchNoArr,
            value: (this.SubTableLookUp.RespValue.BranchNoArr[0] != null) ? this.SubTableLookUp.RespValue.BranchNoArr[0].value : "-----"
        };
        Object.keys(this.SubTableLookUp.Settings.kucTable).forEach((property) => {
            if (this.SubTableLookUp.Settings.kucTable[property].isLookUp && (this.SubTableLookUp.Settings.kucTable[property].doLookUpchange == child || this.SubTableLookUp.Settings.kucTable[property].doLookUpchange == e.fieldName)) {
                e.data[property] = ""
            }
        });
        if (e.data[e.fieldName] != "-----") {
            this.LookUp.GetLookUpValue(this.SubTableLookUp.Settings.kucTable[this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent], e);
            console.log(this.SubTableLookUp.RespValue.LookUpValue);
            this.SubTableLookUp.Settings.propertyArr.forEach((property: any) => {
                e.data[property] = (this.SubTableLookUp.RespValue.LookUpValue == null || this.SubTableLookUp.RespValue.LookUpValue[property] == null) ? "" : this.SubTableLookUp.RespValue.LookUpValue[property]

            });
        } else {
            this.state.isVisible = false;
            this.setState({ isVisible: this.state.isVisible })
        }
        return e;
    };
    BranchCodeSelectChange = ({ e, child }: any) => {
        this.SetOptionssubTitle(e, child);
        this.LookUp.GetLookUpValue(this.SubTableLookUp.Settings.kucTable[this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent], e);
        this.SubTableLookUp.Settings.propertyArr.forEach((property: any) => {
            e.data[property] = (this.SubTableLookUp.RespValue.LookUpValue == null || this.SubTableLookUp.RespValue.LookUpValue[property] == null) ? (this.SubTableLookUp.Settings.kucTable[property].isLookUp == true && this.SubTableLookUp.Settings.kucTable[property].lookUpTable == "") ? e.data[property] : "" : this.SubTableLookUp.RespValue.LookUpValue[property];
        });
        return e;
    };
    setRecord = (kucTableValue: any) => {
        let record = kintone.app.record.get();
        let self = this;
        record.record[tableCode].value = kucTableValue.map(function (kucTableRow: any) {
            return {
                value: Object.keys(kucTableRow).reduce(function (recordTableRow: any, column: any) {
                    if (self.SubTableLookUp.Settings.kucTable[column].subTitle != "") {
                        recordTableRow[column] = {
                            type: 'SINGLE_LINE_TEXT',
                            value: ((kucTableRow[column] != "-----")) ? kucTableRow[column] : ""
                        };
                    }
                    else {
                        recordTableRow[column] = {
                            type: 'SINGLE_LINE_TEXT',
                            value: ((kucTableRow[column] != "-----")) ? kucTableRow[column] : ""
                        };
                    }
                    return recordTableRow;
                }, {})
            };
        });
        kintone.app.record.set(record);
    };
    handleRowAdd = ({ rowIndex, data }: any) => {
        let obj: any = {};
        this.state.value.splice(rowIndex, 0, [{}] as any);
        this.state.data.splice(rowIndex, 0, [{}] as any);
        Object.keys(this.defaultRowData).forEach((e: string) => {
            obj[e as any] = this.defaultRowData[e].value;
            if (this.defaultRowData[e].items != undefined) {
                this.state.data[rowIndex] = { [e]: { items: [] } };
                this.state.data[rowIndex][e].items = this.defaultRowData[e].items;
            }
        });
        this.state.value[rowIndex] = obj;
        this.setState({ value: this.state.value, data: this.state.data })
        console.log('data: ', this.state.value);
        console.log('data: ', this.state.data, rowIndex);
        this.setRecord(this.state.value);
    }

    handleRowRemove = ({ rowIndex, data }: any) => {
        this.state.data.splice(rowIndex, 1);
        this.setState({ value: data, data: this.state.data })
        console.log('data: ', data);
        console.log('data: ', this.state.value);
        console.log('data: ', this.state.data, rowIndex);
        this.setRecord(this.state.value);
    }

    handleCellChange = ({ rowIndex, data, fieldName }: any) => {
        console.log('data: ', this.state.value);
        console.log('data: ', this.state.data, rowIndex);
        if (this.defaultRowData[fieldName].items != undefined) {
            let code = null;
            this.LookUp.isVisible = false;
            let es = { data: {} };
            let e = {
                data: data[rowIndex],
                rowIndex: rowIndex,
                fieldName: fieldName
            };
            console.log(e);
            Object.keys(this.SubTableLookUp.forDynamicValueAcquisition.childObj).forEach(async (child) => {
                if (fieldName == this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent) {
                    es = this.CodeSelectChange({ e, child });
                    code = this.SubTableLookUp.Settings.Code;
                    return;
                };
                if (fieldName == child) {
                    es = this.BranchCodeSelectChange({ e, child });
                    code = this.SubTableLookUp.Settings.BranchCode;
                    return;
                };
                return;
            });
            this.state.value[rowIndex][fieldName] = data[rowIndex][fieldName];
            Object.keys(this.defaultRowData).forEach((propety) => {
                if (this.defaultRowData[propety].items != undefined && (es.data as any)[propety].items != undefined) {
                    let obj = { [propety]: { items: [] } };
                    this.state.data[rowIndex] = { ...this.state.data[rowIndex], ...obj };
                    this.state.data[rowIndex][propety].items = (es.data as any)[propety].items;
                    this.state.value[rowIndex][propety] = (es.data as any)[propety].value;
                }
            });
            this.state.message = this.LookUp.message + `:${e.fieldName}[${e.rowIndex}]`;
            this.state.isVisible = this.LookUp.isVisible;
            this.setRecord(this.state.value);
            this.setState({ value: this.state.value, data: this.state.data, message: this.state.message, isVisible: this.state.isVisible })
        }
        else {
            this.state.value[rowIndex][fieldName] = data[rowIndex][fieldName];
            this.setRecord(this.state.value);
            this.setState({ value: this.state.value })

        }
    }
    hide = () => {
        this.setState({ isVisible: false });
    };
    render() {
        this.columns = [];
        const KucTable = () => {
            Object.keys(this.defaultRowData).forEach((data) => {
                console.log(this.state.value);
                console.log(this.state.data);
                let col = (this.defaultRowData[data].items == undefined)
                    ? {
                        header: data,
                        cell: ({ rowIndex, onCellChange }: any) =>
                            <Text
                                value={this.state.value[rowIndex][data]}
                                onChange={newValue => onCellChange(newValue, this.state.value, rowIndex, data)}
                            />
                    }
                    : {
                        header: data,
                        cell: ({ rowIndex, onCellChange }: any) =>
                            <Dropdown
                                value={this.state.value[rowIndex][data]}
                                items={(this.state.data[rowIndex] != undefined && this.state.data[rowIndex][data] != undefined) ? this.state.data[rowIndex][data].items : this.defaultRowData[data].items as any}
                                onChange={newValue => onCellChange(newValue, this.state.value, rowIndex, data)}
                            />
                    }
                this.columns.push(col);
            });
        }
        KucTable();
        return (
            <>
                <Table
                    columns={this.columns}
                    data={this.state.value}
                    defaultRowData={{}}
                    onRowAdd={this.handleRowAdd}
                    onRowRemove={this.handleRowRemove}
                    onCellChange={({ rowIndex, data, fieldName }) => this.handleCellChange({ rowIndex, data, fieldName })}
                />
                <div>
                    <Alert text={this.state.message} isVisible={this.state.isVisible} />
                    <Button text={alertHideMessage} isVisible={this.state.isVisible} onClick={() => this.hide()} />
                </div>
            </>
        )
    }
}
