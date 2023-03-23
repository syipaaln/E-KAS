function addIncome(form) {
    console.log(form);
    incomeTableApplication.inputIncome(form);
    incomeTableApplication.showIncomeTable();
}

const databaseIncomeTable = {
    save(incomeTable) {
        localStorage.setItem('incomeTable', JSON.stringify(incomeTable));
    },

    get() {
        return JSON.parse(localStorage.getItem('incomeTable'));
    }
}

const databaseStudentList = {
    save(studentList) {
        localStorage.setItem('studentList', JSON.stringify(studentList));
    },

    get() {
        return JSON.parse(localStorage.getItem('studentList'));
    }
}

$('#name').on('change', function(){
    const grade = $('#name option:selected').data('grade');

    $('[name=class]').val(grade);
  });

const studentListApplication = {
    showStudentList: function () {
        this.studentList = databaseStudentList.get();
        const listOption = document.getElementById('name');
        this.studentList.forEach((item) => {
            listOption.innerHTML += `<option data-grade="${item.class}">${item.name}</option>`
        })
    }
}

const incomeTableApplication = {
    income: {
        index: -1,
        name: null,
        class: null,
        date: null,
        pay: null,
    },
    incomeTable: [],
    inputIncome: function (form) {
        this.income.index = form.index.value;
        this.income.name = form.name.value;
        this.income.class = form.class.value;
        this.income.date = form.date.value;
        this.income.pay = form.pay.value;

        if(!this.income.name) {
            alert('Nama tidak boleh kosong!');
            return false
        }
        if(!this.income.class) {
            alert('Kelas tidak boleh kosong!');
            return false
        }
        if(!this.income.date) {
            alert('Tanggal tidak boleh kosong!');
            return false
        }
        if(!this.income.pay) {
            alert('Jumlah Bayar tidak boleh kosong!');
            return false
        }

        if(this.income.index == -1) {
            this.incomeTable = this.incomeTable || [];
            this.incomeTable.push(copy(this.income));
        } else {
            this.incomeTable[this.income.index] = copy(this.income)
        }

        databaseIncomeTable.save(this.incomeTable);
        this.resetFormIncome(form);
    },
    resetFormIncome: function (form) {
        this.income.index = -1;
        this.income.name = null;
        this.income.class = null;
        this.income.date = null;
        this.income.pay = null;

        form.index.value = this.income.index;
        form.name.value = this.income.name;
        form.class.value = this.income.class;
        form.date.value = this.income.date;
        form.pay.value = this.income.pay;
    },
    showIncomeTable: function () {
        this.incomeTable = databaseIncomeTable.get();
        const componentIncomeTable = document.getElementById('income-table');
        componentIncomeTable.innerHTML = '';
        if (this.incomeTable === null) {
            this.incomeTable = [];
        } else {
            this.incomeTable.forEach((income) => {
                componentIncomeTable.innerHTML += `
                <tr>
                    <th>1</th>
                    <td>${income.name}</td>
                    <td>${income.class}</td>
                    <td>${income.date}</td>
                    <td>${income.pay}</td>
                </tr>`
            });
        }

        this.totalIncome();
    },
    totalIncome: function () {
        this.incomeTable = databaseIncomeTable.get()
        console.log(this.incomeTable);

        let totalIncom = 0
        if (this.incomeTable == null) {
            this.incomeTable = [];
        } else {
            this.incomeTable.forEach(item => {
                totalIncom = totalIncom + JSON.parse(item.pay)
            }) 
        }
        
        document.getElementById("totalIncome").innerHTML = "Total = "+ totalIncom;
        return totalIncom
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

incomeTableApplication.showIncomeTable();
studentListApplication.showStudentList();
