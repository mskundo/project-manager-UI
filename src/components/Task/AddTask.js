import React, { Component } from 'react';
import InputRange from 'react-input-range';

class AddTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: true
        }
    }

    onDisable = () => {
        if (this.state.value === true) {
            this.setState({
                value: false
            })
        }
        else {
            this.setState({
                value: true
            })
        }
    }

    render() {
        return (
            <div className="container-fluid"><br /><br />
                <div className="row">
                    <div className="col-sm-2"><b>Project:</b></div>
                    <div className="col-sm-8">
                        <input type="text" class="form-control" value="" />
                    </div>
                    <div className="col-sm-1"><button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#myModal">Search</button></div>
                    <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">


                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Project Search</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>

                                </div>
                                <div class="modal-body">
                                    <p>Some text in the modal.</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div><br />
                <div className="row">
                    <div className="col-sm-2"><b>Task:</b></div>
                    <div className="col-sm-8">
                        <input type="text" class="form-control" value="" />
                    </div>
                    <div className="col-sm-1"></div>
                </div>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-2">
                        <div class="checkbox">
                            <label><input type="checkbox" value="" onChange={this.onDisable.bind(this)} />Parent Task</label>
                        </div>
                    </div>
                    <div className="col-sm-8"></div>
                </div><br />
                <div className="row">
                    <div className="col-sm-2"><b>Priority:</b></div>
                    <div className="col-sm-8">
                        <form className="range-field my-4 w-100">
                            <input type="range" class="custom-range" id="tickmarks" min="0" max="100" disabled={!this.state.value} /></form>
                    </div>
                    <div className="col-sm-1"> </div>
                </div>
                <div className="row">
                    <div className="col-sm-2"><b>Parent Task:</b></div>
                    <div className="col-sm-8">
                        <input type="text" class="form-control" value="" disabled={!this.state.value} />
                    </div>
                    <div className="col-sm-1"><button type="button" class="btn btn-secondary" z>Search</button></div>
                </div><br />
                <div className="row">
                    <div className="col-sm-2"><b>Start Date:</b></div>
                    <div className="col-sm-3">
                        <input type="Date" class="form-control" value="" disabled={!this.state.value} />
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-2"><b>End Date:</b></div>
                    <div className="col-sm-3">
                        <input type="Date" class="form-control" value="" disabled={!this.state.value} />
                    </div>
                </div><br />
                <div className="row">
                    <div className="col-sm-2"><b>User:</b></div>
                    <div className="col-sm-8">
                        <input type="text" class="form-control" value="" disabled={!this.state.value} />
                    </div>
                    <div className="col-sm-1"><button type="button" class="btn btn-secondary" disabled={!this.state.value}>Search</button></div>
                </div><br /><br />
                <div className="row">
                    <div className="col-sm-8"></div>
                    <div className="col-sm-2"><button type="button" className="btn btn-secondary">Update</button></div>
                    <div className="col-sm-2"><button type="button" className="btn btn-secondary">Cancel</button></div>

                </div>
            </div>

        )
    }

}

export default AddTask;