export declare module dyDropDwn {

    type defaultRowData = {
        label: string
        value: string
    };
    type defaultObj = {
        type: string,
        columnLabel: string,
        defaultRowData: defaultRowData[],
        isLookUp: boolean,
        lookUpField: string | null,
        lookUpTable: string,
        lookUpkey: string,
        doLookUpchange: string,
        parent: string,
        parentOptionCode: string,
        parentOptionTable: string,
        subTitle: string,
        app: number | string
    };

}
