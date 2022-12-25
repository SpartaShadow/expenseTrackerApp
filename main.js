"use strict";
//form.addEventListener("submit", onClick);
async function onClick(event)
{
   event.preventDefault();
   const amount=event.target.amot.value;
   const description=event.target.desci.value;
   const category=event.target.cati.value;
   let obj={
       amount,
       description,
       category
   }

    try
    {
       const response=await axios.post("https://crudcrud.com/api/5a65cc46a535451b91359d56767c56fb/expense",obj)
       console.log(response.data);
      showUserOnScreen(response.data);
    }
    catch(err)
    {

        document.body.innerHTML=document.body.innerHTML+"<h4>Something wrong on post</h4>"
        console.log(err);
    }
    }

function showUserOnScreen(user){
    document.getElementById('amt').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('cat').value ='';

    const parent = document.getElementById('listuser');
    const child=`<li id=${user._id}> ${user.amount} - ${user.description} - ${user.category} 
<button onClick=deleteUser('${user._id}')>Delete Expense</button>
<button onClick=edit('${user._id}','${user.amount}','${user.description}','${user.category}')>Edit Expense</button></li>`
           parent.innerHTML=parent.innerHTML+child;
}
window.addEventListener('DOMContentLoaded', getRest)
async function getRest()
   {
    try
    {

       const response=await axios.get("https://crudcrud.com/api/5a65cc46a535451b91359d56767c56fb/expense")
       for(let i=0;i<response.data.length;i++)
        {
            showUserOnScreen(response.data[i]);
        } 
    }
    catch(err)
    {
        document.body.innerHTML=document.body.innerHTML+"<h4>Something wrong on get</h4>"
        console.log(err);
    }
    }
    async function deleteUser(ID)
   {
    try
    {

       const response=await axios.delete(`https://crudcrud.com/api/5a65cc46a535451b91359d56767c56fb/expense/${ID}`)
       console.log(response.data);
       console.log(ID);
       removeUserFromScreen(ID);
    }
    catch(err)
    {
        document.body.innerHTML=document.body.innerHTML+"<h4>Something wrong on delete</h4>"
        console.log(err);
    }
    }

function removeUserFromScreen(Idd){
    console.log(Idd)
    const parentNode = document.getElementById('listuser');
    const childNodeToBeDeleted = document.getElementById(Idd);
    console.log("childnode is "+childNodeToBeDeleted)
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
 //edituser
function edit(ids,amoun, descri, catego)
{
    document.getElementById('amt').value = amoun;
    document.getElementById('desc').value = descri;
    document.getElementById('cat').value =catego;
    deleteUser(ids)
  }