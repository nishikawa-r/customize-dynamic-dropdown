import React from 'react';
import { Dropdown, Text, Table } from '@kintone/kintone-ui-component';
import { kucTable } from "@type/kucTable";
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
    constructor(props: kucTable.props) {
        super(props);
        this.data = props.data;
        const el = this.data;
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
            data: datas
        }

        this.defaultRowData = props.defaultRowData;
    }
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
