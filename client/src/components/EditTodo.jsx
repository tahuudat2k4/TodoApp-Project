import React, { useState } from 'react'
import toast from 'react-hot-toast';
import TodoServices from '../Services/TodoServices';

const EditTodo = ({task,setShowModal, getUserTask}) => {
    const [title, setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [isCompleted, setIscompleted] = useState(task?.isCompleted);


    const handleClose = () => {
        setShowModal(false);
    }
    // handle select change
    const handleSlectChange = (e) => {
        setIscompleted(e.target.value);
    }
    //console.log(isCompleted);
    const id = task && task?._id;
    // handle submit
    const handleSubmit = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("todoapp"));
            const createdBy = userData && userData.user.id;
            const data = {title, description, createdBy, isCompleted}; 
         if(!title || !description){
            return toast.error("Please fill all the fields");
         } 
         await TodoServices.updateTodo(id, data);
         setTitle("");
         setDescription("");
         setShowModal(false);
         toast.success("Task updated successfully");
         getUserTask();
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }
  return (
   <>
        { task &&(
             <div className="modal" tabIndex="-1" role='dialog' style={ { display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' } }>
                <div className="modal-dialog" role='document'>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Your Task</h5>                   
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input id='floatingTitle' placeholder='Title' type="text" className="form-control" value={title} onChange={(e)=> setTitle(e.target.value)} />
                                <label  className="form-label" htmlFor='floatingTitle'>Title</label> 
                            </div>
                            <div className="form-floating">
                                <textarea className="form-control" id="floatingTextarea" placeholder="Description"
                                value={description} onChange={(e)=> setDescription(e.target.value)}>
                                </textarea>
                                <label htmlFor="floatingTextarea">Description</label>
                                <div className="my-3">
                                    <select className='form-select' onChange={handleSlectChange}>
                                        <option selected>Select Status </option>
                                        <option value={true}>Completed </option>
                                        <option value={false}>Incompleted </option>
                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"onClick={handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update Task</button>
                        </div>
                    </div>
                </div>
            </div>
        )} 
   </>
  )
}

export default EditTodo;
