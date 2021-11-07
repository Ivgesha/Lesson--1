const usersAPI = "https://jsonplaceholder.typicode.com/users";
const usersPost = "https://jsonplaceholder.typicode.com/posts";
const usersTodo = "https://jsonplaceholder.typicode.com/todos";

// todo: need to add e.preventDefault.

let allUsers = [];
let allTodos = [];
let allPosts = [];

let todoListThreeOfAKind = [];
let postListThreeOfAKind = [];

const lightGreen = "#90EE90";

const usersData = [];
let dataUsersAPI = [];
let dataUsersAPIJSON;
let threeTodos;
let lastIdClicked;

const getData = async () => {
  dataUsersAPI = await fetch(`${usersAPI}`);
  dataUsersAPIJSON = await dataUsersAPI.json();

  allUsers = await fetch(`${usersAPI}`);
  allUsers = await allUsers.json();

  allTodos = await fetch(`${usersTodo}`);
  allTodos = await allTodos.json();

  allPosts = await fetch(`${usersPost}`);
  allPosts = await allPosts.json();

  // inside allTodos, we will get only 3 with the same UserId
  // same as allPosts.

  let todoCounter = 0;
  let postCounter = 0;
  allUsers.map((user) => {
    todoCounter = 0;
    for (let i = 0; i < allTodos.length; i++) {
      if (allTodos[i].userId == user.id && todoCounter < 3) {
        todoListThreeOfAKind.push(allTodos[i]);
        todoCounter++;
      }
    }
    postCounter = 0;
    for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].userId == user.id && postCounter < 3) {
        postListThreeOfAKind.push(allPosts[i]);
        postCounter++;
      }
    }
  });

  return dataUsersAPIJSON;
};

const loadData = (data) => {
  let borderCounter = 0;
  const usersList = document.getElementById("usersList");
  usersList.innerText = "";

  // get the todos and check the colors.

  data.map((user) => {
    // check the todos of the user and append the correct class = red or green
    const newUserDiv = document.createElement("div");
    const labelId = document.createElement("label");
    const labelName = document.createElement("label");
    const inputName = document.createElement("input");
    const labelEmail = document.createElement("label");
    const inputEmail = document.createElement("input");
    const btnOtherData = document.createElement("button");
    const btnUpdate = document.createElement("button");
    const btnDelete = document.createElement("button");

    newUserDiv.setAttribute("class", "newUserDivClass");
    newUserDiv.setAttribute("id", `newUserDivId-${user.id}`);

    // getTodoForColorCheck(user.id);
    // check the colors by todosListThreeOfAKind
    if (todosListThreeOfAKind(user.id)) {
      newUserDiv.style.borderColor = lightGreen;
    } else {
      newUserDiv.style.borderColor = "red";
    }

    labelId.setAttribute("onclick", `showTodoEventHandler(${user.id})`);
    labelId.setAttribute("id", `labelId-${user.id}`);
    labelId.innerText = `ID: ${user.id}`;
    labelName.innerText = "Name: ";
    inputName.value = `${user.name}`;
    labelEmail.innerText = "Email: ";
    inputEmail.value = `${user.email}`;
    btnOtherData.innerText = "Other Data"; // maybe need to send "this". that way we will know where we are hovering
    btnUpdate.innerText = "Update";
    btnDelete.innerText = "Delete";

    /* create the street.city. zipCode and hide it. */
    const seconderyDiv = document.createElement("div");
    seconderyDiv.setAttribute("id", `seconderyDiv-${user.id}`);
    seconderyDiv.setAttribute("class", `seconderyDivClass`);
    seconderyDiv.style.display = "none";
    const streetLabel = document.createElement("label");
    const streetInput = document.createElement("input");
    const cityLabel = document.createElement("label");
    const cityInput = document.createElement("input");
    const zipCpdeLabel = document.createElement("label");
    const zipCodeInput = document.createElement("input");

    streetInput.setAttribute("id", `streetInputId-${user.id}`);
    cityInput.setAttribute("id", `cityInputId-${user.id}`);
    zipCodeInput.setAttribute("id", `zipCodeInputId-${user.id}`);

    streetLabel.innerText = "Street: ";
    cityLabel.innerText = "City: ";
    zipCpdeLabel.innerText = "Zip Code: ";
    streetInput.value = user.address.street;
    cityInput.value = user.address.city;
    zipCodeInput.value = user.address.zipcode;

    seconderyDiv.appendChild(streetLabel);
    seconderyDiv.appendChild(streetInput);
    seconderyDiv.appendChild(document.createElement("br"));
    seconderyDiv.appendChild(cityLabel);
    seconderyDiv.appendChild(cityInput);
    seconderyDiv.appendChild(document.createElement("br"));
    seconderyDiv.appendChild(zipCpdeLabel);
    seconderyDiv.appendChild(zipCodeInput);
    seconderyDiv.appendChild(document.createElement("br"));

    btnOtherData.setAttribute(
      "onmouseover",
      `onHoverOtherDataEventHandler(${user.id})`
    );
    btnOtherData.setAttribute(
      "onclick",
      `onClickOtherDataEventHandler(${user.id})`
    );
    btnOtherData.setAttribute("class", "btnOtherDataClass");

    // const jsonUser = JSON.stringify(user);
    btnUpdate.setAttribute("onclick", `updateDataEventListener(${user.id})`);
    btnUpdate.setAttribute("class", "sideBtns");

    btnDelete.setAttribute("onclick", `deleteDataEventListener(${user.id})`);
    btnDelete.setAttribute("class", "sideBtns");

    newUserDiv.appendChild(labelId);
    newUserDiv.appendChild(document.createElement("br"));
    newUserDiv.appendChild(labelName);
    newUserDiv.appendChild(inputName);
    newUserDiv.appendChild(document.createElement("br"));
    newUserDiv.appendChild(labelEmail);
    newUserDiv.appendChild(inputEmail);
    newUserDiv.appendChild(document.createElement("br"));
    newUserDiv.appendChild(btnOtherData);
    newUserDiv.appendChild(btnUpdate);
    newUserDiv.appendChild(btnDelete);
    newUserDiv.appendChild(seconderyDiv);

    usersList.appendChild(newUserDiv);
  });
};

const searchEventHandler = () => {
  const searchedArr = [];
  const searchIdInput = document.getElementById("searchIdInput").value;

  closeTabs();
  // run on all the users and search their name and email.
  dataUsersAPIJSON.map((user) => {
    const foundName = user.name.indexOf(searchIdInput);
    const foundEmail = user.email.indexOf(searchIdInput);
    if (foundName != -1 || foundEmail != -1) {
      searchedArr.push(user);
    }
  });
  // if name/email contains the search bar, load their data to screen.
  loadData(searchedArr);
};

const closeTabs = () => {
  document.getElementById("newUserOption").style.display = "none";

  document.getElementById("todoTitle").style.display = "none";
  document.getElementById("todosList").style.display = "none";
  document.getElementById("todoDivList").style.display = "none";

  document.getElementById("postTitle").style.display = "none";
  document.getElementById("postsList").style.display = "none";
  document.getElementById("postDivList").style.display = "none";

  const usersList = document.getElementsByClassName("newUserDivClass");
  for (let i = 0; i < usersList.length; i++) {
    usersList[i].style.backgroundColor = "white";
  }
};

// on mouse hover on Other Data
const onHoverOtherDataEventHandler = (id) => {
  document.getElementById(`seconderyDiv-${id}`).style.display = "block";
};
const onClickOtherDataEventHandler = (id) => {
  document.getElementById(`seconderyDiv-${id}`).style.display = "none";
};
const updateDataEventListener = async (id) => {
  // update the data in the server -> put ...user + address.street,adress.city,addess.zipCode
  // find my user and update it.

  let user;

  for (let i = 0; i < dataUsersAPIJSON.length; i++) {
    if (dataUsersAPIJSON[i].id == id) user = dataUsersAPIJSON[i];
  }

  const street = document.getElementById(`streetInputId-${user.id}`).value;
  const city = document.getElementById(`cityInputId-${user.id}`).value;
  const zipcode = document.getElementById(`zipCodeInputId-${user.id}`).value;

  // update the server;
  user.address.street = street;
  user.address.city = city;
  user.address.zipcode = zipcode;

  const res = await fetch(`${usersAPI}/${user.id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const jsonRes = await res.json();
  // updates the local array.

  // find the correct user and update him;
  for (let i = 0; i < dataUsersAPIJSON.length; i++) {
    if (dataUsersAPIJSON[i].id == user.id) {
      dataUsersAPIJSON[i] = user;
    }
  }
};

const deleteDataEventListener = async (id) => {
  let user;
  let index = -1;
  for (let i = 0; i < dataUsersAPIJSON.length; i++) {
    if (dataUsersAPIJSON[i].id == id) {
      user = dataUsersAPIJSON[i];
      index = i;
    }
  }

  // update server with delete

  const deleteUrl = "https://jsonplaceholder.typicode.com/users";
  const res = await fetch(`${deleteUrl}/${id}`, {
    method: "delete",
  });

  // update dataArray
  if (index != -1) {
    dataUsersAPIJSON.splice(index, 1);
  }
  loadData(dataUsersAPIJSON);
};

const showTodoEventHandler = async (id) => {
  lastIdClicked = id;
  let x = document.getElementById("todoLabel");
  document.getElementById("todoTitle").style.display = "block";
  document.getElementById("postTitle").style.display = "block";

  document.getElementById("todoLabel").innerText = `Todos - User: ${id}`;
  document.getElementById("postLabel").innerText = `Posts - User: ${id}`;

  document.getElementById("addNewTodo").style.display = "block";
  document.getElementById("addNewPost").style.display = "block";

  document.getElementById("newUserOption").style.display = "none";
  // reset the divs color
  let usersArrayOfTodos = document.getElementsByClassName("newUserDivClass");
  for (let i = 0; i < usersArrayOfTodos.length; i++) {
    usersArrayOfTodos[i].style.backgroundColor = "white";
  }
  document.getElementById(`newUserDivId-${id}`).style.backgroundColor =
    "#FFA07A";

  // fetch todos by user and show them
  document.getElementById("todosList").innerText = "";
  document.getElementById("postsList").innerText = "";
  document.getElementById("postsList").style.display = "none";
  document.getElementById("todosList").style.display = "none";

  getTodosThreeOfAKind(id);
  getPostsThreeOfAKind(id);
  // Promise.all([getPosts(id), getTodos(id)]).then((data) => {});
};
const getPosts = (id) => {
  return new Promise(async (resolve) => {
    const posts = await fetch(`${usersPost}?userId=${id}`);
    const postsJson = await posts.json();
    loadPosts(postsJson);
    resolve(postsJson);
  });
};
const getTodos = (id) => {
  return new Promise(async (resolve) => {
    const todos = await fetch(`${usersTodo}?userId=${id}`);
    const todosJson = await todos.json();
    loadTodos(todosJson);
    resolve(todosJson);
  });
};

const getTodosThreeOfAKind = (userId) => {
  loadTodosThreeOfAKind(userId);
};

const loadTodosThreeOfAKind = (userId) => {
  // load the relevant todos.
  let todosByUserId = todoListThreeOfAKind.filter((todo) => {
    return todo.userId == userId;
  });
  // check if all the todos are completed. ->
  todosByUserId.map((todo) => {
    const todosList = document.getElementById("todosList");
    todosList.style.display = "block";
    const div = document.createElement("div");
    div.setAttribute("class", "todosListSingleDiv");
    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("label");
    const labelCompleted = document.createElement("label");
    const inputCompleted = document.createElement("label");

    labelTitle.innerText = "Title: ";
    labelCompleted.innerText = "completed: ";
    inputTitle.innerText = todo.title;
    inputCompleted.innerText = todo.completed;
    div.appendChild(labelTitle);
    div.appendChild(inputTitle);
    div.appendChild(document.createElement("br"));
    div.appendChild(labelCompleted);
    div.appendChild(inputCompleted);
    if (todo.completed == false) {
      const markCompletedBtn = document.createElement("button");
      markCompletedBtn.innerText = "Mark Completed";
      markCompletedBtn.setAttribute("class", "markCompletedBtnClass");
      markCompletedBtn.setAttribute("id", `markCompletedBtnId-${todo.id}`);
      markCompletedBtn.setAttribute(
        "onclick",
        `markCompletedBtnEventListere(${todo.id})`
      );
      div.appendChild(markCompletedBtn);
    }
    todosList.appendChild(div);
  });
};

const getPostsThreeOfAKind = (userId) => {
  loadPostsThreeOfAKind(userId);
};
const loadPostsThreeOfAKind = (userId) => {
  // get the relevant todos.
  let postsByUserId = postListThreeOfAKind.filter((post) => {
    return post.userId == userId;
  });

  postsByUserId.map((post) => {
    const postsList = document.getElementById("postsList");
    postsList.style.display = "block";
    const div = document.createElement("div");
    div.setAttribute("class", "postsListSingleDiv");
    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("label");
    const labelBody = document.createElement("label");
    const inputBody = document.createElement("label");

    labelTitle.innerText = "Title: ";
    labelBody.innerText = "Body: ";

    inputTitle.innerText = post.title;
    inputBody.innerText = post.body;
    div.appendChild(labelTitle);
    div.appendChild(inputTitle);
    div.appendChild(document.createElement("br"));
    div.appendChild(labelBody);
    div.appendChild(inputBody);
    postsList.appendChild(div);
  });
};

const getTodoForColorCheck = async (id) => {
  const todos = await fetch(`${usersTodo}?userId=${id}`);
  let todosJson = await todos.json();
  todosJson = todosJson.splice(0, 3);
  const res = checkTrueOfTodos(todosJson);
  const newUserDiv = document.getElementById(`newUserDivId-${id}`);
  if (res) {
    newUserDiv.style.borderColor = lightGreen;
  } else {
    newUserDiv.style.borderColor = "red";
  }

  return res;
};

const todosListThreeOfAKind = (id) => {
  let todosByUserId = todoListThreeOfAKind.filter((singleTodo) => {
    return singleTodo.userId == id;
  });
  return checkTrueOfTodos(todosByUserId);
};
const checkTrueOfTodos = (todos) => {
  let flag = true;
  todos.map((todo) => {
    if (todo.completed == false) flag = false;
  });
  return flag;
};

const loadPosts = (posts) => {
  posts = posts.splice(0, 3);
  posts.map((post) => {
    const postsList = document.getElementById("postsList");
    postsList.style.display = "block";
    const div = document.createElement("div");
    div.setAttribute("class", "postsListSingleDiv");
    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("label");
    const labelBody = document.createElement("label");
    const inputBody = document.createElement("label");

    labelTitle.innerText = "Title: ";
    labelBody.innerText = "Body: ";

    inputTitle.innerText = post.title;
    inputBody.innerText = post.body;
    div.appendChild(labelTitle);
    div.appendChild(inputTitle);
    div.appendChild(document.createElement("br"));
    div.appendChild(labelBody);
    div.appendChild(inputBody);
    postsList.appendChild(div);
  });
};

const loadTodos = (todos) => {
  todos = todos.splice(0, 3);
  threeTodos = todos;
  let allTodosCompleted = checkTrueOfTodos(todos);
  if (allTodosCompleted) {
    document.getElementById(`newUserDivId-${lastIdClicked}`).style.borderColor =
      lightGreen;
  } else {
    document.getElementById(`newUserDivId-${lastIdClicked}`).style.borderColor =
      "red";
  }

  todos.map((todo) => {
    const todosList = document.getElementById("todosList");
    todosList.style.display = "block";
    const div = document.createElement("div");
    div.setAttribute("class", "todosListSingleDiv");
    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("label");
    const labelCompleted = document.createElement("label");
    const inputCompleted = document.createElement("label");

    labelTitle.innerText = "Title: ";
    labelCompleted.innerText = "completed: ";
    inputTitle.innerText = todo.title;
    inputCompleted.innerText = todo.completed;
    div.appendChild(labelTitle);
    div.appendChild(inputTitle);
    div.appendChild(document.createElement("br"));
    div.appendChild(labelCompleted);
    div.appendChild(inputCompleted);
    if (todo.completed == false) {
      const markCompletedBtn = document.createElement("button");
      markCompletedBtn.innerText = "Mark Completed";
      markCompletedBtn.setAttribute("class", "markCompletedBtnClass");
      markCompletedBtn.setAttribute("id", `markCompletedBtnId-${todo.id}`);
      markCompletedBtn.setAttribute(
        "onclick",
        `markCompletedBtnEventListere(${todo.id})`
      );
      div.appendChild(markCompletedBtn);
    }
    todosList.appendChild(div);
  });
};

const markCompletedBtnEventListere = (todoId) => {
  // lastIdClicked -> the user id
  // todo id, the todoId

  /*Tree todos is what we got from server, 
  when we mark it as Done, we should send put request to server. 
  if(threeTodos.id = todoId){
  threeTodos[index] = updatedTodo.
  }

  await fetch(todos?userId=x&id=todoId,{method:put,header:...,body:JSON.stringify(...todo)})

  BUT! 
  we cant really change the api, so will keep it like this and every reload it will load the old todos..
  */

  /*
  threeTodos.map((singleTodo) => {
    if (singleTodo.id == todoId) {
      singleTodo.completed = true;
    }
  });
  document.getElementById("todosList").innerText = "";
  loadTodos(threeTodos);
*/
  todoListThreeOfAKind.map((singleTodo) => {
    if (singleTodo.id == todoId) {
      singleTodo.completed = true;
      updateTodo(singleTodo);
    }
  });
  document.getElementById("todosList").innerText = "";
  loadTodosThreeOfAKind(lastIdClicked);

  // after each click, need to check and color the borders
  const newUserDiv = document.getElementById(`newUserDivId-${lastIdClicked}`);
  if (todosListThreeOfAKind(lastIdClicked)) {
    newUserDiv.style.borderColor = lightGreen;
  } else {
    newUserDiv.style.borderColor = "red";
  }
};

const updateTodo = async (changedSingleTodo) => {
  const body = { ...changedSingleTodo };
  const res = await fetch(`${usersTodo}/${changedSingleTodo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const jsonRes = await res.json();
};

const addNewTodoOptionEventHandler = () => {
  let userId = lastIdClicked;

  document.getElementById(
    "newTodoOptionDivTitle"
  ).innerText = `Todos - User ${lastIdClicked}`;
  document.getElementById("todosList").style.display = "none";
  document.getElementById("todoTitle").style.display = "none";
  document.getElementById("todoDivList").style.display = "block";

  // const localTodos = document.getElementsByClassName("todosListSingleDiv");
  // for (let i = 0; i < localTodos.length; i++) {
  //   localTodos[i].style.display = "none";
  // }
};

const addNewPostOptionEventHandler = () => {
  let userId = lastIdClicked;
  document.getElementById(
    "newPostOptionDivTitle"
  ).innerText = `Posts - User ${lastIdClicked}`;
  document.getElementById("postsList").style.display = "none";
  document.getElementById("postTitle").style.display = "none";
  document.getElementById("postDivList").style.display = "block";
};

const cancelNewTodo = () => {
  document.getElementById("todosList").style.display = "block";
  document.getElementById("todoTitle").style.display = "block";
  document.getElementById("todoDivList").style.display = "none";
  document.getElementById("newTodoOptionDiv-input").value = "";
};
const cancelNewPost = () => {
  document.getElementById("postsList").style.display = "block";
  document.getElementById("postTitle").style.display = "block";
  document.getElementById("postDivList").style.display = "none";
  document.getElementById("newPostOptionDiv-input").value = "";
};

const addNewTodo = () => {
  let userId = lastIdClicked;
  const newTodoInput = document.getElementById("newTodoOptionDiv-input").value;
  // add to array
  // send fetch post
  // close the div and load the todos again
  cancelNewTodo();
  document.getElementById("todosList").innerText = "";
  loadTodosThreeOfAKind(userId);
};

const addNewPost = () => {
  let userId = lastIdClicked;
  const newPostInput = document.getElementById("newPostOptionDiv-input").value;
  cancelNewPost();
  document.getElementById("postsList").innerText = "";
  loadPostsThreeOfAKind(userId);
};
const addNewUserOption = () => {
  // document.getElementById("sideDiv").style.display = "none";
  document.getElementById("newUserOption").style.display = "block";

  document.getElementById("todoTitle").style.display = "none";
  document.getElementById("todosList").style.display = "none";
  document.getElementById("todoDivList").style.display = "none";

  document.getElementById("postTitle").style.display = "none";
  document.getElementById("postsList").style.display = "none";
  document.getElementById("postDivList").style.display = "none";

  const usersList = document.getElementsByClassName("newUserDivClass");
  for (let i = 0; i < usersList.length; i++) {
    usersList[i].style.backgroundColor = "white";
  }
};

const cancelNewUserOption = () => {
  document.getElementById("newUserOptionInsert-name").value = "";
  document.getElementById("newUserOptionInsert-email").value = "";
  document.getElementById("newUserOption").style.display = "none";
};
const addNewUser = () => {
  let name = document.getElementById("newUserOptionInsert-name").value;
  let email = document.getElementById("newUserOptionInsert-email").value;
  cancelNewUserOption();
};
// main //
getData().then((data) => {
  loadData(data);
});
