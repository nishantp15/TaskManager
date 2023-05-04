import React, { useEffect, useState } from "react";
import DashboardStyles from "./Styles/Dashboard.module.css";
import AddTaskAndGeneralDisplay from "../Components/AddTaskAndGeneralDisplay";
import TaskCard from "../Components/TaskCard";
import StatsDisplay from "../Components/StatsDisplay";

const Dashboard = () => {
  let [TaskDataArray, setTaskDataArray] = useState([]);
  let [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let url = `http://localhost:3001/todo`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((val) => {
        let sortedDateArray = val.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );
        setTaskDataArray(sortedDateArray);
      });
  }, [isUpdated]);

  function updateTaskDisplayData(data) {
    setTaskDataArray(data);
  }

  function getData(url) {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((val) => {
        let sortedDateArray = val.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );
        setTaskDataArray(sortedDateArray);
      });
  }
  console.log(5);
  // console.log(TaskDataArray);

  return (
    <div className={DashboardStyles.DashboardContainerMain}>
      <div className={DashboardStyles.DashboardContainerLeft}>
        {/* 1. Add Task */}
        <AddTaskAndGeneralDisplay
          updateAddedTask={updateTaskDisplayData}
          TaskDataArray={TaskDataArray}
        />

        {/* 2. Task Box  */}
        <div className={DashboardStyles.DashboardTaskDisplayMainBox}>
          <div className={DashboardStyles.TaskDisplayHeader}>
            <h3>Tasks</h3>
          </div>
          <div className={DashboardStyles.TaskDisplayBox}>
            {/* Task Card */}
            {TaskDataArray.map((ele, ind) => {
              return (
                <TaskCard
                  key={ele.id}
                  taskData={ele}
                  getData={getData}
                  updated={(val) => setIsUpdated(val)}
                />
              );
            })}
          </div>

          {/* 3. Pagination */}
          <div className={DashboardStyles.PaginationBox}>
            <button>Prev</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>Next</button>
          </div>
        </div>

        {/* 4. Completed Tasks  */}
      </div>
      <div className={DashboardStyles.DashboardContainerRight}>
        <StatsDisplay />
      </div>
    </div>
  );
};

export default Dashboard;
