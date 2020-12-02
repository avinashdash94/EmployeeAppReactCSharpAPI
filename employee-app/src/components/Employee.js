import React,{Component} from  'react';
import {Button, ButtonToolbar, Table} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component{
    constructor(props){
        super(props);
        this.state = {emps: [], addModalShow:false, editModalShow:false} // to initialise this we required to use super, AddModalShow Variable used to show the pop up by defaulst it is false on page rendering
    }

    componentDidMount(){ //It is a life cylcle metod which render when  all  components renders 
        this.refreshList();
    }

    componentDidUpdate(){ //It is a life cylcle metod which render when any state or property related to this property changed Like new data inserted for department it will reflet the change in the table
        this.refreshList();
    }

    refreshList(){
        //*******Get the value using api we created*******
        fetch('https://localhost:44381/api/Employee')
        .then(response => response.json())
        .then(data => {
            this.setState({emps:data});
        });        
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch("https://localhost:44381/api/Employee/" + empid,{
                method: 'DELETE',
                header: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
        }
    }

    render(){
        const {emps, empid, empname, depmt, mailid, doj } = this.state;
        const addModalClose = ()=> this.setState({addModalShow: false});// This mehod is used to change the state(when we click close button on popup) of pop up when we close the pop up menu;
        const editModalClose = ()=> this.setState({editModalShow: false});// This mehod is used to change the state(when we click close button on popup) of pop up when we close the pop up menu;

        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <td>EmployeeID</td>
                    <td>EmployeeName</td>
                    <td>Department</td>
                    <td>MailId</td>
                    <td>Doj</td>
                    <td>Option</td>
                </thead>
                <tbody>
                    {emps.map(emp=>
                        <tr key = {emp.EmployeeID}> 
                        <td>{emp.EmployeeID}</td>
                        <td>{emp.EmployeeName}</td>
                        <td>{emp.Department}</td>
                        <td>{emp.MailId}</td>
                        <td>{emp.DOJ}</td>
                        <td>
                            <ButtonToolbar>
                                <Button className="mr-2"
                                variant="info"
                                onClick={()=> this.setState({editModalShow:true, empid:emp.EmployeeID, empname:emp.EmployeeName,
                                depmt: emp.Department, mailid: emp.MailId, doj: emp.DOJ})}>
                                Edit</Button>
                                <Button className="mr-2"
                                variant="danger"
                                onClick={()=> {this.deleteEmp(emp.EmployeeID);} }>
                                Delete</Button>
                                <EditEmpModal
                                    show = {this.state.editModalShow}
                                    onHide = {editModalClose}
                                    empid = {empid}
                                    empname = {empname}
                                    depmt = {depmt}
                                    mailid = {mailid}
                                    doj = {doj}
                                />
                            </ButtonToolbar>
                        </td>
                        </tr>                        
                    )}
                </tbody>
            </Table>
            <ButtonToolbar>            
                <Button variant="primary" onClick={()=> this.setState({addModalShow: true})}>
                Add Employee</Button> {/* created function to set popup stae for open the popup */}                        
                <AddEmpModal
                show={this.state.addModalShow}
                onHide={addModalClose} //calling close function on hide event
                />
            </ButtonToolbar>  
            </div>  
        );
    }
}
