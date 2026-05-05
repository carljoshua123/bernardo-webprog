class Student {
  constructor(name) {
    this.name = name;
    this.isPresent = null;
  }
}

function addStudent() {
  const input = document.getElementById("studentInput");
  const statusMessage = document.getElementById("statusMessage");
  const name = input.value.trim();

  if (name === "") {
    alert("Please enter a student name!");
    return;
  }

  const student = new Student(name);
  console.log(student);

  const li = document.createElement("li");
  li.textContent = student.name;

  const btnGroup = document.createElement("div");
  btnGroup.classList.add("btn-group");

  // Present
  const presentBtn = document.createElement("button");
  presentBtn.textContent = "Present";
  presentBtn.onclick = () => {
    student.isPresent = true;
    li.classList.remove("absent");
    li.classList.add("present");
    showMessage(`${student.name} is marked Present`);
  };

  // Absent
  const absentBtn = document.createElement("button");
  absentBtn.textContent = "Absent";
  absentBtn.onclick = () => {
    student.isPresent = false;
    li.classList.remove("present");
    li.classList.add("absent");
    showMessage(`${student.name} is marked Absent`);
  };

  // Remove
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.onclick = () => {
    li.style.opacity = "0";
    setTimeout(() => li.remove(), 300);
    showMessage(`${student.name} was removed`);
  };

  btnGroup.append(presentBtn, absentBtn, removeBtn);
  li.appendChild(btnGroup);

  document.getElementById("studentList").appendChild(li);
  input.value = "";
}

/* Animated Message */
function showMessage(message) {
  const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = message;

  statusMessage.style.animation = "none";
  statusMessage.offsetHeight; // restart animation
  statusMessage.style.animation = "fadeSlide 0.4s ease";
}