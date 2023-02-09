import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";
const Task = (props) => {
  return (
    <div className={props.task.completed ? "task completed" : "task"}>
      <p>
        <b>{props.index + 1}. </b>
        {props.taskName}
      </p>
      <div className="task-icons">
        <FaCheckDouble
          color="green"
          onClick={() => {
            props.completeTask(props.task);
          }}
        />
        <FaEdit
          color="purple"
          onClick={() => {
            props.getSingleTask(props.task);
          }}
        />
        <FaRegTrashAlt
          color="red"
          onClick={() => {
            props.delTask(props.id);
          }}
        />
      </div>
    </div>
  );
};
export default Task;
