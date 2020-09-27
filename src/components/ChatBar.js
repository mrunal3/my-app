import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { ChatView } from "./ChatView";

export class ChatBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (<> {this.props.chatUser.name ? <OverlayTrigger trigger="click" placement="top" rootClose
                    overlay={<Popover id={"chat"} title={"conversation"}>
                                <ChatView chatUser={this.props.chatUser}/>
                            </Popover>}
                    >
                <div id="chat-container">
                    <i id="chat-icon" class="fa fa-envelope" aria-hidden="true"></i>
                </div>
                </OverlayTrigger>

                : <OverlayTrigger trigger="click" placement="top" rootClose
                    overlay={<Popover id={"chat"} title={"bot"}>
                                <span style={{padding:"10px"}}>Select user for doing conversation</span>
                            </Popover>}
                    >
                <div id="chat-container">
                    <i id="chat-icon" class="fa fa-envelope" aria-hidden="true"></i>
                </div>
                </OverlayTrigger>}
                </>)
    }
}

{/* <div id="chat-container">
    <OverlayTrigger trigger="click" placement="top" rootClose
        overlay={
            <Popover id={"chat"} title={"bot"}>
                <div> popup </div>
            </Popover>
        }>
    <i id="chat-icon" class="fa fa-envelope" aria-hidden="true"></i>
    </OverlayTrigger>
</div> */}

{/* <div id="chat-container">
    <OverlayTrigger trigger="click" placement="top" rootClose
        overlay={
            <Popover id={"chat"} title={"bot"}>
                <div> popup </div>
            </Popover>
        }>
    <i id="chat-icon" class="fa fa-envelope" aria-hidden="true"></i>
    </OverlayTrigger>
</div> */}