import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditDepModal extends Component{
    constructor(props) {
        super(props);
        this.state = {snackbaropen: false, snakbarmsg: ''}; //This is used to track that when snakbar(it comes below for confirmation msg when we add department ) is opened 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snakbarClose = (event) =>{ // This method used when we close the snack bar on clicking close button
        this.setState({snackbaropen: false});
    }

    handleSubmit(event){
        event.preventDefault();
        // console.log(event.target);
        // console.log(event.target.DepartmentName);
        // alert(event.target.DepartmentName.value);
        fetch("https://localhost:44381/api/Department",{
            method:"PUT",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify({  //This is the Dep Oject we sent to Web Api
                DepartmentID: event.target.DepartmentID.value,
                DepartmentName:event.target.DepartmentName.value
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
                        Edit Department
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                    <Row>
                        <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="DepartmentID">
                            <Form.Label>DepartmentID</Form.Label>
                            <Form.Control type="text" name="DepartmentID" required disabled defaultValue={this.props.depid} placeholder="DepartmentID" />
                        </Form.Group>
                       
                        <Form.Group controlId="DepartmentName">
                            <Form.Label>Department Name</Form.Label>
                            <Form.Control type="text" name="DepartmentName" required defaultValue={this.props.depname} placeholder="DepartmentName" />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit">Update Department</Button>
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