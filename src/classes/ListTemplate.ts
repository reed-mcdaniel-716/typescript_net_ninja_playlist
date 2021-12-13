/*
  1. register list container (ul) in the constructor
  2. create a render method to render a new 'li' element to the container
    -- accepts arguments: invoive or payment, a heading, a position
    -- create the html template (li, h4, p)
    -- add the 'li; templet to the start/end of the list
*/
import { HasFormatter } from '../interfaces/HasFormatter.js'

export class ListTemplate {
  constructor(private container: HTMLUListElement){
    // because container is set as a private arg, no need to set it here
  }

  render(item: HasFormatter, heading: string, pos: 'start' | 'end'){

    const li = document.createElement('li');
    const h4 = document.createElement('h4');

    h4.innerText = heading;
    li.append(h4);

    const p = document.createElement('p');
    p.innerText = item.format();
    li.append(p);

    if(pos === 'start'){
      this.container.prepend(li);
    } else {
      this.container.append(li);
    }
  }

}