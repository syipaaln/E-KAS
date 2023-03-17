function addExpenditure(form) {
    console.log(form);
    expenditureTableApplication.inputExpenditure(form);
    expenditureTableApplication.showExpenditureTable();
}

const databaseExpenditureTable = {
    save(expenditureTable) {
        localStorage.setItem('expenditureTable', JSON.stringify(expenditureTable));
    },

    get() {
        return JSON.parse(localStorage.getItem('expenditureTable'));
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

const expenditureTableApplication = {
    expenditure: {
        index: -1,
        date: null,
        explanation: null,
        take: null
    },
    expenditureTable: [],
    inputExpenditure: function (form) {
        this.expenditure.index = form.index.value;
        this.expenditure.date = form.date.value;
        this.expenditure.explanation = form.explanation.value;
        this.expenditure.take = form.take.value;

        if(!this.expenditure.date) {
            alert('Tanggal tidak boleh kosong!');
            return false
        }
        if(!this.expenditure.explanation) {
            alert('Keterangan tidak boleh kosong!');
            return false
        }
        if(!this.expenditure.take) {
            alert('Jumlah Ambil tidak boleh kosong!');
            return false
        }

        if(this.expenditure.index == -1) {
            this.expenditureTable = this.expenditureTable || [];
            this.expenditureTable.push(copy(this.expenditure));
        } else {
            this.expenditureTable[this.expenditure.index] = copy(this.expenditure)
        }

        databaseExpenditureTable.save(this.expenditureTable)
        this.resetFormExpenditure(form);
    },
    resetFormExpenditure: function (form) {
        this.expenditure.index = -1;
        this.expenditure.date = null;
        this.expenditure.explanation = null;
        this.expenditure.take = null;

        form.index.value = this.expenditure.index;
        form.date.value = this.expenditure.date;
        form.explanation.value = this.expenditure.explanation;
        form.take.value = this.expenditure.take;
    },
    showExpenditureTable: function () {
        this.expenditureTable = databaseExpenditureTable.get();
        const componentExpenditureTable = document.getElementById('expenditure-table');
        componentExpenditureTable.innerHTML = '';
        if (this.expenditureTable === null) {
            this.expenditureTable = [];
        } else {
            this.expenditureTable.forEach((expenditure) => {
                componentExpenditureTable.innerHTML += `
                <tr>
                    <th>1</th>
                    <td>${expenditure.date}</td>
                    <td>${expenditure.explanation}</td>
                    <td>${expenditure.take}</td>
                </tr>`
            });
        }
        this.totalExpenditure();
        // this.balance();
    },
    totalExpenditure: function () {
        this.expenditureTable = databaseExpenditureTable.get()
        console.log(this.expenditureTable);

        let totalExpend = 0
        if (this.expenditureTable == null) {
            this.expenditureTable = [];
        } else {
            this.expenditureTable.forEach(item => {
                totalExpend = totalExpend + JSON.parse(item.take)
            }) 
        }

        document.getElementById("totalExpenditure").innerHTML = "Total = "+ totalExpend;
        return totalExpend
    },
    
    // balance: function () {
    //     this.expenditureTable = databaseExpenditureTable.get()
    //     this.incomeTable = databaseIncomeTable.get()
    //     console.log(this.incomeTable);

    //     let balance = 0
    //     this.incomeTable.forEach(item => {
    //         balance = balance + JSON.parse(item.pay)
    //     })
    //     this.expenditureTable.forEach(item => {
    //         balance = balance - JSON.parse(item.take)
    //     })
        
    //     document.getElementById("balance").innerHTML = "Sisa Saldo = "+ balance;
    //     return balance
    // },
    // balance: function () {
    //     let balance = totalExpend;

    //     document.getElementById("balance").innerHTML = "Total = "+ balance;
    //     return balance;
    // }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

expenditureTableApplication.showExpenditureTable();