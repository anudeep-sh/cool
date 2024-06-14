export const getDuration = (task) => {
    if (task?.duration) {
      const taskDay = Math.floor(task.duration / 86400);
      const taskHour = Math.floor((task.duration % 86400) / 3600);
      const taskMinute = Math.floor(((task.duration % 86400) % 3600) / 60);

      return {
        day: taskDay,
        hour: taskHour,
        minute: taskMinute,
      };
    }

    return {
      day: 0,
      hour: 0,
      minute: 0,
    };
  };