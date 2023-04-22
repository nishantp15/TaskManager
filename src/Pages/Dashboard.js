import React from "react";
import DashboardStyles from "./Styles/Dashboard.module.css";

const Dashboard = () => {
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
            <div className={DashboardStyles.TaskCard}>
              <div className={DashboardStyles.TaskCompletedMarkerBox}>
                <svg
                  className="MarkAsCompletedWithoutCheck"
                  stroke="rgb(93, 158, 188)"
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                >
                  <path
                    d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z"
                    fill="currentColor"
                  ></path>
                </svg>
                <svg
                class="MarkAsCompletedWithCheck"
                //   className="MarkAsCompletedWithCheck"
                  fill="currentColor"
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                >
                  <path class="MarkAsCompletedWithCheck"
                    d="M10 2a8 8 0 110 16 8 8 0 010-16zm0 1a7 7 0 100 14 7 7 0 000-14zm3.36 4.65c.17.17.2.44.06.63l-.06.07-4 4a.5.5 0 01-.64.07l-.07-.06-2-2a.5.5 0 01.63-.77l.07.06L9 11.3l3.65-3.65c.2-.2.51-.2.7 0z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div className={DashboardStyles.TaskDetails}>
                <div className={DashboardStyles.TaskDetails1}><p>Complete this assignment</p></div>
                <div className={DashboardStyles.TaskDetails2}>
                 
                </div>
              </div>
              <div className={DashboardStyles.TaskMarkImpOrDeleteActions}></div>
            </div>
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
