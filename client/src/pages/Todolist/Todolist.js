import React, { use, useEffect,useState } from 'react'
import Navbar from '../../components/Layout/Navbar';
import TodoServices from '../../Services/TodoServices';
import Spinner from '../../components/Spinner';

const Todolist = () => {
  const [todoStatus, setTodoStatus] = useState("");
  const [filterTask, setFilterTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTask, setAllTask] = useState([]); 
  // get user task
  const userData = JSON.parse(localStorage.getItem("todoapp"));
    const id = userData && userData.user.id;
    const getUserTask =  async() => {
      setLoading(true);
      try {
        const {data} = await TodoServices.getAllTodo(id);
        setLoading(false);
        setAllTask(data?.todos);
        console.log(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
  useEffect(() => {
    getUserTask();
  }, []);
  useEffect(() => {
    const incomplete = allTask?.filter((item)=> item?.isCompleted === false);
    const completed = allTask?.filter((item)=> item?.isCompleted === true);
    if(todoStatus === "Incomplete"){
      setFilterTask(incomplete);
    }else if(todoStatus === "Completed"){
      setFilterTask(completed);
    }else {
    setFilterTask(allTask); // default hiển thị tất cả
    }
    
  }, [todoStatus, allTask]);
  return (
    <div>
      <Navbar/>
      <div className="filter-container">
        <h4>Filter todolist by:</h4>
        <div className="filter-group">
          <select className="form-select" onChange={(e)=>{setTodoStatus(e.target.value)}} > 
            <option value="All" selected>Select status</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      {loading && <Spinner/>}
      <div class="container">
      <div className="card-container">
                {
                  filterTask?.length === 0 
                  ?<h1 className='no-task'>No task found</h1>
                  :filterTask?.map((task, index) => (
                        <>
                            <div className="card border-primary mb-3 mt-3" style={ { maxWidth: '18rem' } } key={ index }>
                                <div className="card-header">
                                    <div className="chead">
                                        <h6>{ task?.title.substring(0, 10) }</h6>
                                        <h6 className={ task?.isCompleted === true ? 'task-cmp' : 'task-inc' }>
                                            { task?.isCompleted === true ? 'Completed' : 'Incomplete' }
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-body ">
                                    <h6 style={ { fontWeight: "bold" } }>{ task?.title }</h6>
                                    <p className='card-text'>{ task?.description }</p>
                                    <h6>Data: { task?.createdAt.substring(0, 10) }</h6>
                                </div>
                                
                            </div> 
                        </>
                    ))
                }
      </div>
      </div>
    </div>
  )
}

export default Todolist;
