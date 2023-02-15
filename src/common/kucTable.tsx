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
            value: props.data
        }
        this.columns = [];
        this.data = props.data;
        this.defaultRowData = props.defaultRowData;
        const KucTable = (Props: kucTable.props) => {
            let saveData: Record<string, any>[] | undefined = [{}];
            const props = Props || '';
            Object.keys(props.defaultRowData).forEach((data) => {
                let col = (props.data[0][data].items == undefined)
                    ? {
                        header: data,
                        cell: ({ rowIndex, onCellChange }: any) =>
                            <Text
                                value={props.data[rowIndex][data].value || ''}
                                onChange={newValue => onCellChange(newValue, props, rowIndex, data)}
                            />
                    }
                    : {
                        header: data,
                        cell: ({ rowIndex, onCellChange }: any) =>
                            <Dropdown
                                value={props.data[rowIndex][data].value || ''}
                                items={props.data[rowIndex][data].items}
                                onChange={newValue => onCellChange(newValue, props, rowIndex, data)}
                            />
                    }
                this.columns.push(col);
            });
        }
        KucTable(props);
    }
    render() {
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
