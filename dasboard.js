const databaseStudentList = {
    save(studentList) {
        localStorage.setItem('studentList', JSON.stringify(studentList));
    },

    get() {
        return JSON.parse(localStorage.getItem('studentList'));
    }
}
const studentListApplication = {
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
const databaseIncomeTable = {
    save(incomeTable) {
        localStorage.setItem('incomeTable', JSON.stringify(incomeTable));
    },

    get() {
        return JSON.parse(localStorage.getItem('incomeTable'));
    }
}
const incomeTableApplication = {
    showIncomeTable: function () {
        this.incomeTable = databaseIncomeTable.get();
        // const componentIncomeTable = document.getElementById('income');
        // componentIncomeTable = 0;
        // if (this.incomeTable === null) {
        //     this.incomeTable = [];
        // } else {
        //     this.incomeTable.forEach((item) => {
        //         componentIncomeTable = `
        //         <tr>
        //             <td>${componentIncomeTable + JSON.parse(item.pay)}</td>
        //         </tr>`
        //         // totalIncom = totalIncom + JSON.parse(item.pay)
        //     });
        // }
        let totalIncom = 0
        if (this.incomeTable == null) {
            this.incomeTable = [];
        } else {
            this.incomeTable.forEach(item => {
                totalIncom = totalIncom + JSON.parse(item.pay)
            }) 
        }
        
        document.getElementById("income").innerHTML = "Rp. "+ totalIncom;
        return totalIncom
    }
}
const databaseExpenditureTable = {
    save(expenditureTable) {
        localStorage.setItem('expenditureTable', JSON.stringify(expenditureTable));
    },

    get() {
        return JSON.parse(localStorage.getItem('expenditureTable'));
    }
}
const expenditureTableApplication = {
    showExpenditureTable: function () {
        this.expenditureTable = databaseExpenditureTable.get();
        // const componentExpenditureTable = document.getElementById('expenditure-table');
        // componentExpenditureTable.innerHTML = '';
        // if (this.expenditureTable === null) {
        //     this.expenditureTable = [];
        // } else {
        //     this.expenditureTable.forEach((expenditure) => {
        //         componentExpenditureTable.innerHTML += `
        //         <tr>
        //             <th>1</th>
        //             <td>${expenditure.date}</td>
        //             <td>${expenditure.explanation}</td>
        //             <td>${expenditure.take}</td>
        //         </tr>`
        //     });
        // }
        let totalExpend = 0
        if (this.expenditureTable == null) {
            this.expenditureTable = [];
        } else {
            this.expenditureTable.forEach(item => {
                totalExpend = totalExpend + JSON.parse(item.take)
            }) 
        }
        
        document.getElementById("expend").innerHTML = "Rp. "+ totalExpend;
        return totalExpend
    }
}
const balance = {
balance: function () {
        this.expenditureTable = databaseExpenditureTable.get()
        this.incomeTable = databaseIncomeTable.get()
        console.log(this.incomeTable);

        let balance = 0
        this.incomeTable.forEach(item => {
            balance = balance + JSON.parse(item.pay)
        })
        this.expenditureTable.forEach(item => {
            balance = balance - JSON.parse(item.take)
        })
        
        document.getElementById("balance").innerHTML = "Rp. "+ balance;
        return balance
    }
}


incomeTableApplication.showIncomeTable();
expenditureTableApplication.showExpenditureTable();
balance.balance();
