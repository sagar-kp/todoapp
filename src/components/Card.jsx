/* 
* @name = Card
* @description = To add logic for each task 
*
*/
export default function Card({obj, setOpen, setFormState, setValidationState, setActiveCard}){
  return (
  
    <div draggable
      onDragStart={()=>{
        setActiveCard(obj.id)
        setFormState(prev=>({...prev, name:obj.name, description:obj.description, 
          column:obj.column, timestamp:obj.timestamp, id:obj.id, editColumn:obj.column       
        }))
      }} 
      
      onDragEnd={()=>{
        setActiveCard(null)
        // setFormState(()=>({ name:"", description:"", column:""}))
      }}
      
      style={{ margin:"0px 15px 5px", padding:"10px", borderRadius:"5px", backgroundColor:"white",
        cursor:"pointer"
      }}
      onClick={()=>{
        setFormState(prev=>({...prev, name:obj.name, description:obj.description, 
          column:obj.column, timestamp:obj.timestamp, id:obj.id, editColumn:obj.column       
        }))
        setValidationState(prev=>({...prev, name:true, description:true}))
        setOpen(prev=>({...prev, formOpen:true, edit:true}))
      }}
    >
      
      <span style={{fontWeight:"bold"}}>{obj.name}</span><br/>
      <p style={{fontSize:"small"}}>{obj.description}</p>
      
      
    </div>
    )
}