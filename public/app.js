"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Invoice_1 = require("./classes/Invoice");
const invOne = new Invoice_1.Invoice("mario", "website work", 250);
const invTwo = new Invoice_1.Invoice("luigi", "landscaping work", 300);
let invoices = [];
invoices.push(invOne);
invoices.push(invTwo);
invoices.forEach((invoice) => console.log(invoice.format()));
const form = document.querySelector('.new-item-form');
//console.log(form.children);
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(type.value, tofrom.value, details.value, amount.valueAsNumber);
});
