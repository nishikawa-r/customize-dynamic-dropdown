import { dyDropDwn } from "@type/dynamicDropdown";
export module LookUpDuplicateTable {
    type props = {
        isVisible: boolean,
        selectedValue: (props: { value: string, isVisible: boolean }) => void,
        data: dyDropDwn.LookUp[];
        value: { value: string, isVisible: boolean }
    }
}
