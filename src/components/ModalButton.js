import { Modal, Button } from "react-bootstrap";
import React from "react";
import $ from "jquery";

export class ModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                name: "",
                email: "",
                number: "",
                id: ""
            },
            show: false,
            setShow: false,
            index: "none",
            readonly: false,
            fileName: ""
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleEditShow = this.handleEditShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.setImage = this.setImage.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleClose () {
        this.setState({
            details: {
                name: "",
                email: "",
                number: "",
                id: ""
            },
            show: false,
            setShow: false,
            index: "none",
            readonly: false,
            fileName: ""
        })
        this.props.resetIndex();
    }

    handleShow() {
        this.setState({
            index:"none",
            show: true
        });
    }

    handleChange(event) {
        let id = event.target.id;
        let value = event.target.value;
        let new_details = {...this.state.details};
        new_details[id] = value;
        this.setState({details: {...new_details}});
        this.handleValidation(id, value);
    }

    handleValidation(id, value) {
        let status = patternValidator(value, id);
        $(`#${id}`).nextAll("span")
        if (status) {
            $($(`#${id}`).nextAll("span")[0]).addClass("hide");
        } else {
            $($(`#${id}`).nextAll("span")[0]).removeClass("hide");
        }
    }

    onSave() {
        this.handleClose();
        if (this.state.index !== "none") {
            this.props.handleEditSave(this.state.details, this.state.index);
        } else {
            this.props.handleAdd(this.state.details);
        }
    }

    handleEditShow() {
        this.setState({
            index: this.props.index,
            show: true
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.index !== this.state.index) {
            let index = this.props.index;
            this.setState({
                details: this.props.table[index],
                index: index
            },()=>{
                this.setImage();
            })
        }
    }

    handleView() {
        this.setState({
            readonly: true,
            show: true
        })
    }

    setImage() {
        if(this.state.details.id) {
            let image = localStorage.getItem(this.state.details.id);
            let imgCtr = $('<img width="70px" height="70px"/>').prop('src', image);
            $('div#imgContainer').html(imgCtr);
        }
    }

    handleImage(e) {
        let file = e.target.files[0];
        let self = this;
        this.setState({
            fileName: file.name
        });
        let reader = new FileReader();
        reader.onload = function () {
            let image = reader.result;
            let id  = (self.state.details.id) ? self.state.details.id: (+ new Date());
            self.setState({
                details: {
                    ...self.state.details,
                    id: id
                }
            })
            localStorage.setItem(id, image);
            let imgCtr = $('<img width="70px" height="70px"/>').prop('src', image);
            $('div#imgContainer').html(imgCtr);
        };
        reader.readAsDataURL(file);
    }

    render() {
    const header = (this.state.index !== "none") ? (this.state.readonly) ? "View User Information" : "Edit User Information" : "Add New User";
    const { name, email, number} = this.state.details;
    const readonly = this.state.readonly;
    return (
        <div  key={this.props.index}>
            <Button variant="primary" onClick={this.handleShow} style={{margin:"0px 20px 20px 0px"}}>
                Add Contact
            </Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    Name: <br />
                        <input
                            style={{width:"100%"}}
                            id="name"
                            onChange={this.handleChange}
                            value={name}
                            readOnly={readonly}
                        /><br />
                        <span className="hide error">Please enter valid name</span>
                        <br />
                    Email:
                        <br />
                        <input
                            style={{width:"100%"}}
                            id="email"
                            type="email"
                            onChange={this.handleChange}
                            value={email}
                            readOnly={readonly}
                        /><br />
                        <span className="hide error">Please enter valid email</span>
                        <br />
                    Phone Number:
                        <br />
                        <input
                            style={{width:"100%"}}
                            id="number"
                            value={number}
                            onChange={this.handleChange}
                            readOnly={readonly}
                        /><br />
                        <span className="hide error">Please enter valid number</span>
                        <br />

                    <label className="label">Image</label>
                    <div id="imgContainer" style={{margin:"5px",border:"1px solid #fff",textAlign:"center"}}></div>
                    <label className="btn-upload">
                        <input
                            type="file"
                            name="fileupload"
                            id="panelImageFile"
                            accept="image/x-png,image/jpeg"
                            required={true}
                            onChange={this.handleImage}
                        />
                        {(!this.state.readonly) && <><button className="btn">Browse</button> {this.state.fileName}</>}
                    </label>
                </form>
            </Modal.Body>
            {(!this.state.readonly) &&
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.onSave}>
                    Save
                </Button>
            </Modal.Footer>}
            </Modal>
        </div>
        );
    }
}

const patterns = {
    "email" : "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
    "name" : "^[a-zA-Z\\s]{1,70}$",
    "number": "^\\d{10}$"
}

function patternValidator(value, patternName) {
    if (value === "") {
        return true;
    }
    let status = true;
    let regexp = patterns[patternName];
       if(value !== undefined && regexp !== undefined){
        let re = new RegExp(regexp);
           status = re.test(value);
       } else {
           status = false;
       }
    return status;
}