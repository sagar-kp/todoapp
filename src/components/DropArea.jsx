/* 
* @name = DropArea
* @description = To add logic for drag and drop space
*
*/

import { useState } from "react"
import "./DropArea.css"

export default function DropArea({onDrop}){
  const [showDrop, setShowDrop] = useState(false)
  return <section className={showDrop?"drop_area":"hide_drop"}
    onDragEnter={()=>setShowDrop(true)}
    onDragLeave={()=>setShowDrop(false)}
    onDrop={()=>{
      onDrop()
      setShowDrop(false)
    }}
    onDragOver={e=>e.preventDefault()}

  >
    Drop Here
  </section>
}