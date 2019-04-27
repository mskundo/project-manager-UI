import React from 'react'
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

export default class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            currentDate: '',
            endDate: new Date().setDate(new Date().getDate() + 1),
            priority: '0',
            value: true,
            projectName: '',
            allUsers: [],
            filterKeyword: ''
        };
        const { SearchBar } = Search;
    }

    onProjectChange(e) {
        this.setState({ projectName: e.target.value })
    }

    onPriority(e) {
        this.setState({ priority: e.target.value })
    }

    handleChangeStartDate(e) {
        let newStartDate = e.target.value;
        this.setState({ startDate: newStartDate })
    }

    handleChangeEndDate(e) {
        let newEndDate = e.target.value;
        this.setState({ endDate: newEndDate })
    }

    cancelCourse = () => {
        this.setState({
            startDate: '',
            endDate: '',
            priority: '0',
            value: true,
            projectName: '',
            usersDetails: [],
            selectRowProp: [],
            filterKeyword: "",
            projectManager: '',
            managerDetails: [],
            addProject: []
        })
    }

    checkBox = () => {
        if (this.state.value === true) {
            this.setState({ value: false })
        }
        else {
            this.setState({ value: true })
        }
    }

    setStartEndDates = () => {
        var todaysDate = new Date();
        var date = todaysDate.toISOString().substr(0, 10);
        this.setState({ startDate: date })
        var nxtDate = new Date();
        nxtDate.setDate(nxtDate.getDate() + 1)
        this.setState({ endDate: nxtDate.toISOString().substr(0, 10) })
    }

    changeFilterValue = (e) => {
        this.setState({ filterKeyword: e.target.value })
    }

    componentWillMount = () => {
        this.setStartEndDates();
        axios.get("http://localhost:9091/projectmanager/user/getAllUsers").then(res => {
            let usersDetails = res.data;
            this.setState({ usersDetails })
        });
    }

    rowClicked = (userDetails) => {
        this.setState({ managerDetails: userDetails })
        let fullName = userDetails.firstName + " " + userDetails.lastName;
        this.setState({ projectManager: fullName })
    }

    onSubmit(e) {
        e.preventDefault();
        const project = {
            user: this.state.managerDetails,
            projectName: this.state.projectName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            priority: this.state.priority
        }
        axios.post("http://localhost:9091/projectmanager/projects/saveProject", project).then(res => {
            this.setState({ addProject: res.data })
        })
    }

    render() {
        let filteredItems;
        if (this.state.usersDetails) {
            filteredItems = this.state.usersDetails.filter(userDetails => userDetails.firstName.toUpperCase().includes(this.state.filterKeyword.toUpperCase())).map((userDetails, index) => {
                return (
                    <tr data-dismiss='modal' onClick={this.rowClicked.bind(this, userDetails)}>
                        <td key={index + userDetails.userId}> {userDetails.userId} </td>
                        <td key={index + userDetails.firstName}> {userDetails.firstName} {userDetails.lastName}</td>
                    </tr>
                );
            });
        }

        return (
            <div className='container-fluid'><br />
                <form className='form-group' classID='myForm' onSubmit={this.onSubmit.bind(this)}>
                    <div className='row'>
                        <div className='col-md-3'>
                            <label>Project :</label>
                        </div>
                        <div className='col-md-7'>
                            <input type='text' className="form-control" name='projectName' value={this.state.projectName}
                                onChange={this.onProjectChange.bind(this)} />
                        </div>
                        <div className='col-md-2'></div>
                    </div><br />
                    <div></div>
                    <div className='row'>
                        <div className='col-md-1'></div>
                        <div className='col-md-3'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <input type='checkbox' value="" onChange={this.checkBox.bind(this)} />
                                </div>
                                <div className='col-md-9'>
                                    Set Start Date and End Date
                                </div>
                            </div>
                        </div>
                        <div className='col-md-7'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <input type="date" defaultValue={this.state.startDate} disabled={this.state.value} onChange={this.handleChangeStartDate.bind(this)} />
                                </div>
                                <div className='col-md-6'>
                                    <input type="date" min={this.state.startDate} defaultValue={this.state.endDate} disabled={this.state.value} onChange={this.handleChangeEndDate.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-1'></div>
                    </div><br />

                    <div className='row'>
                        <div className='col-md-3'>
                            <label>Priority</label>
                        </div>
                        <div className='col-md-7'>
                            <input type="range" className="custom-range" id="tickmarks" min="0" max="30" value={this.state.priority}
                                onChange={this.onPriority.bind(this)} />
                        </div>
                        <div className='col-md-2'></div>
                    </div><br />

                    <div className='row'>
                        <div className='col-md-3'>
                            <label>Manager :</label>
                        </div>
                        <div className='col-md-7'>
                            <input type='text' className="form-control" name='manager' placeholder={this.state.projectManager} disabled />
                        </div>
                        <div className='col-md-2'>
                            <button type='button' className="form-control btn btn-secondary" data-toggle="modal" data-target="#myModal">Search</button>
                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog">
                                    <div className='modal-content'>
                                        <div className='modal-header'>
                                            <h5 className='modal-title'>Search Manager</h5>
                                            <button type='button' className='close' data-dismiss='modal'>&times;</button>
                                        </div>
                                        <div className='modal-body'>
                                            <input type='text' placeholder='search..' className='form-control' onChange={this.changeFilterValue.bind(this)} />
                                            <table className="table table-borderless table-condensed table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">ID</th>
                                                        <th className="text-center">NAME</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredItems}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='modal-footer'>
                                            <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><br /><br /><br />
                        <div className='row'>
                            <div className='col-md-4'></div>
                            <div className='col-md-8'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <button type='submit' className='btn btn-secondary' >Add</button>
                                    </div>
                                    <div className='col-md-6'>
                                        <input type='button' className='btn btn-secondary' onClick={this.cancelCourse.bind(this)} value="Reset" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><br />
                </form>
            </div>
        )
    }
}