import { dyDropDwn } from "@type/dynamicDropdown"
export module kucTable {
    type props = {
        data: {
            [key: string]: dyDropDwn.defaultData;
        }[],
        defaultRowData: {
            [key: string]: dyDropDwn.defaultData;
        },

    }
}
