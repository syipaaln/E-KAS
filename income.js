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

const incomeTableApplication = {
    income: {
        index: -1,
        name: null,
        date: null,
        pay: null
    },
    incomeTable: [],
    inputIncome: function (form) {
        this.income.index = form.index.value;
        this.income.name = form.name.value;
        this.income.date = form.date.value;
        this.income.pay = form.pay.value;

        if(!this.income.name) {
            alert('Nama tidak boleh kosong!');
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

        this.total();
        databaseIncomeTable.save(this.incomeTable);
        this.resetFormIncome(form);
    },
    resetFormIncome: function (form) {
        this.income.index = -1;
        this.income.name = null;
        this.income.date = null;
        this.income.pay = null;

        form.index.value = this.income.index;
        form.name.value = this.income.name;
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
                    <td>${income.date}</td>
                    <td>${income.pay}</td>
                </tr>`
            });
        }

        this.total();
    },
    total: function () {
        var table = document.getElementById("tableIncome"), sumHsl = 0;
		for(var t = 1; t < table.rows.length; t++)
		{
			sumHsl = sumHsl + parseInt(table.rows[t].cells[3].innerHTML);
		}
		document.getElementById("totalIncome").innerHTML = "Total = "+ sumHsl;
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

incomeTableApplication.showIncomeTable();