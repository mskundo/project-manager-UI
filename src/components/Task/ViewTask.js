import React, { Component } from 'react';
import axios from 'axios'
import ShowTask from './ShowTask'

class ViewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project: '',
            projectDetails: [],
            filterKeyword: '',
            details: [],
            projectName: '',
            taskDetails: []
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
        this.state.details = projectDetails
        this.setState({ details: projectDetails })
        this.setState({ projectName: projectDetails.projectName })
        axios.get("http://localhost:9091/projectmanager/tasks/SearchTask/" + projectDetails.projectId).then(res => {
            this.setState({ taskDetails: res.data })
        })
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
                    <ShowTask taskData={this.state.taskDetails} />
                </form>
            </div>
        )
    }
}
export default ViewTask;