import TaskList from "./components/TaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const URL = process.env.REACT_APP_URL;
function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TaskList></TaskList>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
export default App;
