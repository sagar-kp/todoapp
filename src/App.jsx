import { useEffect, useState } from 'react'
import './App.css'
import {MainComp} from './components'
import { setCookie, getAllCookies, removeCookie } from './utils/cookieOperations'

function App() {
  const [formState, setFormState] = useState({
    name:"", description:"",
    column:""
  })
  const [data, setData]= useState({
    todo:{}, doing:{}, done:{}, todoArr:[], doingArr:[], doneArr:[]
  })
  const [activeCard, setActiveCard] = useState(null)

  const [validationState, setValidationState] = useState({
    name:false, description:false
  })
  const [open, setOpen] = useState({
    formOpen: false, edit:false
  })

  // console.log(data, open, validationState, formState)

  const handleDelete = e =>{
    e.preventDefault()
    removeCookie(formState.name+formState.timestamp)

    // Removing from localstate
    const newData = {...data}
    delete newData[formState.editColumn][formState.name]
    newData[`${formState.editColumn}Arr`].splice(formState.id, 1)
    for (let i=formState.id; i<newData[`${formState.editColumn}Arr`].length;i++){
      newData[`${formState.editColumn}Arr`][i].id= newData[`${formState.editColumn}Arr`][i].id-1
    }
    console.log(newData)
    setData((prev)=>({...prev,...newData}))

    // Resetting state
    setFormState(()=>({
      name:"", description:"", column:""
    }))
    setValidationState(()=>({
      name:false, description:false
    }))
    setOpen(prev=>({...prev, formOpen:false, edit:false}))
    return newData
  }
  const handleAddSubmit = e=>{
    e.preventDefault()
    let tempArr;
    if (open.edit) tempArr= handleDelete(e)[`${formState.column}Arr`]
    else 
      tempArr = data[`${formState.column}Arr`]
    // console.log(tempArr)
    const index = tempArr.length>0?tempArr.length:0
    const newObj = {
      name:formState.name, description:formState.description, 
      timestamp: (new Date()).toJSON(),
      column: formState.column,
      id:index
    }
    setCookie(formState.name+(new Date()).toJSON(), JSON.stringify(newObj))
    setData(prev=>({...prev, [formState.column]:{...prev[formState.column], [formState.name]:newObj},
      [`${formState.column}Arr`]:[...prev[`${formState.column}Arr`], newObj]
    }))

    // Resetting state
    if (open.edit===false){
      setFormState(()=>({
        name:"", description:"", column:""
      }))
      setValidationState(()=>({
        name:false, description:false
      }))
      setOpen(prev=>({...prev, formOpen:false, edit:false}))
    }

  }
  const onDrop = (column, index) =>{
    if (activeCard==null||activeCard===undefined) return
    const formData = {...formState}
    // console.log(column, index, formData)

    removeCookie(formData.name+formData.timestamp)

    // Removing from localstate
    const newData = {...data}
    delete newData[formData.editColumn][formData.name]
    newData[`${formData.editColumn}Arr`].splice(formData.id, 1)
    for (let i=formData.id; i<newData[`${formData.editColumn}Arr`].length;i++){
      const currObj = newData[`${formData.editColumn}Arr`][i]
      if (currObj){
        currObj.id= currObj.id-1
        newData[currObj.column][currObj.name].id = currObj.id-1
      }
    }

    // console.log(newData)

    // const tempArr = newData[`${column}Arr`]
    // const index2 = tempArr.length>0?tempArr.length:0
    const newObj = {
      name:formData.name, description:formData.description, 
      timestamp: (new Date()).toJSON(),
      column,
      id:index
    }
    // newData[`${formData.editColumn}Arr`].splice(formData.id, 1)
    for (let i=index; i<newData[`${column}Arr`].length;i++){
      newData[`${column}Arr`][i].id= newData[`${column}Arr`][i].id+1
    }
    if(index<newData[`${column}Arr`].length)
      newData[`${column}Arr`].splice(index, 0, newObj)
    else 
      newData[`${column}Arr`].push(newObj)
    setCookie(formData.name+(new Date()).toJSON(), JSON.stringify(newObj))
    // setData(prev=>({...prev, [column]:{...prev[column], [formData.name]:newObj},
    //   [`${column}Arr`]:[...prev[`${column}Arr`], newObj]
    // }))
    setData((prev)=>({...prev,...newData}))

    // Resetting state
    setFormState(()=>({
      name:"", description:"", column:""
    }))
  }

  useEffect(()=>{
    const compareFn = (a,b)=>a.id>b.id?1:a.id<b.id?-1:0

    
    const allCookies = getAllCookies()
    const tempData = {
      todo:{}, doing:{}, done:{}, todoArr:[], doingArr:[], doneArr:[]
    }
    for (let cookieName in allCookies){
      console.log(cookieName)
      const dataObject= JSON.parse(allCookies[cookieName])
      console.log(dataObject)
      if (dataObject.column==="todo") {
        tempData.todo[cookieName]=dataObject
        tempData.todoArr.push(dataObject)
      }
      else if (dataObject.column==="doing") {
        tempData.doing[cookieName]=dataObject
        tempData.doingArr.push(dataObject)
      }
      else if (dataObject.column==="done") {
        tempData.done[cookieName]=dataObject
        tempData.doneArr.push(dataObject)
      }
    }
    tempData.todoArr.sort(compareFn)
    tempData.doingArr.sort(compareFn)
    tempData.doneArr.sort(compareFn)
    setData(prev=>({...prev, ...tempData}))

  }, [])

  
  return (
    <div 
      style={{background:"linear-gradient(90deg, rgba(149,149,214,1) 0%, rgba(178,79,198,1) 43%, rgba(255,80,248,1) 83%, rgba(255,20,147,1) 97%)",
        minHeight:"900px", width:"100%"
      }}
    >
      
      <header style={{display:"flex", justifyContent:"flex-end", margin:"10px", padding:"10px"}}>
        <div style={{flex:"70%", paddingLeft:"50%", fontSize:"xx-large", fontWeight:"bold", color:"white"}}>Trello</div>
        <div style={{flex:"30%"}}>
          <button onClick={()=>setOpen(prev=>({...prev, formOpen:true}))}
            style={{cursor:"pointer", padding:"5px 15px", backgroundColor:"rgba(255, 255, 255, 0.7)", borderRadius:"5px",
              fontSize:"medium"
            }}
          >
            Add Task
          </button>
        </div>
        
        {open.formOpen&&<div className='overlay'>
          <div className='overlay-content'>
            <div style={{color:"red", position:"absolute", fontSize:"30px", marginLeft:"78%"}}> 
              <i className="bi bi-x-circle-fill"
                style={{cursor:"pointer"}}
                onClick={()=>setOpen(prev=>({...prev, formOpen:false}))}
              >
              </i>
            </div>
            <form style={{backgroundColor:"white", padding:"3%", width:"50%", margin:"2% 0 0 25%", borderRadius:"10px"}}
            >
              <label style={{marginTop:"10px", fontWeight:"bold"}} 
                htmlFor='task-name'
              >
                Name of the task
              </label><br/>
              <input value={formState.name} name="task-name" 
                style={{width:"95%", padding:"5px", outline:"none", }}
                onChange={e=>{
                  const value = e.target.value
                  setFormState(prev=>({...prev, name:value}))
                  if (/[^a-zA-Z]/.test(value)) setValidationState(prev=>({...prev, name:false}))
                  else if(value.length>0) setValidationState(prev=>({...prev, name:true}))
                }}
              /> <br/>
              
              {formState.name.length>0&&!validationState.name&&<>
                <span style={{fontSize:"small", color:"red"}}>
                  Name must have only alphabets
                </span><br/>
              </>}
              <br/>
              <label style={{marginTop:"20px", fontWeight:"bold"}} 
                htmlFor='task-description'
              >
                Description
              </label><br/>
              <textarea name="task-description" value={formState.description}
                style={{width:"95%", padding:"5px", outline:"none", }}
                onChange={e=>{
                  let value = e.target.value
                  setFormState(prev=>({...prev, description:value}))
                  if (value.length<25) setValidationState(prev=>({...prev, description:false}))
                  else setValidationState(prev=>({...prev, description:true}))
                }}
              /> <br/>
              {!validationState.description&&formState.description.length>0&&<span style={{fontSize:"small", color:"red"}}>
                Description must be atleast 25 characters long. 
              </span>}
              <select value={formState.column}
                style={{width:"97%", padding:"7px", outline:"none", marginTop:"10px", cursor:"pointer"}}
                onChange={e=>setFormState(prev=>({...prev, column:e.target.value}))}
              >
                <option hidden>Select an option</option>
                <option value="todo">To-Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select><br/>

              <button type='submit'
                onClick={handleAddSubmit}
                style={{width:open.edit?"48.5%":"97%", padding:"7px", outline:"none", marginTop:"10px", cursor:"pointer",
                  backgroundColor:"green", color:"white"
                }}
                disabled={formState.column.length===0||!validationState.description||!validationState.name}
              >
                {open.edit?"Edit":"Add"} Task
              </button>
              {open.edit&&<button
                onClick={handleDelete}
                style={{width:"48.5%", padding:"7px", outline:"none", marginTop:"10px", cursor:"pointer",
                  backgroundColor:"red", color:"white"
                }}
              >
                Delete Task
              </button>}
            </form>
          </div>
        </div>}
      </header>
      <MainComp data={data} setOpen={setOpen} setFormState={setFormState} onDrop={onDrop}
        setValidationState={setValidationState} setActiveCard={setActiveCard}
      />
    </div>
  )
}

export default App
