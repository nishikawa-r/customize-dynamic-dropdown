import { Button, Dialog } from '@kintone/kintone-ui-component';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { dyDropDwn } from "@type/dynamicDropdown";
import { LookUpDuplicateTable as lookUpDuplicateTable } from "@type/LookUpDuplicateTable";
import React from 'react';
export default class LookUpDuplicateTable extends React.Component<lookUpDuplicateTable.props> {
    state: {
        isVisible: boolean,
        selectedValue: dyDropDwn.LookUp,
        checkIndex: string
    };
    private vis: boolean;
    private check: boolean;
    private rows: dyDropDwn.LookUp[] = [];
    props: lookUpDuplicateTable.props;
    constructor(props: lookUpDuplicateTable.props) {
        super(props);
        this.state = {
            isVisible: props.isVisible,
            selectedValue: {},
            checkIndex: ""
        };
        this.props = props;
        this.vis = props.isVisible;
        this.check = false;
    }

    onClose = () => {
        this.props.selectedValue({ value: this.state.checkIndex, isVisible: false });
        this.setState({ selectedValue: this.state.checkIndex, isVisible: false });
    }
    onDo = () => {
        this.props.selectedValue({ value: this.state.checkIndex, isVisible: false });
        this.props.DoLookUp();
        this.setState({ selectedValue: this.state.checkIndex, isVisible: false });
    }
    CreateRows = () => {
        this.rows = this.props.data;
    };
    BasicTable = () => {
        this.CreateRows();
        console.log(this.rows);
        this.vis = this.props.isVisible;
        if (this.props.isVisible) {
            const handleChange = (event: any) => {
                this.props.selectedValue({ value: event.target.value, isVisible: true });
                this.setState({ selectedValue: event.target.value, checkIndex: event.target.value });
            };
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 0 }} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell ></TableCell>
                                {Object.keys(this.rows[0]).map((e) => (
                                    <TableCell key={e}>{e}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.rows.map((row, index) => (
                                <TableRow
                                    key={"key" + index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <Radio
                                            checked={index == parseInt(this.props.value.value)}
                                            onChange={handleChange}
                                            value={index}
                                            color="default"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': '' }}
                                        />
                                    </TableCell>
                                    {Object.keys(this.rows[0]).map((e, indexs) => (
                                        <TableCell align="left" key={"key" + index + "" + indexs}>{row[e]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    };
    Buttons = () => {
        return (
            <>
                <Button text={"閉じる"} isVisible={this.props.isVisible} type={"normal"} onClick={() => this.onClose()} />
                <Button text={"取得"} isVisible={this.props.isVisible} type={"submit"} onClick={() => this.onDo()} />
            </>
        );
    }
    render() {

        return (
            <Dialog
                showCloseButton={true}
                header="ルックアップで取得するものを選択"
                content={this.BasicTable()}
                footer={this.Buttons()}
                isVisible={this.props.isVisible}
                onClose={this.onClose}
            />
        );

    }
}
