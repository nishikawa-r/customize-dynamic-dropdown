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
export default class LookUpDuplicateTable extends React.Component<lookUpDuplicateTable.props> {
    state: {
        isVisible: boolean,
        selectedValue: string
    };
    private rows: {
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number
    }[] = [];
    props: lookUpDuplicateTable.props
    constructor(props: lookUpDuplicateTable.props) {
        super(props);
        this.props = props;
        this.state = {
            isVisible: true,
            selectedValue: "a",
        };
        this.CreateRows();
    }

    onClose = () => {
        this.setState({ isVisible: false })
    }
    createData = (
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) => {
        return { name, calories, fat, carbs, protein };
    }
    CreateRows = () => {
        this.rows.push(this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0));
    };
    BasicTable = () => {
        const handleChange = (event: any) => {
            this.props.selectedValue(event.target.value);
            this.setState({ selectedValue: event.target.value });
        };
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Radio
                                        checked={row.name === this.state.selectedValue}
                                        onChange={handleChange}
                                        value={row.name}
                                        color="default"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'D' }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    };
    Buttons = () => {
        return (
            <>
                <Button text={"閉じる"} isVisible={this.state.isVisible} type={"normal"} onClick={() => this.onClose()} />
                <Button text={"取得"} isVisible={this.state.isVisible} type={"submit"} onClick={() => this.onClose()} />
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
                isVisible={this.state.isVisible}
                onClose={this.onClose}
            />
        );
    }
}
