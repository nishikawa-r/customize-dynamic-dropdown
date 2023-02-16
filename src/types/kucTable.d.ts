import { dyDropDwn } from "@type/dynamicDropdown"
import { dynamicDropdown as dynamicDropDown } from "@common/dynamicDropdown";
export module kucTable {
    type props = {
        data: {
            [key: string]: dyDropDwn.defaultData;
        }[],
        defaultRowData: {
            [key: string]: dyDropDwn.defaultData;
        },
        dynamicDropdown?: dynamicDropDown;

    }
}
