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
            [key: string]: dyDropDwn.defaultData;
        }[]
    };
    constructor(props: kucTable.props) {
        super(props);
        this.state = {
            value: props.data.length ? props.data : [{}],
        }
        this.data = props.data;
        this.defaultRowData = props.defaultRowData;
    }
    render() {
        this.columns = [];
        const KucTable = () => {
            Object.keys(this.defaultRowData).forEach((data) => {
                let col = (this.state.value[0][data].items == undefined)
                    ? {
                        header: data,
                        cell: ({ rowIndex, onCellChange }: any) =>
                            <Text
                                value={(this.state.value[rowIndex] == undefined) ? "" : this.state.value[rowIndex][data].value}
                                onChange={newValue => onCellChange(newValue, this.state.value, rowIndex, data)}
                            />
                    }
                    : {
                        header: data,
                        cell: ({ rowIndex, onCellChange }: any) =>
                            <Dropdown
                                value={(this.state.value[rowIndex] == undefined) ? "-----" : this.state.value[rowIndex][data].value}
                                items={(this.state.value[rowIndex] == undefined) ? this.defaultRowData[data].items as any : this.state.value[rowIndex][data].items}
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
                defaultRowData={this.defaultRowData}
                onRowAdd={({ data }) => this.setState({ value: data })}
                onRowRemove={({ data }) => this.setState({ value: data })}
                onCellChange={({ data }) => this.setState({ value: data })}
            />
        )
    }
}
