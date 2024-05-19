import { Outlet } from "react-router-dom";
import chatbotGrey from "../assets/images/Chatbot-grey.png";
import chatbot from "../assets/images/chatbot.png";
import "../assets/styles/main.scss";

const PostLoginWrapper = () => {
  let currentYear = new Date().getFullYear();

  return (
    <div className={`post-login-wrapper`}>
      <div className="post-login-container">
        <div className="post-login-header">
          <h1>NERAi</h1>
        </div>
        <div className={`post-login-content-area`}>
          <Outlet />
        </div>

        <div className="post-login-footer">
          Copyright &#169;{currentYear} - New Era - All Rights Reserved
          <div className="chatbot">
            <img src={chatbot} alt="chatbot" className="" />
            <img src={chatbotGrey} alt="chatbot" className="" />
            <span>Need Help?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLoginWrapper;
