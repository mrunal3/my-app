import React from "react";
import { ModalButton } from "./ModalButton";

export class Table extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            table: [],
            index: "none"
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.handleAddSave = this.handleAddSave.bind(this);
        this.readOnly = this.readOnly.bind(this);
        this.resetIndex = this.resetIndex.bind(this);
        this.setPanelBtnView = this.setPanelBtnView.bind(this);
        this.callParent = this.callParent.bind(this);
        this.handleChatUser = this.handleChatUser.bind(this);
        this.table = React.createRef();
    }

    callParent() {
        this.props.callParent(this.state.table);
    }

    componentDidMount() {
        if (this.props.table.length) {
            this.setState({
                table: this.props.table
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user.name !== this.props.user.name) {
            this.setState({
                table: this.props.table
            })
        }
    }

    handleEdit(e, index) {
        this.setState({
            index: index
        },()=>{this.table.current.handleEditShow();});
    }

    handleEditSave(object, index) {
        let table = [...this.state.table];
        object.image = this.setPanelBtnView(object);
        table.splice(index,1,object);
        this.setState({
            table: table,
            index: "none"
        },()=>{
            this.callParent()
        });
    }

    handleAddSave(object) {
        let table = [...this.state.table];
        object.image = this.setPanelBtnView(object);
        table.push(object);
        this.setState({
            table: table
        },()=>{
            this.callParent()
        });
    }

    removeRow(e, index) {
        let table = [...this.state.table];
        table.splice(index,1,);
        this.setState({
            table: table
        },()=>{
            this.callParent()
        });
    }

    resetIndex() {
        this.setState({
            index: "none"
        });
    }

    readOnly(e, index) {
        this.setState({
            index: index
        },()=>{
        this.table.current.handleView();})
    }

    setPanelBtnView(object) {
        let image = localStorage.getItem(object.id);
        return (image) ? <img width="100%" src={image} height="30px" width="30px" style={{borderRadius:"50%"}}/> :
                        <img src="/img/profile.png" height="30px" width="30px" style={{borderRadius:"50%"}}/>;
    }

    handleChatUser(index) {
        this.props.handleChatUser(index);
    }

    render() {
        let table = this.state.table;
        let key = + new Date();
        return (
            <div style={{marginTop:"90px"}}>
                <div style={{textAlign:"right"}}>
                    <ModalButton
                        handleEditSave={this.handleEditSave}
                        handleAdd={this.handleAddSave}
                        table={this.state.table}
                        index={this.state.index}
                        ref={this.table}
                        resetIndex={this.resetIndex}
                    />
                </div>

                <table key={key} className="display table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th style={{textAlign:"center"}} >Full Name</th>
                            <th style={{textAlign:"center"}} className="d-none d-sm-table-cell">Email</th>
                            <th style={{textAlign:"center"}} className="d-none d-sm-table-cell">Phone Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        table.map((data, index) => {
                        return <tr key={data.name}>
                                <td key={`key-${data.image}`} style={{textAlign:"center"}} onClick={(e)=>this.handleChatUser(index)}>{data.image}</td>
                                <td key={`key-${data.name}`} style={{textAlign:"center"}}>{data.name}</td>
                                <td key={`key-${data.email}`} style={{textAlign:"center"}} className="d-none d-sm-table-cell">{data.email}</td>
                                <td key={`value-${data.number}`} style={{textAlign:"center"}} className="d-none d-sm-table-cell">{data.number}</td>
                                <td key={index} style={{textAlign:"center"}}>
                                    <a id={"view-" + index} onClick={(e)=>this.readOnly(e, index)}  style={{display:"inline-block"}}>
                                        <i className="fa fa-eye fa-1x" style={{float:"center",paddingRight:"7px",color:"blue",cursor:"pointer",fontSize:"120%"}} />
                                    </a>
                                    <a id={"edit-" + index} onClick={(e)=>this.handleEdit(e, index)} style={{display:"inline-block"}}>
                                        <i  className="fa fa-edit fa-1x" style={{float:"center",paddingRight:"5px",color:"Orange",cursor:"pointer",fontSize:"120%"}} />
                                    </a>
                                    <a id={"remove-" + index} onClick={(e)=>this.removeRow(e, index)}  style={{display:"inline-block"}}>
                                        <i className="fa fa-minus-circle fa-1x" style={{float:"center",paddingLeft:"5px",color:"Red",cursor:"pointer",fontSize:"120%"}} />
                                    </a>
                                </td>
                        </tr>},
                        this)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}