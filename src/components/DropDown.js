import React from "react";
import $ from "jquery";

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        $('.dropdown-menu').toggleClass('show');
    }


    render() {
        let users = this.props.users;
        return (

            <div className="dropdown" style={{padding:"5px"}}>
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.handleClick} style={{backgroundColor:"white",color:"black"}}>
                   {this.props.user.name || "Users"}
                </a>
                {users.length > 0 && <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {users.map((user,index)=>{
                        return <a className="dropdown-item" href="#" onClick={(e)=>{this.handleClick(); this.props.selectActiveUser(index)}}>{user.image}<span style={{marginLeft:"5px"}}>{user.name}</span></a>
                    })}
                </div>}
            </div>
        );
    }
}