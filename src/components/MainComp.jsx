/* 
* @name = MainComp
* @description = To add logic for the main section of the page
*
*/

import React, { useEffect } from "react"
import { getCookie, setCookie, removeCookie, getAllCookies } from "../utils/cookieOperations"
import Card from "./Card"
import DropArea from "./DropArea"
import "./MainComp.css"

export default function MainComp({
  data, setOpen, setFormState, setValidationState, setActiveCard, onDrop
}){
  
  return <main style={{margin:"10px"}}>
    <div style={{display:"flex"}}>
      <div className="maincomp_flexdivs">
        <br/><span className="maincomp_flexdivs-spans">To-do</span><br/><br/>
        <DropArea onDrop={()=>onDrop("todo", 0)}/>
        {data.todoArr.map(obj=>
        <React.Fragment key={obj.id}>
          <Card obj={obj} setOpen={setOpen} setFormState={setFormState} setValidationState={setValidationState}
            setActiveCard={setActiveCard}
          />
          <DropArea onDrop={()=>onDrop(obj.column, obj.id+1)}/>
        </React.Fragment>
        )}
      </div>
      <div className="maincomp_flexdivs">
        <br/><span className="maincomp_flexdivs-spans">Doing</span><br/><br/>
        <DropArea onDrop={()=>onDrop("doing", 0)}/>
        {data.doingArr.map(obj=>
        <React.Fragment key={obj.id}>
          <Card obj={obj} setOpen={setOpen} setFormState={setFormState} setValidationState={setValidationState}
            setActiveCard={setActiveCard}
          />
          <DropArea onDrop={()=>onDrop(obj.column, obj.id+1)}/>
        </React.Fragment>
        )}

      </div>
      <div className="maincomp_flexdivs">
        <br/><span className="maincomp_flexdivs-spans">Done</span><br/><br/>
        <DropArea onDrop={()=>onDrop("done", 0)}/>
        {data.doneArr.map(obj=>
        <React.Fragment key={obj.id}>
          <Card obj={obj} setOpen={setOpen} setFormState={setFormState} setValidationState={setValidationState}
            setActiveCard={setActiveCard}
          />
          <DropArea onDrop={()=>onDrop(obj.column, obj.id+1)}/>
        </React.Fragment>
        )}

      </div>
    </div>
  </main>
}