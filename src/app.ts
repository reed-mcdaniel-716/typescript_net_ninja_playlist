import { Invoice } from './classes/Invoice.js';
import { Payment } from './classes/Payment.js';
import { ListTemplate } from './classes/ListTemplate.js';
import { HasFormatter } from './interfaces/HasFormatter.js';

/*let docOne: HasFormatter;
let docTwo: HasFormatter;

docOne = new Invoice('yoshi', 'web work', 250);
docTwo = new Payment('mario', 'plumbing work', 200);

let docs: HasFormatter[] = [];
docs.push(docOne);
docs.push(docTwo);

console.log(docs);

const invOne = new Invoice("mario", "website work", 250);
const invTwo = new Invoice("luigi", "landscaping work", 300);

let invoices: Invoice[] = [];
invoices.push(invOne)
invoices.push(invTwo)

invoices.forEach((invoice) => console.log(invoice.format()));*/

const form = document.querySelector('.new-item-form') as HTMLFormElement;

const type = document.querySelector('#type') as HTMLSelectElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

// list template instance
// ul already in main html
const ul = document.getElementsByClassName('item-list')[0]! as HTMLUListElement; // exclaimation point means we guarantee this is not null
const list = new ListTemplate(ul);

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  let values: [string, string, number];
  values = [tofrom.value, details.value, amount.valueAsNumber];
  let doc : HasFormatter;

  if (type.value === 'invoice'){
    // works because we've enforced the types of each position in the tuple s.t. it matches the expected arg types
    doc = new Invoice(...values)
  } else {
    doc = new Payment(...values)
  }

  list.render(doc, type.value, 'end');
});

// Generics
const addUID = <T>(obj: T) =>
{
  let uid = Math.floor(Math.random() * 100);
  return {...obj, uid};
}

let docOne = addUID({name: 'yoshi', age: 40});
console.log(docOne);
console.log(docOne.name);

// but can't access any properties of the object because the function doesn't know what kind of object this is
// and therefore, we can't know the properties of the returned object
// must use generics

