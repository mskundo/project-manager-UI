import React from "react";
import axios from "axios";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      currentDate: "",
      endDate: new Date().setDate(new Date().getDate() + 1),
      priority: "0",
      taskName: "",
      value: true,
      filterKeyword: "",
      filterKeyword2: "",
      filterKeyword3: "",
      projectDetails: [],
      project: "",
      parentTaskDetails: [],
      parentTask: "",
      user: "",
      status: "",
      usersDetails: []
    };
  }

  componentWillMount = () => {
    this.setStartEndDates();
    axios.get("http://localhost:9091/projectmanager/projects/getProjects")
      .then(res => {
        this.setState({ projectDetails: res.data });
      });

    axios.get("http://localhost:9091/projectmanager/parentTask/getParentTasks")
      .then(res => {
        this.setState({ parentTaskDetails: res.data });
      });

    axios.get("http://localhost:9091/projectmanager/user/getAllUsers")
      .then(res => {
        this.setState({ usersDetails: res.data });
      });
  };

  setStartEndDates() {
    var todaysDate = new Date();
    var date = todaysDate.toISOString().substr(0, 10);
    this.setState({ startDate: date });
    var nxtDate = new Date();
    nxtDate.setDate(nxtDate.getDate() + 1);
    this.setState({ endDate: nxtDate.toISOString().substr(0, 10) });
  };

  rowClicked(projectDetails) {
    this.setState({ projectDetail: projectDetails })
    this.setState({ project: projectDetails.projectName });
  };

  rowClicked2(parentTaskDetails) {
    this.setState({ parentTaskDetail: parentTaskDetails })
    this.setState({ parentTask: parentTaskDetails.parentTaskName });
  };

  rowClicked3(userDetails) {
    this.setState({ userDetail: userDetails })
    let fullName = userDetails.firstName + " " + userDetails.lastName;
    this.setState({ user: fullName });
  };

  changeFilterValue(e) {
    this.setState({ filterKeyword: e.target.value });
  };

  changeFilterValue2(e) {
    this.setState({ filterKeyword2: e.target.value });
  };

  changeFilterValue3(e) {
    this.setState({ filterKeyword3: e.target.value });
  };

  onTaskChange(e) {
    this.setState({ taskName: e.target.value });
  };

  handleChangeStartDate(e) {
    let newStartDate = e.target.value;
    this.setState({ startDate: newStartDate });
  }

  handleChangeEndDate(e) {
    let newEndDate = e.target.value;
    this.setState({ endDate: newEndDate });
  }

  onPriority(e) {
    this.setState({ priority: e.target.value });
  }

  onDisable() {
    if (this.state.value === true) {
      this.setState({ value: false });
    } else {
      this.setState({ value: true });
    }
  };

  onSubmit(e) {
    e.preventDefault();
    if (this.state.value === false) {
      const parentTask = {
        taskName: this.state.taskName
      }
      axios.post("http://localhost:9091/projectmanager/parentTask/save", parentTask)
        .then(res => {
          console.log(res.data);
        });
    } else {
      const task = {
        user: this.state.userDetail,
        taskName: this.state.taskName,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        priority: this.state.priority,
        status: this.state.status,
        project: this.state.projectDetail,
        parent: this.state.parentTaskDetail
      };
      axios.post("http://localhost:9091/projectmanager/tasks/saveTask", task)
        .then(res => {
          console.log(res.data);
        });
    }
  }

  render() {
    let filteredItems;
    if (this.state.projectDetails) {
      filteredItems = this.state.projectDetails.filter(projectDetails =>
        projectDetails.projectName.toUpperCase().includes(this.state.filterKeyword.toUpperCase()))
        .map((projectDetails, index) => {
          return (
            <tr data-dismiss="modal" onClick={this.rowClicked.bind(this, projectDetails)}>
              <td key={index + projectDetails.projectName}>{projectDetails.projectName}</td>
            </tr>
          );
        });
    }

    let filteredItems2;

    if (this.state.parentTaskDetails) {
      filteredItems2 = this.state.parentTaskDetails.filter(parentTaskDetails =>
        parentTaskDetails.parentTaskName.toUpperCase().includes(this.state.filterKeyword2.toUpperCase()))
        .map((parentTaskDetails, index) => {
          return (
            <tr data-dismiss="modal" onClick={this.rowClicked2.bind(this, parentTaskDetails)}>
              <td key={index + parentTaskDetails.parentTaskName}>{parentTaskDetails.parentTaskName}</td>
            </tr>
          );
        });
    }

    let filteredItems3;

    if (this.state.usersDetails) {
      filteredItems3 = this.state.usersDetails.filter(userDetails =>
        userDetails.firstName.toUpperCase().includes(this.state.filterKeyword3.toUpperCase()) ||
        userDetails.empId.toUpperCase().includes(this.state.filterKeyword3.toUpperCase()))
        .map((userDetails, index) => {
          return (
            <tr data-dismiss="modal" onClick={this.rowClicked3.bind(this, userDetails)}>
              <td key={index + userDetails.empId}>{userDetails.empId}</td>
              <td key={index + userDetails.firstName}>{userDetails.firstName} {userDetails.lastName}</td>
            </tr>
          );
        });
    }

    return (
      
      <div className="container-fluid">
        <br />
        <form className="form-group" classID="myForm" onSubmit={this.onSubmit.bind(this)}>
          <div className="row">
            <div className="col-sm-2">
              <label>Project:</label>
            </div>
            <div className="col-sm-8">
              <input type="text" className="form-control" placeholder={this.state.project} disabled />
            </div>
            <div className="col-sm-1">
              <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#myModal">Search</button>
            </div>
            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Project Search</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body">
                    <input type="text" placeholder="search.." className="form-control" onChange={this.changeFilterValue.bind(this)} />
                    <table className="table table-borderless table-condensed table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">Project</th>
                        </tr>
                      </thead>
                      <tbody>{filteredItems}</tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">
              <label>Task:</label>
            </div>
            <div className="col-sm-8">
              <input type="text" className="form-control" onChange={this.onTaskChange.bind(this)} value={this.state.taskName} />
            </div>
            <div className="col-sm-1"></div>
          </div><br />
          <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-2">
              <div className="checkbox">
                <label><input type="checkbox" value="" onChange={this.onDisable.bind(this)} />
                  Parent Task
                </label>
              </div>
            </div>
            <div className="col-sm-8"></div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">
              <label>Priority :</label>
            </div>
            <div className="col-sm-8">
              <form className="range-field my-4 w-100">
                <input type="range" className="custom-range" id="tickmarks" onChange={this.onPriority.bind(this)}
                  value={this.state.priority} min="0" max="30" disabled={!this.state.value} />
              </form>
            </div>
            <div className="col-sm-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <label>Parent Task :</label>
            </div>
            <div className="col-sm-8">
              <input type="text" className="form-control" placeholder={this.state.parentTask} disabled={!this.state.value} disabled />
            </div>
            <div className="col-sm-1">
              <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#myModal2" disabled={!this.state.value} >
                Search
              </button>
            </div>
            <div className="modal fade" id="myModal2" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Parent Task Search</h4>
                    <button type="button" className="close" data-dismiss="modal"> &times;</button>
                  </div>
                  <div className="modal-body">
                    <input type="text" placeholder="search.." className="form-control" onChange={this.changeFilterValue2.bind(this)} />
                    <table className="table table-borderless table-condensed table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">parentTask Name</th>
                        </tr>
                      </thead>
                      <tbody>{filteredItems2}</tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" > Close </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">
              <label>Start Date :</label>
            </div>
            <div className="col-sm-3">
              <input type="Date" className="form-control" defaultValue={this.state.startDate} onChange={this.handleChangeStartDate.bind(this)}
                disabled={!this.state.value} />
            </div>
            <div className="col-sm-2">
              <label>End Date:</label>
            </div>
            <div className="col-sm-3">
              <input type="Date" min={this.state.startDate} defaultValue={this.state.endDate} onChange={this.handleChangeEndDate.bind(this)}
                className="form-control" disabled={!this.state.value} />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-2">
              <label>User:</label>
            </div>
            <div className="col-sm-8">
              <input type="text" className="form-control" placeholder={this.state.user} disabled={!this.state.value} disabled />
            </div>
            <div className="col-sm-1">
              <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#myModal3" disabled={!this.state.value}>Search </button>
            </div>
            <div className="modal fade" id="myModal3" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Search User</h5>
                    <button type="button" className="close" data-dismiss="modal">  &times; </button>
                  </div>
                  <div className="modal-body">
                    <input type="text" placeholder="search.." className="form-control" onChange={this.changeFilterValue3.bind(this)} />
                    <table className="table table-borderless table-condensed table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">EMPLOYEE ID</th>
                          <th className="text-center">NAME</th>
                        </tr>
                      </thead>
                      <tbody>{filteredItems3}</tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-secondary">Add Task</button>
            </div>
            <div className="col-md-1">
              <button type="button" className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTask;
