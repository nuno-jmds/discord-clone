import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import PhoneIcon from "@material-ui/icons/Phone";

import Avatar from "@material-ui/core/Avatar";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import MicIcon from "@material-ui/icons/Mic";
import SettingsIcon from "@material-ui/icons/Settings";
import HeadsetIcon from "@material-ui/icons/Headset";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel";
import { useSelector } from "react-redux";
import { selectuser } from "./features/userSlice";
import db, { auth } from "./firebase";

function Sidebar() {
  const user = useSelector(selectuser);
  const [channels, setChannels] = useState([]);
  const [openChannel, setOpenChannel] = useState(false);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel_data: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) {
      db.collection("channels").add({ channelName: channelName });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <span>Discord Clone</span>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            {openChannel ? (
              <KeyboardArrowDownIcon
                className="sidebar__headerIcons"
                fontSize="small"
                onClick={() => setOpenChannel(false)}
              />
            ) : (
              <KeyboardArrowRightIcon
                className="sidebar__headerIcons"
                fontSize="small"
                onClick={() => setOpenChannel(true)}
              />
            )}

            <span>Text Channels</span>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>

        <div className="sidebar__channelsList">
          {openChannel ? (
            channels.map(({ id, channel_data }) => (
              <SidebarChannel
                key={id}
                id={id}
                channelName={channel_data.channelName}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <PhoneIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} alt="User" src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
