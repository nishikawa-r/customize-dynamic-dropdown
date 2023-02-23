import { Dialog, Button } from '@kintone/kintone-ui-component';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import { LookUpDuplicateTable as lookUpDuplicateTable } from "@type/LookUpDuplicateTable";
import { dyDropDwn } from "@type/dynamicDropdown";
export default class LookUpDuplicateTable extends React.Component<lookUpDuplicateTable.props> {
    state: {
        isVisible: boolean,
        selectedValue: dyDropDwn.LookUp,
        checkIndex: number
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
            checkIndex: 0
        };
        this.props = props;
        this.vis = props.isVisible;
        this.CreateRows();
        this.check = false;
    }

    onClose = () => {
        this.vis = false;
        this.state.isVisible = false;
        this.setState({ isVisible: this.state.isVisible })
    }
    CreateRows = () => {
        this.rows = this.props.data;
    };
    BasicTable = () => {
        console.log(this.rows);
        this.vis = this.props.isVisible;
        if (this.props.isVisible) {
            const handleChange = (event: any) => {
                this.props.selectedValue(event.target.value);
                this.setState({ selectedValue: event.target.value, checkIndex: event.target.value });
            };
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
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
                                            checked={index == this.state.checkIndex}
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
                <Button text={"閉じる"} isVisible={this.vis} type={"normal"} onClick={() => this.onClose()} />
                <Button text={"取得"} isVisible={this.vis} type={"submit"} onClick={() => this.onClose()} />
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
                isVisible={this.vis}
                onClose={this.onClose}
            />
        );

    }
}
