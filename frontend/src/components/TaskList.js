import { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import loadingImg from "../assets/loader.gif";
import { URL } from "../App";
const TaskList = () => {
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");
  const { name } = formData;
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const getTasks = async () => {
    setIsLoading(true);
    console.log(`${URL}/api/tasks`);

    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field can't be empty!");
    } else {
      try {
        await axios.post(`${URL}/api/tasks`, formData);
        toast.success("Task added successful");
        setFormData({ ...formData, name: "" });
        getTasks();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
      toast.success("Task deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskId(task._id);
    setIsEditing(true);
  };
  const editTask = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    if (name == "") {
      return toast.error("Input fields can't be empty");
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData);
      getTasks();
      toast.success("Task edited");
      setFormData(...formData, { name: "" });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const completeTask = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      getTasks();
      toast.success("Task marked as Completed");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const cTasks = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTask(cTasks);
  }, [tasks]);
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        inputChangeHandler={inputChangeHandler}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={editTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks: </b>
          {tasks.length}
        </p>
        <p>
          <b>Completed Tasks: </b>
          {completedTask.length}
        </p>
      </div>
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="loading"></img>
        </div>
      )}
      {!isLoading && tasks.length == 0 ? (
        <p className="--py">No tasks found</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={index}
                taskName={task.name}
                index={index}
                delTask={deleteTask}
                id={task._id}
                getSingleTask={getTask}
                task={task}
                completeTask={completeTask}
                completedTask={completedTask}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
export default TaskList;
