import React from 'react';
import axios from 'axios'
import AddTask from './AddTask'
import { Route } from "react-router-dom";

class ViewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project: '',
            projectDetails: [],
            filterKeyword: '',
            details: [],
            projectName: '',
            taskDetails: [],
            id: '',
            taskName: '',
            startDate: '',
            endDate: '',
            priority: 0
        };
    }

    componentWillMount() {
        axios.get("http://localhost:9091/projectmanager/projects/getProjects").then(res => {
            this.setState({ projectDetails: res.data })
        });
    }

    changeFilterValue(e) {
        this.setState({ filterKeyword: e.target.value })
    }

    rowClicked(projectDetails) {
        this.setState({ details: projectDetails })
        this.setState({ details: projectDetails })
        this.setState({ projectName: projectDetails.projectName })
        axios.get("http://localhost:9091/projectmanager/tasks/SearchTask/" + projectDetails.projectId).then(res => {
            this.setState({ taskDetails: res.data })
        })
    }

    updateTask(id, name, startDate, endDate, priority) {
        this.setState({ id: id });
        this.setState({ taskName: name });
        this.setState({ startDate: startDate });
        this.setState({ endDate: endDate });
        this.setState({ priority: priority });
        return (<Route path="/AddTask" component={AddTask} />)
    }

    renderTask() {
        return (
            this.state.taskDetails.map(data =>
                <tr>
                    <td key={data.taskId} className='jumbotron'>{data.taskName}</td>
                    <td key={data.startDate} >{data.startDate}</td>
                    <td key={data.endDate} >{data.endDate}</td>
                    <td key={data.priority}>{data.priority}</td>
                    <td>
                        <div className='row'>
                            <div className='col-md-4'>
                                <button type="button" className="btn btn-primary" onClick={this.updateTask.bind(this, data.taskId,
                                    data.taskName, data.startDate, data.endDate, data.priority)}>UPDATE</button>
                            </div>
                            <div className='col-md-4'>
                                <button type="button" className="btn btn-danger">SUSPEND</button>
                            </div>
                        </div>
                    </td>
                </tr>

            )
        )
    }

    render() {

        let filteredItems;
        if (this.state.projectDetails) {
            filteredItems = this.state.projectDetails.filter(projectDetails => projectDetails.projectName.toUpperCase().includes(this.state.filterKeyword.toUpperCase())).map((projectDetails, index) => {
                return (
                    <tr data-dismiss='modal' onClick={this.rowClicked.bind(this, projectDetails)}>
                        <td key={projectDetails.projectName}> {projectDetails.projectName}</td>
                    </tr>
                );
            });
        }

        return (
            <div className='container-fluid'>
                <br /><br />
                <form className='form-group' classID='myForm'>
                    <div className='row' id="selectProject">
                        <div className='col-sm-1'></div>
                        <div className='col-sm-1'>
                            <label>Project :</label>
                        </div>
                        <div className='col-sm-1'>
                            <input type='text' className="form-control" name='manager' placeholder={this.state.projectName} disabled={true} />
                        </div>
                        <div className='col-sm-1'>
                            <button type='button' className="btn btn-secondary searchBtn" data-toggle="modal" data-target="#myModal">Search</button>
                        </div>
                        <div className='col-sm-1'></div>
                        <div className='col-sm-1'>
                            <b>Sort Task By:</b>
                        </div>

                        <div className='col-sm-1'>
                            <button type='button' className="btn btn-info btn-sm">StartDate</button>
                        </div>

                        <div className='col-sm-1'>
                            <button type='button' className="btn btn-info btn-sm">End Date</button>
                        </div>

                        <div className='col-sm-1'>
                            <button type='button' className="btn btn-info btn-sm">Priority</button>
                        </div>

                        <div className='col-sm-1'>
                            <button type='button' className="btn btn-info btn-sm">Completed</button>
                        </div>

                    </div>
                    <hr />

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
                                                <th className="text-center">PROJECT NAME</th>
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
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-9'>
                            <table className="table table-borderless table-condensed">
                                <thead>
                                    <tr>
                                        <th className="text-center">TASK NAME</th>
                                        <th className="text-center">START DATE</th>
                                        <th className="text-center">END DATE</th>
                                        <th className="text-center">PRIORITY</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTask()}
                                </tbody>
                            </table>
                        </div>
                        <div className='col-md-1'></div>
                    </div>
                </form>
            </div>
        )
    }

}

export default ViewTask;