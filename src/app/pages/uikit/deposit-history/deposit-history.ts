import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Deposit } from '@/pages/service/deposit';

type DepositStatus = 'Completed' | 'Pending' | 'Failed';

@Component({
  selector: 'app-deposit-history',
  imports: [CommonModule,DialogModule],
  templateUrl: './deposit-history.html',
  styleUrl: './deposit-history.scss'
})
export class DepositHistory {

  depositHistory: any[] = [];
  selectedDeposit: any = {};
  showCurrentDeposit = false;
  userEmail:string="";

  constructor(private depositService:Deposit){

  }

  ngOnInit(){
    this.getUserDepositList();
  }
  fetchUserUserData() {
    const localData = localStorage.getItem('user');
    const userData = JSON.parse(localData || '{}');
    const user = userData?.data?.user || null;
    const userBalance = user?.balance || 0;
    this.userEmail = user?.email || '';
    return userBalance;
  }

  getUserDepositList(){
    this.fetchUserUserData();
    this.depositService.getDepositHistory(this.userEmail).subscribe((res) => {
      this.depositHistory = res.data;
    });
  }

  openDialog(deposit: any): void {
    this.selectedDeposit = deposit;
    this.showCurrentDeposit = true;
  }

  closeDepositDialog(): void {
    this.showCurrentDeposit = false;
    this.selectedDeposit = null;
  }

  getStatusClass(status: DepositStatus): string {
    if (status === 'Completed') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300';
    if (status === 'Pending') return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300';
    return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300';
  }
}
