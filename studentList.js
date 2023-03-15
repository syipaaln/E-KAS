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

const studentListApplication = {
    student: {
        index: -1,
        name: null,
    },
    studentList: [],
    inputStudent: function (form) {
        this.student.index = form.index.value;
        this.student.name = form.name.value;

        if(!this.student.name) {
            alert('Nama tidak boleh kosong!');
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

        form.index.value = this.student.index;
        form.name.value = this.student.name;
    },
    showStudentList: function () {
        this.studentList = databaseStudentList.get();
        const componentStudentList = document.getElementById('student-list');
        componentStudentList.innerHTML = '';
        if (this.studentList === null) {
            this.studentList = [];
        } else {
            this.studentList.forEach((student) => {
                componentStudentList.innerHTML += `
                <tr>
                    <th>1</th>
                    <td>${student.name}</td>
                </tr>`
            });
        }
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

studentListApplication.showStudentList();
