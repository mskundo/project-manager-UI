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
            updateId: 0,
            updateFirstName: '',
            updateLastName: '',
            updateEmpId: ''
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
            employeeId: this.state.empId
        }
        axios.post("http://localhost:9091/projectmanager/user/saveUsers", user)
            .then(res => {
                this.setState({ addData: res.data });
                this.getUserData();
            });
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

    renderUser() {
        return (
            this.state.getData.map(data =>
                <tbody>
                    <tr>
                        <td key={data.userId} className='jumbotron'>{data.firstName}</td>
                        <button type="button" className="btn btn-primary" onClick={this.updateUser.bind(this, data.userId, data.firstName, data.lastName, data.empId)}>UPDATE</button>
                    </tr>
                    <tr>
                        <td key={data.lastName} className='jumbotron'>{data.lastName}</td>
                        <button type="button" className="btn btn-danger">DELETE</button>
                    </tr>
                    <tr>
                        <td key={data.empId} className='jumbotron'>{data.empId}</td>
                    </tr><br />
                </tbody>
            )
        )
    }

    updateUser(id, fname, lname, employeeId) {
        this.state.updateId = id
        this.state.updateFirstName = fname
        this.state.updateLastName = lname
        this.state.updateEmpId = employeeId
        this.state.flag = true
        this.render()
    }

    render() {
        console.log(this.state.flag)
        return (
            <div className='container-fluid'><br />
                {this.state.flag === false ?
                    <form className='form-group' id="userForm" onSubmit={this.onAddUser.bind(this)}>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-2'>
                                <label>First Name :</label>
                            </div>
                            <div className='col-md-4'><input type='text' className="form-control" name='firstName' value={this.state.firstName}
                                onChange={this.onFirstChange.bind(this)} />
                            </div>
                            <div className='col-md-4'></div>
                        </div><br />
                        <div></div>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-2'>
                                <label>Last Name :</label>
                            </div>
                            <div className='col-md-4'>
                                <input type='text' className="form-control" name='lastName' value={this.state.lastName}
                                    onChange={this.onLastChange.bind(this)} />
                            </div>
                            <div className='col-md-4'></div>
                        </div><br />
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-2'>
                                <label>Employee ID :</label>
                            </div>
                            <div className='col-md-2'>
                                <input type='text' className="form-control" name='lastName' value={this.state.empId}
                                    onChange={this.onEmpId.bind(this)} />
                            </div>
                            <div className='col-md-6'></div>
                        </div><br />
                        <div className='row'>
                            <div className='col-md-7'></div>
                            <div className='col-md-4'>
                                <div className='row'>
                                    <div className='col-md-1'>
                                        <button type='submit' className='btn btn-secondary'>Add</button>
                                    </div>
                                    <div className='col-md-4'>
                                        <button type='button' className='btn btn-secondary' onClick={this.cancelCourse.bind(this)} value="Reset">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <table className="table table-borderless table-condensed">
                                {this.renderUser()}
                            </table>
                        </div>
                    </form>
                    :
                    < form className='form-group'>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-2'>
                                <label>{this.state.updateFirstName}</label>
                            </div>
                            <div className='col-md-4'>
                                <input type='text' className="form-control" name='firstName' value={this.state.updateFirstName}
                                />

                            </div>
                            <div className='col-md-4'></div>
                        </div> <br />
                        <div></div>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-2'>
                                <label>Last Name :</label>
                            </div>
                            <div className='col-md-4'>
                                <input type='text' className="form-control" name='lastName' value={this.state.updateLastName}
                                />
                            </div>
                            <div className='col-md-4'></div>
                        </div> <br />
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-2'>
                                <label>Employee ID :</label>
                            </div>
                            <div className='col-md-2'>
                                <input type='text' className="form-control" name='lastName' value={this.state.updateEmpId}
                                />
                            </div>
                            <div className='col-md-6'></div>
                        </div> <br />
                        <div className='row'>
                            <div className='col-md-7'></div>
                            <div className='col-md-4'>
                                <div className='row'>
                                    <div className='col-md-1'>
                                        <button type='submit' className='btn btn-secondary'>Update</button>
                                    </div>
                                    <div className='col-md-4'>
                                        <button type='button' className='btn btn-secondary' value="Reset">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                    </form>
                }
            </div>


        )
    }

}


export default AddUser;