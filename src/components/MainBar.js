import React from "react";
import { Dropdown } from "./DropDown";

export class MainBar extends React.Component {

    render() {
        return (
        <>
            <header id="header" className="animated fadeInDown">
                <div id="logo-group" style={{textAlign:"right"}}>
                    <Dropdown users={this.props.users} selectActiveUser={this.props.selectActiveUser} user={this.props.user}/>
                </div>
            </header>
         </>
        )
    }
}