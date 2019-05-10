import React from 'react';
import axios from "axios"

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            empId: '',
            addData: [],
            getData: [],
            flag: false,
            updateId: 0
        };
    }

    onFirstChange(e) {
        this.setState({ firstName: e.target.value })
    }

    onLastChange(e) {
        this.setState({ lastName: e.target.value })
    }

    onEmpId(e) {
        this.setState({ empId: e.target.value })
    }

    cancelCourse() {
        this.setState({
            firstName: '',
            lastName: '',
            empId: ''
        })
    }

    onAddUser(e) {
        e.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            empId: this.state.empId
        }
        axios.post("http://localhost:9091/projectmanager/user/saveUser", user)
            .then(res => {
                this.setState({ addData: res.data });
                this.getUserData();
            });
        this.setState(prevState => ({
            firstName: "",
            lastName: "",
            empId: ""
        }))
    }

    componentDidMount() {
        axios.get("http://localhost:9091/projectmanager/user/getAllUsers")
            .then(res => {
                this.setState({ getData: res.data });
            });
    }

    getUserData() {
        axios.get("http://localhost:9091/projectmanager/user/getAllUsers")
            .then(res => {
                this.setState({ getData: res.data });
            });
    }

    updateUser(id, fname, lname, employeeId) {
        this.setState({ flag: true })
        this.setState({ updateId: id })
        this.setState({ firstName: fname })
        this.setState({ lastName: lname })
        this.setState({ empId: employeeId })
    }

    deleteUser(id) {
        axios.delete("http://localhost:9091/projectmanager/user/deleteUser/" + id).then(res => {
            this.getUserData();
        })
    }

    onUpdate(id) {
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            empId: this.state.empId
        }
        axios.put("http://localhost:9091/projectmanager/user/updateUser/" + id, user).then(res => {
            this.getUserData();
        })
    }

    renderUser() {
        return (
            this.state.getData.map(data =>
                <tbody>
                    <tr>
                        <td key={data.userId} className='jumbotron'>{data.firstName}</td>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={this.updateUser.bind(this, data.userId, data.firstName, data.lastName, data.empId)}>UPDATE</button>
                        </td>
                    </tr>
                    <tr>
                        <td key={data.lastName} className='jumbotron'>{data.lastName}</td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={this.deleteUser.bind(this, data.userId)}>DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td key={data.empId} className='jumbotron'>{data.empId}</td>
                    </tr><br />
                </tbody>
            )
        )
    }

    render() {
        return (
            <div className='container-fluid'><br />
                <form className='form-group' id="userForm">
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-2'>
                            <label>First Name :</label>
                        </div>
                        <div className='col-md-4'>
                            {this.state.flag === false ?
                                <input type='text' className="form-control" name='firstName' value={this.state.firstName}
                                    onChange={this.onFirstChange.bind(this)} />
                                : <input type='text' className="form-control" value={this.state.firstName} onChange={this.onFirstChange.bind(this)} />
                            }
                        </div>
                        <div className='col-md-4'></div>
                    </div> <br />
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-2'>
                            <label>Last Name :</label>
                        </div>
                        <div className='col-md-4'>
                             {this.state.flag === false ?
                                <input type='text' className="form-control" name='lastName' value={this.state.lastName}
                                    onChange={this.onLastChange.bind(this)} />
                                : <input type='text' className="form-control" value={this.state.lastName}
                                    onChange={this.onLastChange.bind(this)} />
                            }
                        </div>
                        <div className='col-md-4'></div>
                    </div> <br />
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-2'>
                            <label>Employee ID :</label>
                        </div>
                        <div className='col-md-2'>
                            {this.state.flag === false ?
                                <input type='text' className="form-control" name='lastName' value={this.state.empId}
                                    onChange={this.onEmpId.bind(this)} />
                                : <input type='text' className="form-control" value={this.state.empId} onChange={this.onEmpId.bind(this)} />
                            }
                        </div>
                        <div className='col-md-6'></div>
                    </div>
                    <div className='row'>
                        <div className='col-md-7'></div>
                        <div className='col-md-4'>
                            <div className='row'>
                                {this.state.flag === false ?
                                    <div className='col-md-1'>
                                        <button type='submit' className='btn btn-secondary' onClick={this.onAddUser.bind(this)}>Add</button>
                                    </div> :
                                    <div className='col-md-2'>
                                        <button type='submit' className='btn btn-secondary' onClick={this.onUpdate.bind(this, this.state.updateId)}>Update</button>
                                    </div>
                                }
                                <div className='col-md-4'>
                                    <button type='button' className='btn btn-secondary' onClick={this.cancelCourse.bind(this)} value="Reset">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className='col-md-2'></div>
                        <div className='col-md-8'>
                            <table className="table table-borderless table-condensed">
                                {this.renderUser()}
                            </table>
                        </div>
                        <div className='col-md-2'></div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddUser;