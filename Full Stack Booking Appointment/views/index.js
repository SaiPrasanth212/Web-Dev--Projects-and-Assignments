const serverURI = "http://localhost:3002/";

function handleFormSubmit(event) {
  event.preventDefault();
  const data = {
    name: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  console.log("10")
  axios
    .post(serverURI+'submit-form', data)
    .then((response) => {
        console.log("13")
      displayUserOnScreen(response.data);
      // Clearing the input fields
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    })
    .catch((error) => console.log("eeeee",error));
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.id = userDetails.id;
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.name} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {

    console.log("idd dele: ",event.target.parentElement.id)

    axios.delete(serverURI+"remove/"+event.target.parentElement.id)
    .then((d)=>{
      console.log("deleted ",d)
      userList.removeChild(event.target.parentElement);
      localStorage.removeItem(userDetails.email);
    }).catch((e)=>console.log("error while deleting ",e))

  });

  // editBtn.addEventListener("click", function (event) {
  //   axios.delete('https://crudcrud.com/api/51fb3f71d36941b18bdcf55f2010ac64/appointmentData/'+event.target.parentElement.id)
  //   .then((d)=>{
  //     console.log("deleted ",d)

  //     userList.removeChild(event.target.parentElement);
  //     localStorage.removeItem(userDetails.email);
  //     document.getElementById("username").value = userDetails.username;
  //     document.getElementById("email").value = userDetails.email;
  //     document.getElementById("phone").value = userDetails.phone;

  //   }).catch((e)=>console.log("error while deleting ",e))
  // });
}

document.addEventListener("DOMContentLoaded", () => {
  // let ullist = document.querySelector('ul')
  axios.get(serverURI+"getAllUsers")
  .then((d)=>{
    console.log("data ",d.data)
    let details = d.data
    for(let i=0;i<details.length;i++){
      displayUserOnScreen(details[i])
    }
  }).catch((e)=>{
    console.log("error ",e)
  })
});

