function addIncome(form) {
    console.log(form);
    incomeTableApplication.inputIncome(form);
    incomeTableApplication.showIncomeTable();
}

const incomeTableApplication = {
    income: {
        name: null,
        date: null,
        pay: null
    },
    incomeTable: [],
    inputIncome: function (form) {
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

        this.resetFormIncome(form);
    },
    resetFormIncome: function (form) {
        this.income.name = null;
        this.income.date = null;
        this.income.pay = null;

        form.name.value = this.income.name;
        form.date.value = this.income.date;
        form.pay.value = this.income.pay;
    },
    showIncomeTable: function () {
        const componentIncomeTable = document.getElementById('income-table');
        componentIncomeTable.innerHTML = '';
        this.incomeTable.forEach((income) => {
            componentIncomeTable.innerHTML += `
            <th>1</th>
            <th>${income.name}</th>
            <th>${income.date}</th>
            <th>${income.pay}</th>`
        });
    }
}

incomeTableApplication.showIncomeTable();