import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditEmpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {deps:[], snackbaropen: false, snakbarmsg: ''}; //This is used to track that when snakbar(it comes below for confirmation msg when we add department ) is opened 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){ // call when render the cmponent
        fetch("https://localhost:44381/api/Department")  // To get the data for department names for ddl  to insert new Employee
        .then(response=> response.json())
        .then(data =>{
            this.setState({deps: data})
        });
    }

    snakbarClose = (event) =>{ // This method used when we close the snack bar on clicking close button
        this.setState({snackbaropen: false});
    }

    handleSubmit(event){
        event.preventDefault();
        // console.log(event.target);
        // console.log(event.target.DepartmentName);
        // alert(event.target.DepartmentName.value);
        fetch("https://localhost:44381/api/Employee",{
            method:"PUT",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify({  //This is the Dep Oject we sent to Web Api
                EmployeeID: event.target.EmployeeID.value,
                EmployeeName: event.target.EmployeeName.value,
                Department: event.target.Department.value,
                MailId: event.target.MailId.value,
                DOJ: event.target.DOJ.value
            })
        })
        .then(response=> response.json()) //This is the response we get from Web Api
        .then((result)=>{
           // alert(result);
           this.setState({snackbaropen:true, snakbarmsg: result});
        },
        (error)=>{
            // alert('Failed');
           this.setState({snackbaropen:true, snakbarmsg: 'Failed'});
        });
    }

    render() {
        return (
            <div className="container">
            <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}}  //It is  the snackbar to show success full add of fail
            open={this.state.snackbaropen}
            autoHideDuration ={3000} // Time after when it will close automaticaly
            onClose={this.snakbarClose} // If we click on close button
            message={<span id="message">{this.state.snakbarmsg}</span>}
            action={[  // To close the by click on 'X'
                <IconButton key="close" arial-label="Close" color="inherit" onClick={this.snakbarClose}>X</IconButton> // When we click on close button 'x' on snack bar
            ]}
            />
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Employee
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                    <Row>
                        <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="EmployeeID">
                            <Form.Label>Employee ID</Form.Label>
                            <Form.Control type="text"
                            name="EmployeeID"
                            defaultValue= {this.props.empid}
                            required disabled placeholder="EmployeeID" />
                        </Form.Group>

                        <Form.Group controlId="EmployeeName">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control type="text"
                            name="EmployeeName"
                            defaultValue= {this.props.empname}
                            required placeholder="EmployeeName" />
                        </Form.Group>

                        <Form.Group controlId="Department">
                            <Form.Label>Department</Form.Label>
                            {/* create the ddl for department name using map method of array */}
                            <Form.Control as="select" defaultValue= {this.props.depmt}> 
                                {this.state.deps.map(dep => <option key= {dep.DepartmentID}>{dep.DepartmentName}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="MailId">
                            <Form.Label>MailId</Form.Label>
                            <Form.Control type="text"
                            name="MailId"
                            defaultValue= {this.props.mailid}
                            required placeholder="MailId" />
                        </Form.Group>

                        <Form.Group controlId="DOJ">
                            <Form.Label>DOJ</Form.Label>
                            <Form.Control type="date" 
                            name="DOJ" 
                            defaultValue= {this.props.doj}
                            required placeholder="DOJ" />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit">Update Employee</Button>
                        </Form.Group>
                        </Form>
                        </Col>
                    </Row>                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}