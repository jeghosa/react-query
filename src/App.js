import React,{useState} from "react"
import Person from "./Person"
import {useQueryClient,useQuery,useMutation} from "react-query"
import axios from "axios"
import "./index.css"
function App() {
  const[fdata, setFdata]= useState({name:"", age:""})
  const[editId, setEditId]= useState(0)
  const[isEditing, setIsEditing]= useState(false)
  // const [person, setPerson]= useState({name:"", age:"", id:0})
   const queryClient= useQueryClient()

  const handlec= (e)=>{
    setFdata((prevFdata)=>{
      const{value, name}= e.target 
      return{...prevFdata, [name]: value}
    })
  }

 const cnewp = useMutation(async(indiv)=>{
  
   await axios.post("http://localhost:4000/people", indiv)
  },{
   onSuccess: ()=>

    queryClient.invalidateQueries("people")
  //  queryClient.setQueryData(["people", data.id])
    } )
   
  // const data= []

 const {data:people,isLoading,isError,error} = useQuery("people", async()=>{
   const { data} = await axios.get("http://localhost:4000/people")
  return data}, )

   const updper = useMutation( async()=>{
     console.log(editId, fdata)
    return await axios.patch(`http://localhost:4000/people/${editId}`,fdata)
  }, {onSuccess : ()=> queryClient.invalidateQueries("people")})

  //  const updper = useMutation(fetch(`http://localhost:4000/people/${editId}`,{method:"PATCH",body:JSON.stringify(person),contentType:"application/json"}).then((resp)=>resp.json).then((error)=>{console.log(error)})
  // , {onSuccess : ()=> queryClient.invalidateQueries("people")})

  // const editp= (id)=>{
  //   setIsEditing(true)
  //   const editedp =people.find((person)=>person.id===id)
  //   setEditId(id)
  //   setFdata({name:editedp.name ,age:editedp.age})

  // updper.mutate(editId,fdata)
  //  setIsEditing(false)
  // setFdata({name:"", age:""})
  
  // }

  const handles= (e)=>{
    e.preventDefault()
    
   if (isEditing) {
     console.log(editId, fdata)
    updper.mutate()
   setFdata({name:"", age:""})
  setIsEditing(false)
  //  console.log(editId, fdata)
  return
   }
    cnewp.mutate(fdata)
      setFdata({name:"", age:""})
    
   }
   
   let content
   if (isLoading) {
    content= <h3>loading...</h3>
    
   }
  //  else if (isError) {
  //   content = <h3>error.message</h3>
    
  //  }
   else{ content= people?.map((person)=>{
        return <div className="sectcont"><Person {...person} key={person.id} people={people} setFdata={setFdata} setEditId={setEditId} setIsEditing={setIsEditing}/></div>
      })}

  return (
    
    <div >
      <form onSubmit={handles}>
        <input className="ninput" name="name" type="text" placeholder="name" onChange={handlec} value={fdata.name}/>
       {/* <div className="agec">  */}
        <label htmlFor="age">age</label>
        <input type="number" name="age" id="age"  onChange={handlec} value={fdata.age} />
        {/* </div> */}
        <button>submit</button>
      </form>
      {/* <h2>{JSON.stringify(data)}</h2> */}
       {/* {console.log(people)} */}
      { content} 
      
    </div>
    
  );
}

export default App;
