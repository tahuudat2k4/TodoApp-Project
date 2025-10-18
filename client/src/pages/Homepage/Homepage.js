import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Layout/Navbar';
import '../../../src/index.css'
import PopModal from '../../components/PopModal';
import TodoServices from '../../Services/TodoServices';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner';


const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);
  // handle modal
  const openModalHandler = () => {
    setShowModal(true);
    setTitle("");
    setDescription("");
  }
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
  // handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    let filterList = allTask?.filter((item) => item.title.toLowerCase().match(query.toLowerCase()));
    console.log("filter list:", filterList);
    setSearchQuery(query);
    if(query && filterList.length > 0){
      setAllTask(filterList);
    }else{
      getUserTask();
    }
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="add-task">
          <h1>Your Task</h1>
          <input type="search" placeholder="Search your task " 
          value={searchQuery} onChange={handleSearch}/>
          <button className="btn btn-primary" onClick={openModalHandler}><i className="fa-solid fa-plus"/> Create Task </button>
        </div>
        
        { loading ?(<Spinner/>):( allTask && <Card allTask={allTask} getUserTask={getUserTask}/>)}
        {/*==========modal========== */}
      <PopModal 
      showModal={showModal}
      setShowModal={setShowModal}
      title={title} 
      setTitle={setTitle}
      description={description} 
      setDescription={setDescription}
      getUserTask={getUserTask}
      />
      </div>
    </>
  )
}

export default Homepage;
