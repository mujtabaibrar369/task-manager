const TaskForm = ({
  createTask,
  name,
  inputChangeHandler,
  isEditing,
  updateTask,
}) => {
  return (
    <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
      <input
        name="name"
        type="text"
        placeholder="Add a task"
        value={name}
        onChange={inputChangeHandler}
      ></input>
      <button>{isEditing ? "Edit" : "Add"}</button>
    </form>
  );
};
export default TaskForm;
