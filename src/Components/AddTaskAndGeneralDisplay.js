import React, { useState } from "react";
import AddTaskBoxStyles from "./Styles/AddTaskAndGeneralDisplay.module.css";
// import { BsXLg } from "react-icons/bs";


const AddTaskAndGeneralDisplay = ({ updateAddedTask, TaskDataArray }) => {
  
    let initFormDetails = {
    task: "",
    completed: false,
    dueDate: "18 Mar, 2023",
    reminder: "18 Mar, 2023",
    file: "1 file",
    note: "",
    markedImportant: false,
  };

  let [addTaskData, setAddTaskData] = useState(initFormDetails);

  function getFormInput(e) {
    let { name, value } = e.target;
    setAddTaskData({ ...addTaskData, [name]: value });
    console.log(addTaskData);
  }

  async function AddTask() {
    let url = `http://localhost:3001/todo`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addTaskData),
      });

      const data = await response.json();
      console.log(data)
      console.log(response.headers);
      if (response.ok) {
        updateAddedTask((prev) => [data, ...prev]);
        alert("Task added successfully");
      } else {
        alert("Some error occured");
      }

    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={AddTaskBoxStyles.DashboardUserControlMain}>
      <div className={AddTaskBoxStyles.UserNameAndGeneralDetailsBox}>
        <div className={AddTaskBoxStyles.UserNameBox}>
          <h2>Hi, Nishant</h2>
        </div>
        <div className={AddTaskBoxStyles.DateTimeAndTempDisplayBox}>
          <div className={AddTaskBoxStyles.DateAndTimeDisplayBox}>
            <p>23:52:08</p>
            <p>20 Apr, 2023</p>
          </div>
          <div className={AddTaskBoxStyles.TempDisplayBox}>
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
      <div className={AddTaskBoxStyles.AddTaskAndOtherDetailsBox}>
        <div className={AddTaskBoxStyles.AddTaskAndOtherDetailsLeftBox}>
          <input
            type="text"
            placeholder="Add a task"
            name="task"
            onChange={getFormInput}
          />
          <textarea
            name="note"
            id=""
            placeholder="Add a note..."
            onChange={getFormInput}
          ></textarea>
        </div>
        <div className={AddTaskBoxStyles.AddTaskAndOtherDetailsRightBox}>
          <button>Add due date</button>
          <button>Set reminder</button>
          <button>Add a file</button>
          <select name="" id="">
            <option value="">Set priority</option>
          </select>
          <button onClick={AddTask} className={AddTaskBoxStyles.AddTaskButton}>
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskAndGeneralDisplay;
