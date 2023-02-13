import { dyDropDwn } from "@type/dynamicDropdown";

class dynamicDropdown {
    public CodeOptionsList(parentObj: dyDropDwn.defaultObj) {
        let self = this;
        let CodeList = [];
        this.RespValue.CodeArr = [{ label: "-----", value: "-----" }];
        console.log(this.RespValue.CodeArr, parentObj);
        console.log(parentObj);
        this.RespValue.AllCodeResponceValue[parentObj.app].records.forEach((element) => {
            console.log(element);
            let subTitle = (parentObj.subTitle != "") ? `(${element[parentObj.subTitle].value})` : "";
            CodeList.push({ "label": element[parentObj.parentOptionCode].value + subTitle, "value": element[parentObj.parentOptionCode].value });
            CodeList.forEach((ele, index) => {
                self.RespValue.CodeArr[index + 1] = ele;
                console.log(ele);
            });
        });
        return self.RespValue.CodeArr;
    }
    public BranchNoOptionsList(parentObj, childObj, childName) {
        let self = this;
        this.RespValue.BranchNoList = null;
        console.log(parentObj.parentOptionCode);
        this.RespValue.BranchNoArr = [{ label: "-----", value: "-----" }];
        let TableValue = this.RespValue.AllCodeResponceValue[parentObj.app].records.filter((ele) => ele[parentObj.parentOptionCode].value == this.Settings.Code);
        if (TableValue.length == 0) {
            this.RespValue.BranchNoArr = [...this.RespValue.BranchNoArr];
        }
        else {
            this.RespValue.BranchNoList = TableValue[0][childObj.parentOptionTable].value.map((ele) => {
                let subTitle = (childObj.subTitle != "") ? `(${ele.value[childObj.subTitle].value})` : "";
                return {
                    "label": `${ele.value[childObj.parentOptionCode].value}` + subTitle, "value": `${ele.value[childObj.parentOptionCode].value}`
                }
            });
            this.RespValue.BranchNoArr = [...this.RespValue.BranchNoArr, ...this.RespValue.BranchNoList];
        }
        return this.RespValue.BranchNoArr;
    }
}
export default dynamicDropdown;
