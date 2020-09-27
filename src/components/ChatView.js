import React from "react";
import { ChatTemplate } from "./ChatTemplate";

export class ChatView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div style={{height:"400px",width:"200px"}}>
                <header id="header-container"> <span id="active-user" style={{marginLeft:"5px", marginTop:"5px"}} key={this.props.chatUser.name || "No-user"}>{this.props.chatUser.image}{`   ${this.props.chatUser.name}` || "No user"}</span></header>
                <ChatTemplate />
                <footer id="footer-container">
                    <input name="message" placeholder="Send a message…" aria-label="Send a message…" tabIndex="0" style={{height:"40px",width:"100%",paddingRight:"35px"}}/>
                    <svg id="chat-btn" focusable="false" aria-hidden="true" viewBox="0 0 16 16"><path d="M1.388 15.77c-.977.518-1.572.061-1.329-1.019l1.033-4.585c.123-.543.659-1.034 1.216-1.1l6.195-.72c1.648-.19 1.654-.498 0-.687l-6.195-.708c-.55-.063-1.09-.54-1.212-1.085L.056 1.234C-.187.161.408-.289 1.387.231l12.85 6.829c.978.519.98 1.36 0 1.88l-12.85 6.83z" fillRule="evenodd"></path></svg>
                </footer>
            </div>
        )
    }
}