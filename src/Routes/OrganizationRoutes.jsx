import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Courses/Home';
import { CourseRoutes } from '../Routes/CourseRouters';
import { TaskRoutes } from '../Routes/TaskRoute';
import ConsumptionPage from '../pages/Organization/Consumption';
import OrganizationSetting from '../pages/Organization/OrganizationSetting';
import { ContestRoutes } from '../Routes/ContestRoutes';
import CheckOut from '../pages/Organization/PlansCheckOut';
import OrgPlans from '../pages/Organization/Plans';
import { AdminRoutes } from './AdminRoutes';
import { ProblemRoutes } from './ProblemRoutes';
import io from 'socket.io-client';
import GetValidatedTokenData from '../utils/helper';
import ChatRoutes from './ChatRoutes';

export const OrganizationRoutes = ({ setorgImageStatus, orgImageStatus }) => {
  const currentUserInfo = GetValidatedTokenData();
  const socket = io(process.env.REACT_APP_WEBSOCKET_URL, {
    query: {
      userId: currentUserInfo.id,
    },
    extraHeaders: {
      'Access-Control-Allow-Origin': '*x',
    },
  });
  socket.on('connect', () => {
    console.log('WebSocket connected');
  });
  return (
    <Routes>
      <Route path="problem/*" element={<ProblemRoutes />} />
      <Route path="admin/*" element={<AdminRoutes />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/consumption" element={<ConsumptionPage />} />
      <Route
        path="/settings"
        element={
          <OrganizationSetting
            orgImageStatus={orgImageStatus}
            setorgImageStatus={setorgImageStatus}
          />
        }
      />
      <Route path="course/*" element={<CourseRoutes />} />
      <Route path="task/*" element={<TaskRoutes />} />
      <Route path="contest/*" element={<ContestRoutes />} />
      <Route path="/checkout/:planId" element={<CheckOut />} />
      <Route path="/plans" element={<OrgPlans />} />
      <Route path="/chat/*" element={<ChatRoutes socket={socket} />} />
    </Routes>
  );
};
