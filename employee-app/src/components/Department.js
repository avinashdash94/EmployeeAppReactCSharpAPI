import React,{Component} from  'react';
import {Button, ButtonToolbar, Table} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';


export class Department extends Component{
    constructor(props){
        super(props);
        this.state = {deps: [], addModalShow:false, editModalShow:false} // to initialise this we required to use super, AddModalShow Variable used to show the pop up by defaulst it is false on page rendering
    }

    componentDidMount(){ //It is a life cylcle metod which render when  all  components renders 
        this.refreshList();
    }

    componentDidUpdate(){ //It is a life cylcle metod which render when any state or property related to this property changed Like new data inserted for department it will reflet the change in the table
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch("https://localhost:44381/api/Department/" + depid,{
                method: 'DELETE',
                header: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
        }
    }

    refreshList(){
        //*******Get the value using api we created*******
        fetch('https://localhost:44381/api/Department')
        .then(response => response.json())
        .then(data => {
            this.setState({deps:data});
        });
        // *******Hard coded value for table************
        // this.setState({
        //     deps:[
        //         {"DepartmentID": 1, "DepartmentName": "IT"},
        //         {"DepartmentID": 2, "DepartmentName": "Support"}
        //     ]
        // })
    }
    render(){
        const {deps, depid, depname} = this.state;
        const addModalClose = ()=> this.setState({addModalShow: false});// This mehod is used to change the state(when we click close button on popup) of pop up when we close the pop up menu;
        const editModalClose = ()=> this.setState({editModalShow: false});// This mehod is used to change the state(when we click close button on popup) of pop up when we close the pop up menu;

        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <td>DepartmentID</td>
                    <td>DepartmentName</td>
                    <td>Option</td>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key = {dep.DepartmentID}> 
                        <td>{dep.DepartmentID}</td>
                        <td>{dep.DepartmentName}</td>
                        <td>
                            <ButtonToolbar>
                                <Button className="mr-2"
                                variant="info"
                                onClick={()=> this.setState({editModalShow:true, depid:dep.DepartmentID, depname:dep.DepartmentName})}>
                                Edit</Button>
                                <Button className="mr-2"
                                variant="danger"
                                onClick={()=> {this.deleteDep(dep.DepartmentID);} }>
                                Delete</Button>
                                <EditDepModal
                                    show = {this.state.editModalShow}
                                    onHide = {editModalClose}
                                    depid = {depid}
                                    depname = {depname}
                                />
                            </ButtonToolbar>
                        </td>
                        </tr>                        
                    )}
                </tbody>
            </Table>
            <ButtonToolbar>            
                <Button variant="primary" onClick={()=> this.setState({addModalShow: true})}>Add Department</Button> {/* created function to set popup stae for open the popup */}                        
                <AddDepModal
                show={this.state.addModalShow}
                onHide={addModalClose} //calling close function on hide event
                />
            </ButtonToolbar>  
            </div>
        );
    }
}
