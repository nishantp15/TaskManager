import React from "react";
import TaskCardStyle from "./Styles/TaskCard.module.css";
import { AiOutlineStar,AiFillStar, AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { CiBellOn, CiStickyNote } from "react-icons/ci";
import { IoAttachSharp } from "react-icons/io5";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

const TaskCard = ({ taskData={} }) => {
  // console.log(taskData)
  let a = new Date("02 Mar, 2023");
  // console.log(a.toDateString())
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
        {taskData.markedImportant ? <AiFillStar className={TaskCardStyle.MarkImportant}/>:<AiOutlineStar className={TaskCardStyle.MarkImportant}/>}
        <AiFillEdit className={TaskCardStyle.EditTask} />
        <MdDelete className={TaskCardStyle.DeleteTask} />
      </div>
    </div>
  );
};

export default TaskCard;
