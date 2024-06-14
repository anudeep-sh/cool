import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatList from '../components/ChatPage';
import UserChatMobile from '../components/ChatPage/ChatComponents/UserDetails/UserChatMobile';
import GroupChatMobile from '../components/ChatPage/ChatComponents/GroupDetails/GroupChatMobile';

export default function ChatRoutes({ socket }) {
  const [openDetails, setOpenDetails] = React.useState(false);
  const [uploadLoader, setUploadLoader] = React.useState(false);
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [usersList, setUsersList] = React.useState([]);
  const [groupList, setGroupList] = React.useState([]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ChatList
            socket={socket}
            setSelectedChat={setSelectedChat}
            usersList={usersList}
            setUsersList={setUsersList}
            selectedChat={selectedChat}
            openDetails={openDetails}
            setOpenDetails={setOpenDetails}
            uploadLoader={uploadLoader}
            setUploadLoader={setUploadLoader}
            groupList={groupList}
            setGroupList={setGroupList}
          />
        }
      />
      <Route
        path="user/:id/:name"
        element={
          <UserChatMobile
            socket={socket}
            setSelectedChat={setSelectedChat}
            usersList={usersList}
            setUsersList={setUsersList}
            selectedChat={selectedChat}
            openDetails={openDetails}
            setOpenDetails={setOpenDetails}
            uploadLoader={uploadLoader}
            setUploadLoader={setUploadLoader}
          />
        }
      />
      <Route
        path="group/:id/:name"
        element={
          <GroupChatMobile
            chat={selectedChat}
            socket={socket}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            groupList={groupList}
            setGroupList={setGroupList}
          />
        }
      />
    </Routes>
  );
}
