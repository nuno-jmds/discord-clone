import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "./features/appSlice";
import "./SidebarChannel.css";

function SidebarChannel({ id, channelName }) {
  console.log(channelName);

  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
          })
        )
      }
      className="sidebarChannel"
    >
      <span>
        <span className="sidebarChannel__hash">#</span> {channelName}
      </span>
    </div>
  );
}

export default SidebarChannel;
