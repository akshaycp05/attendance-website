// Load students from localStorage or start empty
let students = JSON.parse(localStorage.getItem('students')) || [];

// Populate table with students
function renderStudents() {
  const tbody = document.querySelector('#students-table tbody');
  tbody.innerHTML = ''; // clear table

  students.forEach((student, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>
        <select onchange="markAttendance(${index}, this.value)">
          <option value="">Select</option>
          <option value="Present" ${student.attendance === 'Present' ? 'selected' : ''}>Present</option>
          <option value="Absent" ${student.attendance === 'Absent' ? 'selected' : ''}>Absent</option>
        </select>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Add new student
function addStudent() {
  const nameInput = document.getElementById('student-name');
  const rollInput = document.getElementById('student-roll');

  const name = nameInput.value.trim();
  const roll = rollInput.value.trim();

  if (!name || !roll) {
    alert('Please enter both name and roll number.');
    return;
  }

  // Check if roll number already exists
  if (students.some(s => s.roll === roll)) {
    alert('Roll number already exists!');
    return;
  }

  students.push({ name, roll, attendance: '' });
  localStorage.setItem('students', JSON.stringify(students));

  nameInput.value = '';
  rollInput.value = '';

  renderStudents();
}

// Mark attendance for a student
function markAttendance(index, status) {
  students[index].attendance = status;
  localStorage.setItem('students', JSON.stringify(students));
}

// Initial render
renderStudents();
