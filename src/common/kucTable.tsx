import React from 'react';
import { Dropdown, Text, Table } from '@kintone/kintone-ui-component';
import { kucTable } from "@type/kucTable";

export const KucTable = (Props: kucTable.props) => {
    let saveData: Record<string, any>[] | undefined = [{}];
    const props = Props || '';
    const columns: any = [];
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
        columns.push(col);
    });
    return (
        <Table
            columns={columns}
            data={props.data}
            defaultRowData={props.defaultRowData}
            onRowAdd={({ data }) => saveData = data}
            onRowRemove={({ data }) => saveData = data}
            onCellChange={({ data }) => saveData = data}
        />
    )
}
