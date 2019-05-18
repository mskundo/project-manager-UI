import React from 'react'
import axios from 'axios';
import './addProject.css';


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
            filterKeyword: '',
            getProjects: [],
            searchFilter: ''
        };
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
            addProject: [],
            filteredValue: ''
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

    changeFilterValue(e) {
        this.setState({ filterKeyword: e.target.value })
    }

    searchFilter(e) {
        this.setState({ searchFilter: e.target.value })
    }

    componentWillMount() {
        this.setStartEndDates();
        axios.get("http://localhost:9091/projectmanager/user/getAllUsers").then(res => {
            this.setState({ usersDetails: res.data })
        });
        axios.get("http://localhost:9091/projectmanager/projects/getTaskProjects").then(res => {
            this.setState({ getProjects: res.data })
        })
    }

    rowClicked(userDetails) {
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
            this.getProject()
        })
        this.setState(prevState => ({
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
        }))
    }

    getProject() {
        axios.get("http://localhost:9091/projectmanager/projects/getTaskProjects").then(res => {
            this.setState({ getProjects: res.data })
        })
    }

    sortByStartDate() {
        this.setState({
            getProjects: Array.from(this.state.getProjects).sort((a, b) => {
                return new Date(a.projectRecord.startDate).getTime() -
                    new Date(b.projectRecord.startDate).getTime()
            })
        })
    }

    sortByEndDate() {
        this.setState({
            getProjects: Array.from(this.state.getProjects).sort((a, b) => {
                return new Date(a.projectRecord.endDate).getTime() -
                    new Date(b.projectRecord.endDate).getTime()
            })
        })

    }

    sortByPriority() {
        this.setState({
            getProjects: Array.from(this.state.getProjects).sort((a, b) => (a.projectRecord.priority - b.projectRecord.priority))
        })
    }

    sortByCompleted() {
        this.setState({
            getProjects: Array.from(this.state.getProjects).sort((a, b) => (a.completedTask - b.completedTask))
        })

    }

    suspendProject(id) {
        axios.put("http://localhost:9091/projectmanager/projects/deleteProject/" + id).then(res => {
            this.getProject()
        })
    }
    renderProject() {
        return (
            this.state.filteredValue
        )
    }

    render() {
        let filteredItems;
        if (this.state.usersDetails) {
            filteredItems = this.state.usersDetails.filter(userDetails => userDetails.firstName.toUpperCase().includes(this.state.filterKeyword.toUpperCase()) ||
                userDetails.empId.includes(this.state.filterKeyword)).map((userDetails, index) => {
                    return (
                        <tr data-dismiss='modal' onClick={this.rowClicked.bind(this, userDetails)}>
                            <td key={index + userDetails.userId}> {userDetails.empId} </td>
                            <td key={index + userDetails.firstName}> {userDetails.firstName} {userDetails.lastName}</td>
                        </tr>
                    );
                });
        }

        if (this.state.getProjects) {
            this.state.filteredValue = this.state.getProjects.filter(getProjects => getProjects.projectRecord.projectName.toUpperCase().includes(this.state.searchFilter.toUpperCase()))
                .map((getProjects, index) => {
                    return (
                        <tbody>
                            <tr >
                                <td className='jumbotron'><b>Project Name :</b></td>
                                <td key={getProjects.projectRecord.projectId} className='jumbotron'>{getProjects.projectRecord.projectName}</td>
                                <td key={getProjects.priority} className='jumbotron'><b>Priority</b></td>
                                <td>
                                    <button type="button" className="btn btn-primary">UPDATE</button>
                                </td>
                            </tr>
                            <tr>
                                <td key={getProjects.completedTask} className='jumbotron'><b>Completed:  </b>{getProjects.completedTask}</td>
                                <td key={getProjects.noOfTask} className='jumbotron'><b>No Of Tasks:  </b>{getProjects.noOfTask}</td>
                                <td key={getProjects.projectRecord.priority} className='jumbotron'>{getProjects.projectRecord.priority}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={this.suspendProject.bind(this, getProjects.projectRecord.projectId)}>SUSPEND</button>
                                </td>
                            </tr>
                            <tr>
                                <td key={getProjects.projectRecord.startDate} className='jumbotron'><b>Start Date: </b> {getProjects.projectRecord.startDate}</td>
                                <td key={getProjects.projectRecord.endDate} className='jumbotron'><b>End Date:  </b>{getProjects.projectRecord.endDate}</td>
                            </tr>
                            <tr><td></td></tr>
                        </tbody>
                    )
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
                            <button type='button' className="form-control btn btn-secondary" data-toggle="modal" data-target="#myModal" onClick={this.componentWillMount}>Search</button>
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
                <hr />
                <div className="row">
                    <div className='col-md-2'></div>
                    <div className='col-md-7'>
                        <input type='text' className='form-control' placeholder="Search..." onChange={this.searchFilter.bind(this)} />
                    </div>
                    <div className='col-md-3'></div>
                </div>
                <br />
                <div className="row">
                    <div className='col-md-2'></div>
                    <div className='col-sm-2'>
                        <b>Sort Projects By:</b>
                    </div>

                    <div className='col-sm-1'>
                        <button type='button' className="btn btn-info btn-sm" onClick={this.sortByStartDate.bind(this)}>Start Date</button>
                    </div>

                    <div className='col-sm-1'>
                        <button type='button' className="btn btn-info btn-sm" onClick={this.sortByEndDate.bind(this)}>End Date</button>
                    </div>

                    <div className='col-sm-1'>
                        <button type='button' className="btn btn-info btn-sm" onClick={this.sortByPriority.bind(this)}>Priority</button>
                    </div>

                    <div className='col-sm-1'>
                        <button type='button' className="btn btn-info btn-sm" onClick={this.sortByCompleted.bind(this)}>Completed</button>
                    </div>

                </div>
                <br />
                <div className="row">
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <table className="table table-borderless ">
                            {this.renderProject()}
                        </table>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        )
    }
}