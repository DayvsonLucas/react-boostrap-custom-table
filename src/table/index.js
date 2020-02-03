import React, { Component } from 'react';
import Paginations from '../pagination';
import {
    Table, Input, Label, CustomInput
} from 'reactstrap';


class CustomTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageOfItems: [],
            ordering: false,
            rowsForPage: 10
        };

        this.onChangePage = this.onChangePage.bind(this);
        this.onSort = this.onSort.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        return this.setState({ rowsForPage: event.target.value });
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    onSort(event, sortKey) {

        const pageOfItems = this.state.pageOfItems;

        if (!this.state.ordering) {
            pageOfItems.sort((a, b) => a[sortKey] != null ? a[sortKey].localeCompare(b[sortKey]) : -1)

            this.setState({ pageOfItems })
            this.setState({ ordering: true })
        }
        else {
            pageOfItems.reverse((a, b) => a[sortKey] != null ? a[sortKey].localeCompare(b[sortKey]) : -1)
            this.setState({ pageOfItems })
            this.setState({ ordering: false })
        }

    }

    render() {

        var dataColumns = this.props.data.columns;
        var dataRows = this.props.data.rows;
        var rowsForPage = this.state.rowsForPage;
        var selectableRows = this.props.selectableRows;

        var tableHeaders = (onSort) => (
            <thead className="thead-light" style={{ backgroundColor: '#898989' }}>
                <tr>
                    {selectableRows &&
                        <th style={{ backgroundColor: '#898989' }}>
                            <CustomInput type="checkbox" id="checkAll" className="checkAll" />
                        </th>
                    }
                    {dataColumns.map(function (column, index) {
                        if (column.sort)
                            return <th key={index} className={"sorting"} onClick={e => onSort(e, column.key)}>{column.display}</th>;
                        else
                            return <th key={index}>{column.display}</th>;
                    })}
                </tr>
            </thead>
        );

        var tableBody = this.state.pageOfItems.map(function (row, index) {
            return (
                <tr key={index}>
                    {selectableRows &&
                        <td key={index}>
                            <CustomInput type="checkbox" id={index} />
                        </td>
                    }
                    {dataColumns.map(function (column, index2) {
                        return <td className={index2} key={index2}>{row[column.key]}</td>
                    })}
                </tr>
            );
        });


        return (
            <div className="col-lg-12">
                {this.props.selectItem &&
                    <div id="example-1_wrapper" className="dataTables_wrapper form-inline">
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="dataTables_length" id="example-1_length">
                                    <Label className="datatable-label">
                                        <Input
                                            type="select"
                                            name="example-1_length"
                                            aria-controls="example-1"
                                            className="input-sm"
                                            onChange={this.handleChange}>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="-1">Todos</option>
                                        </Input>&nbsp;&nbsp;Registros por página
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Table responsive bordered striped style={{ marginTop: 5 }}>
                    {tableHeaders(this.onSort)}
                    <tbody>
                        {tableBody}
                    </tbody>
                </Table>
                <Paginations rowsForPage={rowsForPage} items={dataRows} onChangePage={this.onChangePage} />
            </div >
        );
    }
}

export default CustomTable;
