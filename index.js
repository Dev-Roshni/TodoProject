/*
| Method | Kaam              |
| ------ | ----------------- |
| GET    | Data lana         |
| POST   | Naya data bhejna  |
| PUT    | Pura data update  |
| PATCH  | Thoda data update |
| DELETE | Data delete       |
*/


let taskinput = document.querySelector("#taskInput")
let myBtn = document.querySelector(".btn");
let todoContainer = document.querySelector(".todoContainer");
 
//myBtn.addEventListener("click",postDate)

let API = "https://695c1ba379f2f34749d3776c.mockapi.io/api/myv1/TodoLists"

myBtn.addEventListener("click",postDate)

 async function fetchdata(){

     todoContainer.innerHTML = "";

   let Response =  await fetch(API);
   let myfetchInput = await Response.json();

   myfetchInput.forEach(obj => {
     //console.log(element);
     let createDiv = document.createElement("div")
     createDiv.classList.add("todo")
     createDiv.innerHTML = `<p class="paratext">${obj.text}</p>
            <input type="text" id="myEditInput"  placeholder = "Enter your new task...!!" value= "${obj.text}" >
            <button class="btn Deletebtn">Delete</button>
            <button class="btn Editbtn">Edit</button>
            <button class="btn savebtn">Save</button>
            `
            
           let deleteId = createDiv.querySelector(".Deletebtn")
           let Editbtn = createDiv.querySelector(".Editbtn")
           let savebtn = createDiv.querySelector(".savebtn")
           let myEditInput  = createDiv.querySelector("#myEditInput")
          let  paratext = createDiv.querySelector(".paratext")
           
          myEditInput.style.display="none"
 
           deleteId.addEventListener("click",function(){
              DeleteData(obj.id)
           })

           Editbtn.addEventListener("click", function(){
               Editbtn.style.display = "none"
                savebtn .style.display = "inline"
                paratext.style.display = "none"
              myEditInput.style.display = "inline"

           })
          savebtn .addEventListener("click", async function(){
               let value = myEditInput.value;
         await EditData (obj.id,value)   //function
          
                  Editbtn.style.display = "inline"
                savebtn .style.display = "none"
                 paratext.style.display = "inline"
              myEditInput.style.display = "none"

           })      
     
             todoContainer.append(createDiv);
   });

}

async function postDate(){
    let storetaskinput = taskinput.value;
    // console.log(storetaskinput);

     let objData= {
          text : storetaskinput.trim()
     }

     let Response =  await fetch(API,{
          method:"POST",
          headers:{
          "Content-Type": "application/json", 
          },
          body :  JSON.stringify(objData), 
     })

        fetchdata();
     taskinput.value=""

   //let myfetchInput = (await Response.json());

}

async function DeleteData(id){

   let Response =  await fetch(`${API}/${id}`,{
     method :"DELETE",
   });

   if(Response.ok){
     fetchdata();
   }
   else{
      console.error("Delete failed. ID not found:", id);
   }
  
   
}

 async function EditData (id,value){

     let objData = {
          text:value.trim()
     }
      
     let Response =  await fetch(`${API}/${id}`,{
          //update karne ke liye put method hai 
          method:"PUT",
          headers:{
               "Content-Type":"application/json"
          },
          body:JSON.stringify(objData),
        })
         
        if(Response.ok){
          fetchdata()
        }
       
          
     
}


 fetchdata();

