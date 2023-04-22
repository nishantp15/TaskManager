import React, { useEffect, useRef, useState } from "react";
import { Chart, Title, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./ToDo.css";

Chart.register(Tooltip, Title, ArcElement, Legend);

function ToDoForm() {
  let initData = { status: false, data: "" };

  let [data, setData] = useState(initData);

  let [dispData, setDispData] = useState([]);

  let [totalItems, setTotalItems] = useState(0);

  let [page, setPage] = useState(1);

  let [totalPages, setTotalPages] = useState(0);

  let[theme, setTheme] = useState({});

  let[themeText, setThemeText] = useState(true);
  // let [prevpage, setPrevPage] = useState('')
  let reference = useRef(null);

  let [TaskcompletionCount, setCompleteionCount] = useState({
    completed: "",
    incomplete: "",
  });

  let [time, setTime] = useState('');

  function TaskInput(e) {
    setData({ ...initData, data: e.target.value });
  }

  useEffect(() => {
    let value = reference.current.value;
    let url;
    if (value === "") {
      url = `http://localhost:3001/todo?_page=${page}&_limit=5`;
    } else if (value === "incomplete") {
      url = `http://localhost:3001/todo?_page=${page}&_limit=5&status=${false}`;
    } else if (value === "completed") {
      url = `http://localhost:3001/todo?_page=${page}&_limit=5&status=${true}`;
    }
    getData(url)
    // Promise.all();
    // completetionRate();
  }, [page]);

  // Get Data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async function getData(url) {
    let Res = await fetch(url);
    let d = await Res.json();
    setDispData(d);
    let TotalObjects = Res.headers.get("x-total-count");
    setTotalItems(TotalObjects);
    setTotalPages(Math.ceil(TotalObjects / 5));
  }
  console.log("y")
  // console.log(dispData); //when clicking on the next this is getting printed twice> once prev value and then next set od data
  // console.log(page);

  //  Add Task >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function AddTask(e) {
    e.preventDefault();
    // setDispData([...dispData, data]);
    fetch("http://localhost:3001/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((val) => setDispData([...dispData, val]));
  }

  // Pagination >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function NextPage() {
    if (page <= totalPages) {
      setPage((page) => page + 1);
    }
  }
  function PrevPage() {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  }


  // Task status change >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function ChangeStatus(ele, id) {
    let updateStatus;
    if (ele.status === false) {
      updateStatus = true;
    } else {
      updateStatus = false;
    }
    fetch(`http://localhost:3001/todo/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: updateStatus }),
      // body: JSON.stringify({ ...ele, status: updateStatus }),//this is also possible
    })
      .then((res) => {
        return res.json();
      })
      .then((val) => {
        let changed = dispData
          .map((ele) => {
            return ele.id === val.id ? val : ele;
          })
          setDispData(changed);
      });
      completetionRate();
  }

  // Task completeion rate >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async function completetionRate() {
    let fetchstatus = await fetch(`http://localhost:3001/todo?status=true`);
    let val = await fetchstatus.json();
    setCompleteionCount({
      ...TaskcompletionCount,
      completed: val.length,
      incomplete: totalItems - val.length,
    });
    console.log(TaskcompletionCount);
  }

  // Sorting >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function SortByCompleteion() {
    let value = reference.current.value;
    let url;
    if (value === "") {
      url = `http://localhost:3001/todo?_page=${page}&_limit=5`;
    } else if (value === "incomplete") {
      url = `http://localhost:3001/todo?_page=${page}&_limit=5&status=${false}`;
    } else if (value === "completed") {
      url = `http://localhost:3001/todo?_page=${page}&_limit=5&status=${true}`;
    }
    getData(url);
  }

  // Deleting >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function DeleteTodo(id) {
    fetch(`http://localhost:3001/todo/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((val) =>{
      console.log(val);
      let change = dispData.filter((ele)=>{
        return (id!==ele.id)
      })
      setDispData(change)
    });
    // fetch(`http://localhost:3001/todo?_page=${page}&_limit=5`)
    //   .then((res) => res.json())
    //   .then((val) => setDispData(val));
  }

  // Chart Data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const data1 = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        label: ["Task Complettion Rate", "a"],
        data: [2, 8],
        backgroundColor: ["Green", "red"],
        hoverOffset: 10,
        borderWidth: 0,
      },
    ],
  };
  const data2 = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: ["Task Complettion Rate"],
        data: [2, 8,10],
        backgroundColor: ["Red", "aqua", "blue"],
        hoverOffset: 10,
        borderWidth: 0,
      },
    ],
  };
  function themeChange(e){
    let val=e.target.checked;
    if(val){
      setThemeText(false)
      setTheme({color:"black", backgroundColor:"rgb(222, 222, 227)"})
    }else{
      setThemeText(true)
      setTheme({color:"white"})
    }
    console.log(e.target.checked);
  }

  function handleHiddenActions(e){
    console.log(e.target)
    console.log(ref.current.children);
    // hiddenAction();
  }

  function hiddenAction(a){
    console.log(a)
    // return false
  }
let ref=useRef('')
  return (
    <div id="ToDoMain" >
      <h2>To Do App</h2>
      <div id="Dashboard" >
        <div id="Dashbord-Level2Div"style={theme}>
          <div id="Nav" style={theme}>
            <div id="Nav-Right" style={theme}>
              <div >
                Hi Nishant
              </div>
              <div>
                <button>Log out</button>
              </div>
              <div id="toggle-theme">
              <label class="switch">
              <input type="checkbox" onClick={themeChange}/>
              <span class="slider round"></span>
            </label><p>Dark theme: {themeText ? "On":"Off"}</p>
              </div>
            </div>
          </div>
          <div id="timeAndDateDiv">
            {time}
          </div>
          <div id="Actions" style={theme}>
            <div id="AddTask" style={theme}>
              <h3>Add your tasks</h3>
              <div id="formDiv">
                <form action="">
                  <input type="text" onChange={TaskInput} />
                  <button onClick={AddTask}>Add Task</button>
                </form>
              </div>
            </div>
            <div id="filters">
              <h3>Filters</h3>
              <div id="subfilter">
                <div>
                  <label htmlFor="">Filter by proprity</label>&nbsp;
                  <select name="" id="">
                    <option value="">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">Filter by Completeion</label>&nbsp;
                  <select
                    name=""
                    id=""
                    ref={reference}
                    onChange={SortByCompleteion}
                  >
                    <option value="">All</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Charts */}
        <div id="Stats" style={theme}>
          <h3>Statistics</h3>
          <div id="Sub-Stats">
            <div id="Chart1">
              <Doughnut data={data1} />
            </div>
            <div id="Chart1">
              <Doughnut data={data2} />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h4>
        Page:{page} of {totalPages}
      </h4>
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Task</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>View / Edit Task</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody ref={ref}>
          {dispData.map((ele, ind) => {
            return (
              <>
                <tr key={ind + 1}>
                  <td>{ind + 1}</td>
                  <td>{ele.data}</td>
                  <td
                    style={ele.status ? { color: "green" } : { color: "red" }}
                  >
                    {ele.status ? "Completed" : "Incomplete"}
                  </td>
                  <td onClick={() => ChangeStatus(ele, ele.id)}>
                    <button>
                      {ele.status ? "Mark as incomplete" : "Mark as completed"}
                    </button>
                  </td>
                  <td>
                    <button onClick={handleHiddenActions}>View / Edit</button>
                  </td>
                  <td onClick={() => DeleteTodo(ele.id)}>
                    {" "}
                    <button event = {()=>{hiddenAction(ele)}}>Delete</button>{" "}
                  </td>
                </tr>
                <tr></tr>
              </>
            );
          })}
        </tbody>
      </table>





      <div>
        <div id="paginate">
          <button disabled={page > 1 ? false : true} onClick={PrevPage}>
            Prev
          </button>
          <button
            disabled={page < totalPages ? false : true}
            onClick={NextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToDoForm;
