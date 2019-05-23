import React from 'react'
import axios from 'axios';
import './addProject.css';
import swal from 'sweetalert';
import { PROJECT_MANAGER_API } from '../Constant/Constant'

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date().setDate(new Date().getDate() + 1),
            priority: '0',
            value: true,
            projectName: '',
            allUsers: [],
            filterKeyword: '',
            getProjects: [],
            searchFilter: '',
            id: '',
            userId: '',
            userName: '',
            flag: false,
            projectManager: '',
            sort: 0,
            errormsg: "Fill the mandetory fields properly!!"
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
            filteredValue: '',
            flag: false
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
        axios.get(PROJECT_MANAGER_API + "user/getAllUsers").then(res => {
            this.setState({ usersDetails: res.data })
        });
        axios.get(PROJECT_MANAGER_API + "projects/getTaskProjects").then(res => {
            this.setState({ getProjects: res.data })
        })
    }

    rowClicked(userDetails) {
        this.setState({ userId: userDetails.userId })
        let fullName = userDetails.firstName + " " + userDetails.lastName;
        this.setState({ userName: fullName })
    }

    onSubmit(e) {
        e.preventDefault();
        const project = {
            userId: this.state.userId,
            projectName: this.state.projectName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            priority: this.state.priority
        }
        if (this.state.projectName.length > 0 && this.state.userName.length > 0) {
            axios.post(PROJECT_MANAGER_API + "projects/saveProject", project).then(res => {
                this.setState({ addProject: res.data })
                this.getProject()
            })
            this.setState(prevState => ({
                priority: '0',
                value: true,
                projectName: '',
                filterKeyword: "",
                userName: '',
                startDate: new Date(),
                endDate: new Date().setDate(new Date().getDate() + 1),
            }))
        }
        else {
            swal(this.state.errormsg)
        }
    }

    getProject() {
        axios.get(PROJECT_MANAGER_API + "projects/getTaskProjects").then(res => {
            this.setState({ getProjects: res.data })
        })
    }

    sortByStartDate(count) {
        if (count === 0) {
            this.setState({
                getProjects: Array.from(this.state.getProjects).sort((a, b) => {
                    return new Date(a.projectRecord.startDate).getTime() - new Date(b.projectRecord.startDate).getTime()
                })
            })
            count++
            this.setState({ sort: count })
        } else {
            this.setState({
                getProjects: Array.from(this.state.getProjects).sort((a, b) => {
                    return new Date(b.projectRecord.startDate).getTime() - new Date(a.projectRecord.startDate).getTime()
                })
            })
            count = 0
            this.setState({ sort: count })
        }
    }

    sortByEndDate(count) {
        if (count === 0) {
            this.setState({
                getProjects: Array.from(this.state.getProjects).sort((a, b) => {
                    return new Date(a.projectRecord.endDate).getTime() - new Date(b.projectRecord.endDate).getTime()
                })
            })
            count++
            this.setState({ sort: count })
        } else {
            this.setState({
                getProjects: Array.from(this.state.getProjects).sort((a, b) => {
                    return new Date(b.projectRecord.endDate).getTime() - new Date(a.projectRecord.endDate).getTime()
                })
            })
            count = 0
            this.setState({ sort: count })
        }
    }


    sortByPriority(count) {
        if (count === 0) {
            this.setState({
                getProjects: Array.from(this.state.getProjects).sort((a, b) => (a.projectRecord.priority - b.projectRecord.priority))
            })
            count++
            this.setState({ sort: count })
        } else {
            this.setState({
                getProjects: Array.from(this.state.getProjects).sort((a, b) => (b.projectRecord.priority - a.projectRecord.priority))
            })
            count = 0
            this.setState({ sort: count })
        }
    }

    sortByCompleted(count) {
        if (count === 0) {
            this.setState({
                getProjects: Array.from(this.state.getProjects).sort((a, b) => (a.completedTask - b.completedTask))
            })
            count++
            this.setState({ sort: count })
        } else {
            this.setState({
                getProjects: Array.from(this.state.getProjects).sort((a, b) => (b.completedTask - a.completedTask))
            })
            count = 0
            this.setState({ sort: count })
        }
    }

    suspendProject(id) {
        axios.put(PROJECT_MANAGER_API + "projects/deleteProject/" + id).then(res => {
            this.getProject()
        })
    }

    updateProject(id, name, priority, startDate, endDate, userId, userName) {
        this.setState({ flag: true })
        this.setState({ id: id })
        this.setState({ projectName: name })
        this.setState({ priority: priority })
        this.setState({ startDate: startDate })
        this.setState({ endDate: endDate })
        this.setState({ userId: userId })
        this.setState({ userName: userName })
    }

    onUpdate(e) {
        e.preventDefault();
        const project = {
            userId: this.state.userId,
            projectName: this.state.projectName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            priority: this.state.priority
        }
        axios.put(PROJECT_MANAGER_API + "projects/updateProject/" + this.state.id, project).then(res => {
            this.getProject()
        })
        this.setState(prevState => ({
            priority: '0',
            value: true,
            projectName: '',
            filterKeyword: "",
            userName: '',
            flag: false,
            startDate: new Date(),
            endDate: new Date().setDate(new Date().getDate() + 1),
        }))
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
                .map((getProjects,i) => {
                    return (
                        <tbody key={i}>
                            <tr>
                                <td className='table-style'><b>Project Name :</b></td>
                                <td className='table-style'>{getProjects.projectRecord.projectName}</td>
                                <td className=''><b>Priority</b></td>
                                <td>
                                    <button type="button" className="btn btn-primary" onClick={this.updateProject.bind(this, getProjects.projectRecord.projectId, getProjects.projectRecord.projectName,
                                        getProjects.projectRecord.priority, getProjects.projectRecord.startDate, getProjects.projectRecord.endDate,
                                        getProjects.projectRecord.userId, getProjects.projectRecord.userName)}>UPDATE</button>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-style'><b>Completed:  </b>{getProjects.completedTask}</td>
                                <td className='table-style'><b>No Of Tasks:  </b>{getProjects.noOfTask}</td>
                                <td className='table-style'>{getProjects.projectRecord.priority}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={this.suspendProject.bind(this, getProjects.projectRecord.projectId)}>SUSPEND</button>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-style'><b>Start Date: </b> {getProjects.projectRecord.startDate}</td>
                                <td className='table-style'><b>End Date:  </b>{getProjects.projectRecord.endDate}</td>
                                <td className='table-style'></td>
                            </tr>
                            <tr><td><hr /></td><td><hr /></td><td><hr /></td><td><hr /></td></tr>
                        </tbody>
                    )
                });
        }

        return (
            <div className='container-fluid'><br />
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <form className='form-group card' classID='myForm'><br />
                            <div className='row'>
                                <div className='col-md-3'>
                                    <label>Project :</label>
                                </div>
                                <div className='col-md-8'>
                                    <input type='text' className="form-control" name='projectName' value={this.state.projectName}
                                        onChange={this.onProjectChange.bind(this)} />
                                </div>
                                <div className='col-md-1'></div>
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
                                            <input type="date" value={this.state.startDate} disabled={this.state.value} onChange={this.handleChangeStartDate.bind(this)} />
                                        </div>
                                        <div className='col-md-6'>
                                            <input type="date" min={this.state.startDate} value={this.state.endDate} disabled={this.state.value} onChange={this.handleChangeEndDate.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-1'></div>
                            </div><br />

                            <div className='row'>
                                <div className='col-md-3'>
                                    <label>Priority</label>
                                </div>
                                <div className='col-md-8'>
                                    <input type="range" className="custom-range" id="tickmarks" min="0" max="30" value={this.state.priority}
                                        onChange={this.onPriority.bind(this)} />
                                </div>
                                <div className='col-md-1'></div>
                            </div><br />

                            <div className='row'>
                                <div className='col-md-3'>
                                    <label>Manager :</label>
                                </div>
                                <div className='col-md-6'>
                                    <input type='text' className="form-control" name='manager' value={this.state.userName} disabled />
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
                                                {this.state.flag === false ?
                                                    <button type='submit' className='btn btn-secondary' onClick={this.onSubmit.bind(this)}>Add</button> :
                                                    <button type='submit' className='btn btn-secondary' onClick={this.onUpdate.bind(this)}>Update</button>
                                                }
                                            </div>
                                            <div className='col-md-6'>
                                                <input type='button' className='btn btn-secondary' onClick={this.cancelCourse.bind(this)} value="Reset" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><br />
                        </form>
                        <hr className='project-line' />
                        <div className="row">
                            <div className='col-md-12'>
                                <input type='text' className='form-control' placeholder="Search..." onChange={this.searchFilter.bind(this)} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className='col-12 col-sm-3'>
                                <b>Sort Projects By:</b>
                            </div>

                            <div className='col-6 col-sm-2'>
                                <button type='button' className="btn btn-info btn-sm project-button" onClick={this.sortByStartDate.bind(this, this.state.sort)}>Start Date</button>
                            </div>

                            <div className='col-6 col-sm-2'>
                                <button type='button' className="btn btn-info btn-sm project-button" onClick={this.sortByEndDate.bind(this, this.state.sort)}>End Date</button>
                            </div>

                            <div className='col-6 col-sm-2'>
                                <button type='button' className="btn btn-info btn-sm project-button" onClick={this.sortByPriority.bind(this, this.state.sort)}>Priority</button>
                            </div>

                            <div className='col-6 col-sm-2'>
                                <button type='button' className="btn btn-info btn-sm project-button" onClick={this.sortByCompleted.bind(this, this.state.sort)}>Completed</button>
                            </div>

                        </div>
                        <br />
                        <div className="row">
                            <div className='col-md-12'>
                                <table className="table table-borderless">
                                    {this.renderProject()}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row-md-2'></div>
            </div>
        )
    }
}