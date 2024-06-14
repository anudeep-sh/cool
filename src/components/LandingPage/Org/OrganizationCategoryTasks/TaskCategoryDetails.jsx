import React from 'react';
import '../ViewOrganizations.css';
export default function TaskCategoryDetails({ task }) {
  return (
    <div className="viewThirdRow-block1" style={{ backgroundColor: task.bg }}>
      <p className="viewThirdRow-blockP">{task.Category}</p>
      <div className="viewThirdRow-blockText">
        <p>{task.NumberOfTasks}</p> <span>Tasks</span>
      </div>
    </div>
  );
}
