function addStudent(form) {
    console.log(form);
    studentListApplication.inputStudent(form);
    studentListApplication.showStudentList();
}

const databaseStudentList = {
    save(studentList) {
        localStorage.setItem('studentList', JSON.stringify(studentList));
    },

    get() {
        return JSON.parse(localStorage.getItem('studentList'));
    }
}

function logout () {
    studentListApplication.logout();
}

const studentListApplication = {
    student: {
        index: -1,
        name: null,
        class: null,
    },
    studentList: [],
    inputStudent: function (form) {
        this.student.index = form.index.value;
        this.student.name = form.name.value;
        this.student.class = form.class.value

        if(!this.student.name) {
            alert('Nama tidak boleh kosong!');
            return false
        }
        if (!this.student.class) {
            alert('Kelas tidak boleh kosong!');
            return false 
        }
        if(this.student.index == -1) {
            this.studentList = this.studentList || [];
            this.studentList.push(copy(this.student));
        } else {
            this.studentList[this.student.index] = copy(this.student)
        }

        databaseStudentList.save(this.studentList)
        this.resetFormStudent(form);
    },
    resetFormStudent: function (form) {
        this.student.index = -1;
        this.student.name = null;
        this.student.class = null;

        form.index.value = this.student.index;
        form.name.value = this.student.name;
        form.class.value = this.student.class;

        document.getElementById('btn-save-student').innerHTML = 'Simpan';
    },
    showStudentList: function () {
        this.studentList = databaseStudentList.get();
        const componentStudentList = document.getElementById('student-list');
        componentStudentList.innerHTML = '';
        if (this.studentList === null) {
            this.studentList = [];
        } else {
            this.studentList.forEach((student, index) => {
                componentStudentList.innerHTML += `
                <tr>
                    <td></td>
                    <td>${student.name}</td>
                    <td>${student.class}</td>
                    <td><button onclick="studentListApplication.editStudent(${index})" class="btn btn-primary btn-xs">Edit</button></td>
                    <td><button onclick="studentListApplication.deleteStudent(${index})" class="btn btn-error btn-xs">Hapus</button></td>
                </tr>`
            });
        }
    },
    deleteStudent: function (index) {
        if(confirm('Apakah anda yakin ingin menghapus ini?')) {
            this.studentList.splice(index, 1);
            databaseStudentList.save(this.studentList);
            this.showStudentList();
        }
    },
    editStudent: function(index) {
        const student= this.studentList[index];
        const form = document.getElementById('form-student');
        form.index.value = index;
        form.name.value = student.name;
        form.class.value = student.class;

        document.getElementById('btn-save-student').innerHTML = 'Edit';
    },
    logout: function () {
        localStorage.removeItem('databaseLogin');
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

studentListApplication.showStudentList();
