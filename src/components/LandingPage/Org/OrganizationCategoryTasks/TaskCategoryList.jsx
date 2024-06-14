import React from 'react';
import '../ViewOrganizations.css';

import TaskCategoryDetails from './TaskCategoryDetails';
export default function TaskCategoryList({ TaskData }) {
  return (
    <div className="viewThirdRow">
      {TaskData.map((task) => (
        <TaskCategoryDetails key={task.id} task={task} />
      ))}
    </div>
  );
}
