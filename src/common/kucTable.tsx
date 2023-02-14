import React from 'react';
import { Dropdown, Text, Table } from '@kintone/kintone-ui-component';

export const KucTable = (Props: any) => {
    const props = Props || '';
    const columns: any = [{
        header: 'minorChoice',
        cell: ({ rowIndex, onCellChange }: any) =>
            <Text
                value={props.value[rowIndex].value || ''}
                onChange={newValue => onCellChange(newValue, props, rowIndex, 'minorChoice')}
            />
    }];
    return (
        <Table
            columns={columns}
            data={props}
            defaultRowData={{}}
        />
    )
}
