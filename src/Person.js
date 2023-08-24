import React from 'react'
import axios from "axios"
import {useMutation, useQueryClient} from "react-query"
const Person = ({name, age,id,people,setIsEditing,setEditId,setFdata}) => {
  const queryClient= useQueryClient()
  const delper= useMutation( async(id)=>{
    return await axios.delete(`http://localhost:4000/people/${id}`,id)
  }, {onSuccess : ()=> queryClient.invalidateQueries("people",{exact: true})})

  // const updper = useMutation( async(id,{name,age})=>{
  //   return await axios.put(`http://localhost:4000/people/${id}`,{name, age})
  // }, {onSuccess : ()=> queryClient.invalidateQueries("people",{exact: true})})
  
  const handleC= (id)=>{
    setIsEditing(true)
    const editedp =people.find((person)=>person.id===id)
    setEditId(id)
    setFdata({name:editedp.name ,age:editedp.age})

  }

  return (
    <article >
      <div className='artcont'>
      <h3>{name}</h3>
      <div className='holder'>
      <span>{age}</span>
      <button className='dbtn' onClick={()=>delper.mutate(id)}>delete</button>
      <button className='ebtn' onClick={()=>handleC(id)}> edit</button>
      </div>
      </div>
      </article>
  )
}

export default Person