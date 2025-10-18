import React from 'react'
import toast from 'react-hot-toast'; 
import TodoServices from '../Services/TodoServices';

const PopModal = ({title, setTitle, description, setDescription, showModal,setShowModal,getUserTask}) => {
    // handle close
    const handleClose = () => {
        setShowModal(false);
    }
    // handle submit
    const handleSubmit = async () => {
        try {
         const userData = JSON.parse(localStorage.getItem("todoapp"));
         const createdBy = userData && userData.user.id;
         const data = {title, description, createdBy};  
         if(!title || !description){
            return toast.error("Please fill all the fields");
         }

         const todo = await TodoServices.createTodo(data);
         setShowModal(false);
         getUserTask();
         setTitle("");
         setDescription("");    
         toast.success("Task created successfully");
         console.log(todo);
         
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    return (
        <>
        { showModal &&(
             <div className="modal" tabIndex="-1" role='dialog' style={ { display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' } }>
                <div className="modal-dialog" role='document'>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create New Task</h5>                   
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
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"onClick={handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Task</button>
                        </div>
                    </div>
                </div>
            </div>
        )} 
        </>
    )
}

export default PopModal;
