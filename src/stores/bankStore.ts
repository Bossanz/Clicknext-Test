import { defineStore } from 'pinia'

interface Transaction {
  id: number;
  datetime: string;
  amount: number;
  status: 'ฝาก' | 'ถอน';
  email: string;
}

export const useBankStore = defineStore('bank', {
  state: () => ({
    balance: 1000,
    transactions: [] as Transaction[]
  }),
  
  
  persist: true,

  actions: {
    addTransaction(type: 'ฝาก' | 'ถอน', amount: number, email: string) {
      
      if (amount <= 0 || amount > 100000) return;

      this.transactions.unshift({
        id: Date.now(),
        datetime: new Date().toLocaleString('th-TH'),
        amount,
        status: type,
        email
      });
      this.calculateBalance();
    },

    calculateBalance() {
      const initial = 1000000;
      this.balance = this.transactions.reduce((acc, item) => {
        return item.status === 'ฝาก' ? acc + item.amount : acc - item.amount;
      }, initial);
    },

    deleteTransaction(id: number) {
      this.transactions = this.transactions.filter(t => t.id !== id);
      this.calculateBalance(); 
    },

    editTransaction(id: number, newAmount: number) {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      // เช็คเงื่อนไข 0 - 100,000 ตามโจทย์
      if (newAmount > 0 && newAmount <= 100000) {
        this.transactions[index]!.amount = newAmount;
        this.calculateBalance();
      }
    }
  }

  }
})