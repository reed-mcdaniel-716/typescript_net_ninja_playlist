import { HasFormatter } from '../interfaces/HasFormatter'
// classes
export class Invoice implements HasFormatter{
  // readonly client: string;
  // private details:string;
  // public amount: number;

  constructor(readonly client: string, private details: string, public amount:number){
    this.client = client;
    this.details = details;
    this.amount=amount;
  }

  format(){
    return `${this.client} owes £${this.amount} for ${this.details}`
  }
}
