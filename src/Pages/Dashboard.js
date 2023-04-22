import React, { useEffect, useState } from "react";
import DashboardStyles from "./Styles/Dashboard.module.css";
import { AiOutlineStar, AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import TaskCard from "../Components/TaskCard";
const Dashboard = () => {
  let [TaskDataArray, setTaskDataArray] = useState([]);
  useEffect(()=>{
    let url = `http://localhost:3001/todo`;
    fetch(url).then((res)=>{
      return res.json();
    }).then((val)=>{
      setTaskDataArray(val)
    })
  },[])
  console.log(TaskDataArray)
  return (
    <div className={DashboardStyles.DashboardContainerMain}>
      <div className={DashboardStyles.DashboardContainerLeft}>
        <div className={DashboardStyles.DashboardUserControlMain}>
          <div className={DashboardStyles.UserNameAndGeneralDetailsBox}>
            <div className={DashboardStyles.UserNameBox}>
              <h2>Hi, Nishant</h2>
            </div>
            <div className={DashboardStyles.DateTimeAndTempDisplayBox}>
              <div className={DashboardStyles.DateAndTimeDisplayBox}>
                <p>23:52:08</p>
                <p>20 Apr, 2023</p>
              </div>
              <div className={DashboardStyles.TempDisplayBox}>
                <div>
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
                    alt=""
                  />
                </div>
                <p>23⁰C</p>
              </div>
            </div>
          </div>
          <div className={DashboardStyles.AddTaskAndOtherDetailsBox}>
            <div className={DashboardStyles.AddTaskAndOtherDetailsLeftBox}>
              <input type="text" placeholder="Add a task" />
              <textarea name="" id="" placeholder="Add a note..."></textarea>
            </div>
            <div className={DashboardStyles.AddTaskAndOtherDetailsRightBox}>
              <button>Add due date</button>
              <button>Set reminder</button>
              <button>Add a file</button>
              <select name="" id="">
                <option value="">Set priority</option>
              </select>
              <button className={DashboardStyles.AddTaskButton}>
                Add task
              </button>
            </div>
          </div>
        </div>
        <div className={DashboardStyles.DashboardTaskDisplayMainBox}>
          <div className={DashboardStyles.TaskDisplayHeader}>
            <h3>Tasks</h3>
          </div>
          <div className={DashboardStyles.TaskDisplayBox}>
            {/* Task Card */}
            {TaskDataArray.map((ele,ind)=>{
              return <TaskCard key={ele.id} taskData={ele} />
            })}
            
          
          </div>
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
      </div>
      <div className={DashboardStyles.DashboardContainerRight}>
        <div className={DashboardStyles.DataAndStatDisplay}></div>
      </div>
    </div>
  );
};

export default Dashboard;
