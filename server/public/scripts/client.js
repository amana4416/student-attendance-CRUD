$(document).ready(onReady);

function onReady() {
  console.log("hi. let's make a CRUD app.");
  getStudents()
  $('.submitButton').on('click', addStudent);
}


//function to take input values and put them in an object
function addStudent() {
  console.log('adding a student');
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
              <button class="deleteButton">Delete</button>
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
              <button class="deleteButton">Delete</button>
            </td>
          </tr>
          `)
          }
      else {
        $('#tableBody').append(`
          <tr class="attendanceNotTaken">
            <td>${student.name}</td>
            <td>
              <button class="presentButton">Present</button>
              <button class="absentButton">Absent</button>
            </td>
            <td>
              <button class="deleteButton">Delete</button>
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