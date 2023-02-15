import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import KucTable from "@common/kucTable";
const data = [
    {
        test: {
            items: [{ label: "-----", value: "-----" }],
            value: "-----"
        }
    }
];
const defaultRowData =
{
    test: {
        items: [{ label: "-----", value: "-----" }],
        value: "-----"
    }
};
const root = createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <KucTable
        data={data}
        defaultRowData={defaultRowData}
    />
);