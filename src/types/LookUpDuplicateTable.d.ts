import { dyDropDwn } from "@type/dynamicDropdown";
export module LookUpDuplicateTable {
    type props = {
        isVisible: boolean,
        selectedValue: (props: string) => void,
        data: dyDropDwn.LookUp[];
    }
}
