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

  // postBooks(studentToSend);
}

//function that will request students + append to table
function getStudents() {

}