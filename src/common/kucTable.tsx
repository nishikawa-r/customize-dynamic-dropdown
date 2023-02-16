import React from 'react';
import { Dropdown, Text, Table } from '@kintone/kintone-ui-component';
import { kucTable } from "@type/kucTable";
import { LookUp } from "@common/LookUp";
import { events, tableCode, tableLabel } from "@common/static"
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
        })[]
    };
    private SubTableLookUp: any;
    private LookUp: any;
    constructor(props: kucTable.props) {
        super(props);
        this.data = props.data;
        const el = this.data;
        this.LookUp = new LookUp();
        this.LookUp.Settings = this.SubTableLookUp.Settings;
        this.LookUp.RespValue = this.SubTableLookUp.RespValue;
        const data = el.map((ele) => {
            let obj: any = {};
            Object.keys(ele).forEach((e: string) => {
                obj[e as any] = ele[e].value;
            });
            return obj;
        });
        this.SubTableLookUp = props.dynamicDropdown;
        const datas = props.data;
        this.state = {
            value: data.length ? data : [{}],
            data: datas
        }

        this.defaultRowData = props.defaultRowData;
    }
    SetOptionssubTitle = ({ e, child }: any) => {
        this.SubTableLookUp.Settings.Code = (this.SubTableLookUp[this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent].subTitle == "")
            ? e.data[e.rowIndex][this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent].value
            : this.SubTableLookUp.Settings.Code = e.data[e.rowIndex][this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent].value;
        this.SubTableLookUp.Settings.BranchCode = (this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].subTitle == "")
            ? e.data[e.rowIndex][child].value
            : this.SubTableLookUp.Settings.BranchCode = e.data[e.rowIndex][child].value;

        console.log(this.SubTableLookUp.Settings.Code);
    };
    CodeSelectChange = ({ e, child }: any) => {
        this.SetOptionssubTitle({ e, child });
        this.SubTableLookUp.RespValue.BranchNoArr = [{ label: "-----", value: "-----" }];
        if (e.data[e.rowIndex][e.fieldName].value != "-----") {
            this.SubTableLookUp.BranchNoOptionsList(this.SubTableLookUp[e.fieldName], this.SubTableLookUp[child], child);
        }
        e.data[e.rowIndex][child] = {
            items: this.SubTableLookUp.RespValue.BranchNoArr,
            value: (this.SubTableLookUp.RespValue.BranchNoArr[0] != null) ? this.SubTableLookUp.RespValue.BranchNoArr[0].value : "-----"
        };
        Object.keys(this.SubTableLookUp).forEach((property) => {
            if (this.SubTableLookUp[property].isLookUp && (this.SubTableLookUp[property].doLookUpchange == child || this.SubTableLookUp[property].doLookUpchange == e.fieldName)) {
                e.data[e.rowIndex][property] = {
                    value: ""
                };
            }
        });
        if (e.data[e.rowIndex][e.fieldName].value != "-----") {
            this.LookUp.GetLookUpValue(this.SubTableLookUp[this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent], e);
            console.log(this.SubTableLookUp.RespValue.LookUpValue);
            this.SubTableLookUp.Settings.propertyArr.forEach((property: any) => {
                e.data[e.rowIndex][property] = {
                    value: (this.SubTableLookUp.RespValue.LookUpValue == null || this.SubTableLookUp.RespValue.LookUpValue[property] == null) ? "" : this.SubTableLookUp.RespValue.LookUpValue[property]
                };
            });
        }
        return e;
    };
    BranchCodeSelectChange = ({ e, child }: any) => {
        this.SetOptionssubTitle({ e, child });
        this.LookUp.GetLookUpValue(this.SubTableLookUp[this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent], e);
        this.SubTableLookUp.Settings.propertyArr.forEach((property: any) => {
            e.data[e.rowIndex][property] = {
                value: (this.SubTableLookUp.RespValue.LookUpValue == null || this.SubTableLookUp.RespValue.LookUpValue[property] == null) ? (this.SubTableLookUp[property].isLookUp == true && this.SubTableLookUp[property].lookUpTable == "") ? e.data[e.rowIndex][property].value : "" : this.SubTableLookUp.RespValue.LookUpValue[property]
            };
        });
        return e;
    };
    setRecord = ({ kucTableValue, code, field }: any) => {
        let record = kintone.app.record.get();
        let self = this;
        record.record[tableCode].value = kucTableValue.map(function (kucTableRow: any) {
            return {
                value: Object.keys(kucTableRow).reduce(function ({ recordTableRow, column }: any) {
                    if (self.SubTableLookUp.Settings.kucTable[column].subTitle != "") {
                        recordTableRow[column] = {
                            type: 'SINGLE_LINE_TEXT',
                            value: ((kucTableRow[column].value != "-----")) ? kucTableRow[column].value : ""
                        };
                    }
                    else {
                        recordTableRow[column] = {
                            type: 'SINGLE_LINE_TEXT',
                            value: ((kucTableRow[column].value != "-----")) ? kucTableRow[column].value : ""
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
    }

    handleRowRemove = ({ rowIndex, data }: any) => {
        this.state.data.splice(rowIndex, 1);
        this.setState({ value: data, data: this.state.data })
        console.log('data: ', data);
        console.log('data: ', this.state.value);
        console.log('data: ', this.state.data, rowIndex);
    }

    handleCellChange = ({ rowIndex, data, fieldName }: any) => {
        console.log('data: ', this.state.value);
        console.log('data: ', this.state.data, rowIndex);
        let code = null;
        let e = "";
        Object.keys(this.SubTableLookUp.forDynamicValueAcquisition.childObj).forEach(async (child) => {
            if (fieldName == this.SubTableLookUp.forDynamicValueAcquisition.childObj[child].parent) {
                e = this.CodeSelectChange({ e, child });
                code = this.SubTableLookUp.Settings.Code;
                return;
            };
            if (fieldName == child) {
                e = this.BranchCodeSelectChange({ e, child });
                code = this.SubTableLookUp.Settings.BranchCode;
                return;
            };
            return;
        });
        this.setRecord({ data, code, fieldName });
        this.state.value[rowIndex][fieldName] = data[rowIndex][fieldName];
        if (this.defaultRowData[fieldName].items != undefined) {
            // let obj = { items: [{ label: "test", value: "test" }] } as dyDropDwn.defaultData;
            // this.state.data.splice(rowIndex, 0, { [fieldName]: obj });
            this.state.data[rowIndex][fieldName].items = [{ label: "test", value: "test" }];
        }
        this.setState({ value: this.state.value, data: this.state.data })
    }
    render() {
        this.columns = [];
        const KucTable = () => {
            Object.keys(this.defaultRowData).forEach((data) => {
                console.log(this.state.value);
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
                                items={(this.state.data[rowIndex] != undefined) ? this.state.data[rowIndex][data].items : this.defaultRowData[data].items as any}
                                onChange={newValue => onCellChange(newValue, this.state.value, rowIndex, data)}
                            />
                    }
                this.columns.push(col);
            });
        }
        KucTable();
        return (
            <Table
                columns={this.columns}
                data={this.state.value}
                defaultRowData={{}}
                onRowAdd={this.handleRowAdd}
                onRowRemove={this.handleRowRemove}
                onCellChange={({ rowIndex, data, fieldName }) => this.handleCellChange({ rowIndex, data, fieldName })}
            />
        )
    }
}
