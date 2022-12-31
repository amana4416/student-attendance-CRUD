$(document).ready(onReady);

function onReady() {
  console.log("hi. let's make a CRUD app.");
  getStudents()
  $('.submitButton').on('click', addStudent);
  $('#tableBody').on('click', '.deleteButton', deleteStudent)
  $('#tableBody').on('click', '.presentButton', presentStudent)
  $('#tableBody').on('click', '.absentButton', absentStudent)
  $('.newDayButton').on('click', newDay)
}


//function to take input values and put them in an object
function addStudent() {
  console.log('adding a student to the class');
  let newName = $('input').val();

  let studentToSend = {
    name: newName,
  };

  postStudent(studentToSend);
}

//function that will request students + append to table
function getStudents() {
  console.log('in GET /students');
  $('#tableBody').empty();
  $.ajax ({
    method: 'GET',
    url: `/students`
  }).then ((res) => {
    for (let student of res) {
      if (student.attendance === 'Present') {
        $('#tableBody').append(`
          <tr class="studentPresent">
            <td>${student.name}</td>
            <td>${student.attendance}</td>
            <td>
              <button data-id="${student.id}" type="button" class="btn btn-danger deleteButton">Delete</button>
            </td>
          </tr>
        `)
        }
      else if (student.attendance === 'Absent') {
        $('#tableBody').append(`
          <tr class="studentAbsent">
            <td>${student.name}</td>
            <td>${student.attendance}</td>
            <td>
              <button data-id="${student.id}" type="button" class="btn btn-danger deleteButton">Delete</button>
            </td>
          </tr>
          `)
          }
      else {
        $('#tableBody').append(`
          <tr class="attendanceNotTaken">
            <td>${student.name}</td>
            <td>
              <button data-id="${student.id}" type="button" class="btn btn-success presentButton">Present</button>
              <button data-id="${student.id}" type="button" class="btn btn-success absentButton">Absent</button>
            </td>
            <td>
              <button data-id="${student.id}" type="button" class="btn btn-danger deleteButton">Delete</button>
            </td>
        </tr>
        `)
        }
      }
    }).catch((err) => {
      console.log('something broke in GET /books', err);
    })
}

//function to add students to dom and database
function postStudent(newStudent) {
  console.log('in POST /students', newStudent);
  $.ajax({
    method: 'POST',
    url: `/students`, 
    data: newStudent
  }).then ((res) => {
    console.log(res);
    getStudents();
    $('input').val('');
  }).catch((err) => {
    console.log('something broke in POST /students', err);
  })
}

//function to delete students from the dom and database
function deleteStudent() {
  console.log('deleting a student');
  let idToDelete = $(this).data().id;
  swal("Are you sure you want to remove this student from the class?", {
    title: "Remove Student",
    icon: "warning",
    dangerMode: true,
    buttons: true,
  }).then((response) => {
    if (response === true){
        $.ajax ({
        method: 'DELETE',
        url: `/students/${idToDelete}`
        }).then ((res) => {
        getStudents();
        }).catch((err) => {
        console.log('error in DELETE /students/:id', err);
        })
    } 
  })
}


//function to mark students as present - this will update dom and database
function presentStudent() {
  console.log('student is present');
  let idToUpdate = $(this).data().id;
  console.log(idToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/students/${idToUpdate}`,
    data: {
      attendance: 'Present',
    },
  }).then((res) => {
      getStudents();
    }).catch((err) => {
      console.log("Error in PUT /student/:id PRESENT", err);
    });
}

//function to mark students as absent - this will update dom and database
function absentStudent() {
  console.log('student is absent');
  let idToUpdate = $(this).data().id;
  console.log(idToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/students/${idToUpdate}`,
    data: {
      attendance: 'Absent',
    },
  }).then((res) => {
      getStudents();
    }).catch((err) => {
      console.log("Error in PUT /student/:id ABSENT", err);
    });
}

//function so teachers can click button each morning to take attendance again
//this will make it so the present and absent buttons appear again
function newDay () {
  console.log('its a new day!');
  swal("Are you sure you want to restart attendance?", {
    title: "New Day - Restart Attendance",
    icon: "warning",
    dangerMode: true,
    buttons: true,
  }).then((response) => {
    if (response === true){
      $.ajax({
        method: 'PUT',
        url: `/students`,
        data: {
          attendance: null,
        },
      }).then((res) => {
          getStudents();
        }).catch((err) => {
          console.log("Error in PUT /studenst NEW DAY", err);
        });
    } 
  })   
}