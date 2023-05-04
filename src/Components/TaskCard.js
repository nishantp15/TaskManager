import React, { useState } from "react";
import TaskCardStyle from "./Styles/TaskCard.module.css";
import { AiOutlineStar, AiFillStar, AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { CiBellOn, CiStickyNote } from "react-icons/ci";
import { IoAttachSharp } from "react-icons/io5";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

const TaskCard = ({ taskData = {} }) => {
  let [isMarkedImportant, setIsMarkedImportant] = useState(
    taskData.markedImportant
  );
  // let a = new Date("02 Mar, 2023");
  let url = `http://localhost:3001/todo/`;
  async function updateTask(id, value) {
    try {
      const response = await fetch(url + id, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ markedImportant: value }),
      });
      const responseData = await response.json();
      // console.log(responseData);
      if (response.ok) {
        setIsMarkedImportant(value);
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className={TaskCardStyle.TaskCard}>
      <div className={TaskCardStyle.TaskCompletedMarkerBox}>
        <FaRegCircle className={TaskCardStyle.MarkAsCompletedWithoutCheck} />
        <FaRegCheckCircle className={TaskCardStyle.MarkAsCompletedWithCheck} />
      </div>
      <div className={TaskCardStyle.TaskDetails}>
        <div className={TaskCardStyle.TaskDetails1}>
          <p>{taskData.task}</p>
        </div>
        <div className={TaskCardStyle.TaskDetails2}>
          <p>Due: {taskData.dueDate}</p>
          <BsDot className={TaskCardStyle.CardDot} />
          <CiBellOn className={TaskCardStyle.BellIcon} />
          <p>{taskData.reminder}</p>
          <BsDot className={TaskCardStyle.CardDot} />
          <IoAttachSharp className={TaskCardStyle.AttachmentIcon} />
          <p>{taskData.file}</p>
          <BsDot className={TaskCardStyle.CardDot} />
          <CiStickyNote className={TaskCardStyle.NoteIcon} />
          <p>{taskData.note}</p>
        </div>
      </div>
      <div className={TaskCardStyle.TaskMarkImpOrDeleteActions}>
        {isMarkedImportant ? (
          <AiFillStar
            onClick={() => updateTask(taskData.id, false)}
            className={TaskCardStyle.MarkImportant}
          />
        ) : (
          <AiOutlineStar
            onClick={() => updateTask(taskData.id, true)}
            className={TaskCardStyle.MarkImportant}
          />
        )}
        <AiFillEdit className={TaskCardStyle.EditTask} />
        <MdDelete className={TaskCardStyle.DeleteTask} />
      </div>
    </div>
  );
};

export default TaskCard;
