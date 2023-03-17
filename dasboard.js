const databaseStudentList = {
    save(studentList) {
        localStorage.setItem('studentList', JSON.stringify(studentList));
    },

    get() {
        return JSON.parse(localStorage.getItem('studentList'));
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

const databaseExpenditureTable = {
    save(expenditureTable) {
        localStorage.setItem('expenditureTable', JSON.stringify(expenditureTable));
    },

    get() {
        return JSON.parse(localStorage.getItem('expenditureTable'));
    }
}

const dashboard = {
    showStudentList: function () {
        this.studentList = databaseStudentList.get();
        let totalStudent = null
        if (this.studentList == null) {
            this.studentList = [];
        } else {
            for(totalStudent = 1; totalStudent <= this.studentList.length; totalStudent++) {
                console.log(totalStudent);
            }
        }
        
        document.getElementById("student").innerHTML = totalStudent + " Orang";
        return totalStudent;
    },
    showIncomeTable: function () {
        this.incomeTable = databaseIncomeTable.get();

        let totalIncom = 0
        if (this.incomeTable == null) {
            this.incomeTable = [];
        } else {
            this.incomeTable.forEach(item => {
                totalIncom = totalIncom + JSON.parse(item.pay)
            }) 
        }
        
        document.getElementById("income").innerHTML = "Rp. "+ totalIncom;
        return totalIncom;
    },
    showExpenditureTable: function () {
        this.expenditureTable = databaseExpenditureTable.get();

        let totalExpend = 0
        if (this.expenditureTable == null) {
            this.expenditureTable = [];
        } else {
            this.expenditureTable.forEach(item => {
                totalExpend = totalExpend + JSON.parse(item.take)
            }) 
        }
        
        document.getElementById("expend").innerHTML = "Rp. "+ totalExpend;
        return totalExpend;
    },
    showBalance: function () {
        this.expenditureTable = databaseExpenditureTable.get();
        this.incomeTable = databaseIncomeTable.get();

        let balance = 0
        this.incomeTable.forEach(item => {
            balance = balance + JSON.parse(item.pay)
        })
        this.expenditureTable.forEach(item => {
            balance = balance - JSON.parse(item.take)
        })
        
        document.getElementById("balance").innerHTML = "Rp. "+ balance;
        return balance;
    }
}

dashboard.showStudentList();
dashboard.showIncomeTable();
dashboard.showExpenditureTable();
dashboard.showBalance();
