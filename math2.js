let parent = document.querySelector(".parent")
let input = document.getElementsByTagName('input')
let inp_parent = document.querySelector(".input")
let equal = document.getElementById("equal")
let currentInputclass = '' ; let currentInput = ''
let elements = ['inp_1'] ; const Number_Values = '+-0123456789/*';const Connect_Signs = '+-x/'
let children_class = [{depth: 1, class: 'inp_1', looping: 1}] ; let sqr_len = 0 ; let pow_len = 0 ; let bra_len = 0;
function divide(up,down) {
    console.log('div',up , down);
    if (up[0] == '+') {up =up.slice(1,up.length)};if (down[0] == '+') {down =down.slice(1,down.length)};
    if(down == 0){console.log("Error: you can't divide on 0");return '!'};if(up == 0){return '0'}
    if ((up / down) % 1 == 0) {console.log(1);return `${up / down}`}
    if(!up.includes('/*') && !down.includes('/*')){let min = Math.min(up , down)
        for (let num = 2; num <= Math.abs(min); num++) {
            if (up < 0 && down < 0) {up*= -1 ; down*= -1}
            if ((Math.min(up,down)/num) % 1 == 0 && (Math.max(up,down)/num) % 1 == 0) {up=String(up/num);down=String(down/num);num--;}
            if(num == Math.abs(min) || Math.abs(Math.min(up,down)) == 1){return `${up}/*${down}`}
    }if(Math.abs(Math.min(up,down)) == 1){ return `${up}/*${down}`}}
    if (!up.includes('/*') && down.includes('/*')) {return String(divide(multiply(up,down.slice(down.indexOf('/')+2,down.length)) , down.slice(0,down.indexOf('/'))))}
    else if (up.includes('/*') && !down.includes('/*')) {return String(divide(up.slice(0,up.indexOf('/')) , multiply(up.slice(up.indexOf('/')+2,up.length) , down)))}
    else if (up.includes('/*') && down.includes('/*')) {return String(divide(multiply(up.slice(0,up.indexOf('/')),down.slice(down.indexOf('/')+2,down.length)) , multiply(up.slice(up.indexOf('/')+2,up.length) , down.slice(0,down.indexOf('/')))))}
}//لو الكسر فيه جذر اختصر الكسر ولو منفعش رجع جذر علي جذر
function multiply(num1 , num2) {
    console.log('mult' , num1 , num2);
    if (num1[0] == '+') {num1 =num1.slice(1,num1.length)};if (num2[0] == '+') {num2 =num2.slice(1,num2.length)};
  //كسر في كسر و عدد في جذر و جذر في جذر
    if (num1.includes('/*') && num2.includes('/*')) {//كسر في كسر
        return String(divide(String(multiply(num1.slice(0,num1.indexOf('/')),num2.slice(0,num2.indexOf('/')))) , String(multiply(num1.slice(num1.indexOf('/')+2,num1.length) , num2.slice(num2.indexOf('/')+2,num2.length)))))
    }
    else if (num1.includes('/*') && Number(num2) % 1 == 0) {
        return String(divide(String(multiply(num1.slice(0,num1.indexOf('/')), num2 )) , num1.slice(num1.indexOf('/')+2,num1.length)))
    }
    else if (num2.includes('/*') && Number(num1) % 1 == 0) {
        console.log(num2.slice(num2.indexOf('/')+2,num2.length));
        return String(divide(String(multiply(num2.slice(0,num2.indexOf('/')), num1 )) , num2.slice(num2.indexOf('/')+2,num2.length)))
    }
    else if(!num1.includes('/*') && !num2.includes('/*')) return `${num1 * num2}`
}
function getVariable(num) {
    for (let i = 0; i < num.length; i++) {
        if (!Number_Values.includes(num[i]) && i==0) return [num,'1']
        if (!Number_Values.includes(num[i])) return [num.slice(i,num.length),num.slice(0,i)]
    }return ['' , num]}//if list[1] equal - do -1 and + do 1
function sum(num1 , num2) {
    if (getVariable(num1)[0] == getVariable(num2)[0]) {
        if (!num1.includes('/*') && !num2.includes('/*')) {
            return String(Number(getVariable(num1)[1])+Number(getVariable(num2)[1]))+getVariable(num1)[0]
        }
        else if (!num1.includes('/*') && num2.includes('/*')) {
            return divide(sum(multiply(num1,num2.slice(num2.indexOf('*')+1,num2.length)),num2.slice(0,num2.indexOf('/'))),num2.slice(num2.indexOf('*')+1,num2.length))
        }
        else if (num1.includes('/*') && !num2.includes('/*')) {
            return divide(sum(multiply(num2,num1.slice(num1.indexOf('*')+1,num1.length)),num1.slice(0,num1.indexOf('/'))),num1.slice(num1.indexOf('*')+1,num1.length))
        }
        else if (num1.includes('/*') && num2.includes('/*')) {
            return divide(sum(multiply(num1.slice(0,num1.indexOf('/')),num2.slice(num2.indexOf('*')+1,num2.length)),multiply(num2.slice(0,num2.indexOf('/')),num1.slice(num1.indexOf('*')+1,num1.length))),multiply(num1.slice(num1.indexOf('*')+1,num1.length),num2.slice(num2.indexOf('*')+1,num2.length)))
        }
    }return num1+'+'+num2}console.log(sum('♦2l' , '-♦2l'));
function getLooping(eleDepth,list) { let looping = 1; 
    for (let i = 0; i < list.length; i++) {
        if (list[i].depth == eleDepth) looping++
    }
    return looping
}
function calculations(list,i) {//اللستة اللي عليها الدور تتحل list
    console.log(list);
    let finalStr = ''
    let deleted1 = '';let deleted2 = ''
    if (list[i][0] == 'x' || list[i][0] == '/') {
        deleted1 = list[i][0];
        list[i] = list[i].slice(1 , list[i].length);}
    let listParts = [''];let partIndex = 0//--++----++---+-+---++-++++-+-- ()=ry5%&  5/3x3/5x2/4
    if (Connect_Signs.includes(list[i][list[i].length-1])) {
        deleted2 = list[i][list[i].length-1];
        list[i] = list[i].slice(0 , list[i].length-1)
    }
    for (let index = 0; index < list[i].length; index++) {//index => a char //تكوين الاجزاء
        if (list[i][index] == '+' && list[i][index+1] == '+') {list[i]= list[i].slice(0,index)+list[i].slice(index+2,list[i].length);index--;continue}
        if (list[i][index] == '+' && list[i][index+1] == '-') {list[i]= list[i].slice(0,index)+list[i].slice(index+1,list[i].length);index--;continue}
        if (list[i][index] == '-' && list[i][index+1] == '+') {list[i]= list[i].slice(0,index+1)+list[i].slice(index+2,list[i].length);index--;continue}
        if (list[i][index] == '-' && list[i][index+1] == '-') {list[i]= list[i].slice(0,index)+list[i].slice(index+2,list[i].length);index--;continue}
        if (list[i][index] == '+' || list[i][index] == '-'){if (index !== 0 && list[i][index-1] !== 'x' && list[i][index-1] !== '/'){listParts.push('');partIndex++;}} 
        if (list[i][index] == 'x' || (list[i][index] == '/' && list[i][index+1]!== '*')) {listParts.push(`${list[i][index]}`,''); partIndex+=2;console.log('t');}
        if ((list[i][index] !== '/' && list[i][index] !== 'x') || (list[i][index] == '/' && list[i][index+1] =='*')) {listParts[partIndex] = listParts[partIndex] + list[i][index]}
    }
    console.log(listParts);
    //if (i !== 1) list[i] = deleted + list[i]
    for (let p = 0; p < listParts.length; p++) {
        if (listParts[p] == '/' && listParts[p+1]!== '*') {listParts.splice(p-1,3,'+' + String(divide(listParts[p-1],listParts[p+1])));p-=1}
    }
    for (let p = 0; p < listParts.length; p++) {
        if (listParts[p] == 'x' && listParts[p-1].includes('/*') && listParts[p+1].includes('/*')) {listParts.splice(p-1,3,multiply(listParts[p-1] , listParts[p+1]));p-=1}
        else if (listParts[p] == 'x' && listParts[p-1].includes('/*') && !listParts[p+1].includes('/*') ) {listParts.splice(p-1,3,multiply(listParts[p-1] , listParts[p+1]));p-=1}
        else if (listParts[p] == 'x' && !listParts[p-1].includes('/*') && listParts[p+1].includes('/*') ) {listParts.splice(p-1,3,multiply(listParts[p-1] , listParts[p+1]));p-=1}
        else if (listParts[p] == 'x' && !listParts[p-1].includes('/*') && !listParts[p+1].includes('/*')) {listParts.splice(p-1,3,String(Number(listParts[p-1]) * Number(listParts[p+1])));p-=1}
    }
    for (let p = 0; p < listParts.length-1; p++) {listParts.splice(p,2, sum(listParts[p],listParts[p+1]));p-=1}
    finalStr+= deleted1;
    for (let p = 0; p < listParts.length; p++) {finalStr+= listParts[p];}
    finalStr+=deleted2;
    console.log(finalStr);return finalStr
}
function getClassParts(theClass) {
    let classParts = [''];let currentIndex = 0
    for (let i = 0; i < theClass.length; i++) {
        if (theClass[i] == '_') {
            currentIndex++
            classParts.splice(currentIndex , 0 , '')
        }
        classParts[currentIndex] += theClass[i]
    }
    return classParts
}
function add_link(list,index0) {
    let newList = [index0,'']
    for (let i = 1; i < list.length-1; i++) {
        if((list[i][list[i].length-1]=='x'||list[i][list[i].length-1]=='/') && (list[i+1][0]=='x'||list[i+1][0]=='/')){
            list[i+1] = list[i+1].slice(1,list[i+1].length)
        }
        if ((list[i][list[i].length-1]=='+'||list[i][list[i].length-1]=='-') && (list[i+1][0]=='x'||list[i+1][0]=='/')) {
            list[i]+='1'
        }
        newList[1]+=list[i]
    }return newList   
}//()=r5%&
console.log(add_link(['inp','1/','x4+','/2'],'inp'));
function calc(list , process) {//calcList , inp
    for (let i = 1; i < list.length; i++) {//1 2 3 4 5]
        if (i % 2 == 0 && list[i].length > 2) {calc(list[i],getClassParts(list[i][0])[getClassParts(list[i][0]).length-2]);}
        if (i % 2 == 1) {list[i] = calculations(list,i);console.log(list[i],i);}//look
        if (i % 2 == 0 && list[i].length == 2) {list[i] =calculations(list[i],1)}
        if (i == list.length-1) {list= calculations(add_link(list,list[0]),1)}//احذف اللست و حط الناتج
    }
    console.log(list);
}//['inp' ,'2/' ,['inp_bra1' ,'10/25x' ,['inp_bra1_bra2' ,'3/2+1'] ,'-1-2-' ,['inp_bra1_bra3' ,'3-2x6/4'] ,'/3'] ,'+5/6']
for (let i = 0; i < input.length; i++) {
    input[i].onfocus = function select(){
        currentInputclass = this.classList[0]
        console.log(currentInputclass);
    }
}

for (let i = 0; i < 14; i++) {
    parent.children[i].onclick = function add_num(){
        currentInput = document.getElementsByClassName(currentInputclass)
        let t = true
        if (this.innerHTML == 'x' || this.innerHTML == '/') {
            if(currentInput[0].value !== ''){
                if (currentInput[0].value[currentInput[0].value.length -1] == 'x' || currentInput[0].value[currentInput[0].value.length -1] == '/') {
                t = false;}
            }
        }
        if(t) {
            currentInput[0].value += this.innerHTML
            currentInput[0].style.width = String(currentInput[0].value.length * 12 + 15)+'px'    
        }
    }
}
let calcList = ''
equal.onclick = ()=> { calcList = getNestedLists(children_class, 1, [])
    calc(calcList,getClassParts(calcList[0])[getClassParts(calcList[0]).length-2])}
parent.children[18].onclick = ()=>{//       delete   last
    currentInput = document.getElementsByClassName(currentInputclass)
    if (currentInput[0].value !== '') {
        currentInput[0].value = currentInput[0].value.slice(0 , currentInput[0].value.length - 1)
        currentInput[0].style.width = String(currentInput[0].value.length * 12 + 15)+'px'
    }
}
parent.children[16].onclick = ()=>{//       brac     kets
    bra_len ++
    let bra_clmn = document.createElement('p');bra_clmn.innerText = '('
    bra_clmn.style.height = '40px';bra_clmn.style.textAlign = 'center';bra_clmn.style.position = 'relative';bra_clmn.style.bottom = '22px'
    bra_clmn.style.marginLeft = '3px' ; bra_clmn.style.fontSize = '30px'
    inp_parent.children[elements.indexOf(currentInputclass)].insertAdjacentElement('afterend' , bra_clmn) ; elements.splice(elements.indexOf(currentInputclass) + 1 , 0 , 'p')
    //  first   input
    let bra_inp = document.createElement('input');bra_inp.style.marginRight = '3px';
    let inp2 = document.createElement('input');
    for (let i = 0; i < children_class.length; i++) {
        if (children_class[i].class == currentInputclass) {
            let newCL = currentInputclass.slice(0, currentInputclass.length -2) + '_bra' + String(bra_len) + '_1'
            children_class.splice( i+1 , 0,{class: newCL, depth: getClassParts(newCL).length -1, looping: getLooping(getClassParts(newCL).length -1 , children_class)})
            bra_inp.classList.add(children_class[i + 1].class)
            elements.splice(elements.indexOf(currentInputclass) + 2 , 0, children_class[i + 1].class)
            inp_parent.children[elements.indexOf(currentInputclass) + 1].insertAdjacentElement('afterend' , bra_inp )
            // bra closing
            let bra_close = document.createElement('p');bra_close.innerText = ')'
            bra_close.style.height = '40px';bra_close.style.textAlign = 'center';bra_close.style.position = 'relative';bra_close.style.bottom = '22px'
            bra_close.style.marginRight = '3px';bra_close.style.fontSize = '30px'
            inp_parent.children[elements.indexOf(currentInputclass) +2].insertAdjacentElement('afterend' , bra_close) ; elements.splice(elements.indexOf(currentInputclass) + 3 , 0 , 'p')
            //inp2
            let newCL2 = currentInputclass.slice(0 , currentInputclass.length - 1 ) + (Number(currentInputclass[currentInputclass.length-1])+ 1)
            children_class.splice( i+2 , 0, {class: newCL2, depth: getClassParts(newCL2).length -1, looping: getLooping(getClassParts(newCL2).length -1 , children_class)})
            inp2.classList.add(children_class[i + 2].class)
            elements.splice(elements.indexOf(currentInputclass) + 4 , 0, children_class[i + 2].class)
        } 
    }
    inp_parent.children[elements.indexOf(currentInputclass) + 3].insertAdjacentElement('afterend' , inp2 )
    console.log(inp_parent.children , children_class);
    input = document.getElementsByTagName('input')
    for (let i = 0; i < input.length; i++) {
        input[i].onfocus = function select(){
            currentInputclass = this.classList[0]
            console.log(currentInputclass);
        }
    }
}
parent.children[15].onclick = ()=>{//       square   root
    sqr_len ++
    let sqr_clmn = document.createElement('p');sqr_clmn.innerText = '|'
    sqr_clmn.style.height = '40px'; sqr_clmn.style.width = '6px';sqr_clmn.style.textAlign = 'center';sqr_clmn.style.position = 'relative';sqr_clmn.style.bottom = '17px'
    sqr_clmn.style.marginLeft = '5px' ; sqr_clmn.style.backgroundColor = 'black'
    inp_parent.children[elements.indexOf(currentInputclass)].insertAdjacentElement('afterend' , sqr_clmn) ; elements.splice(elements.indexOf(currentInputclass) + 1 , 0 , 'p')
    //  first   input
    let sqr_inp = document.createElement('input');sqr_inp.style.marginRight = '5px';
    let inp2 = document.createElement('input');
    for (let i = 0; i < children_class.length; i++) {
        if (children_class[i].class == currentInputclass) {
            let newCL = currentInputclass.slice(0, currentInputclass.length -2) + '_sqr' + String(sqr_len) + '_1'
            children_class.splice( i+1 , 0,{class: newCL, depth: getClassParts(newCL).length -1, looping: getLooping(getClassParts(newCL).length -1 , children_class)})
            sqr_inp.classList.add(children_class[i + 1].class)
            elements.splice(elements.indexOf(currentInputclass) + 2 , 0, children_class[i + 1].class)
            //inp2
            let newCL2 = currentInputclass.slice(0 , currentInputclass.length - 1 ) + (Number(currentInputclass[currentInputclass.length-1])+ 1)
            children_class.splice( i+2 , 0, {class: newCL2, depth: getClassParts(newCL2).length -1, looping: getLooping(getClassParts(newCL2).length -1 , children_class)})
            inp2.classList.add(children_class[i + 2].class)
            elements.splice(elements.indexOf(currentInputclass) + 3 , 0, children_class[i + 2].class)
        } 
    }
    inp_parent.children[elements.indexOf(currentInputclass) + 1].insertAdjacentElement('afterend' , sqr_inp )
    inp_parent.children[elements.indexOf(currentInputclass) + 2].insertAdjacentElement('afterend' , inp2 )
    console.log(inp_parent.children , children_class);
    input = document.getElementsByTagName('input')
    for (let i = 0; i < input.length; i++) {
        input[i].onfocus = function select(){
            currentInputclass = this.classList[0]
            console.log(currentInputclass);
        }
    }
}
parent.children[14].onclick = ()=>{//       power
    pow_len ++
    //  first   input
    let pow_inp = document.createElement('input');pow_inp.style.marginLeft = '5px';
    for (let i = 0; i < children_class.length; i++) {
        if (children_class[i].class == currentInputclass) {
            let newCL = currentInputclass.slice(0, currentInputclass.length -2) + '_pow' + String(pow_len) + '_1'
            children_class.splice(i + 1 , 0,{class: newCL, depth: getClassParts(newCL).length -1, looping: getLooping(getClassParts(newCL).length -1 , children_class)})
            pow_inp.classList.add(children_class[i + 1].class)
            elements.splice(elements.indexOf(currentInputclass) + 1 , 0, children_class[i + 1].class)
        } 
    }
    inp_parent.children[elements.indexOf(currentInputclass)].insertAdjacentElement('afterend' , pow_inp )
    //  paragraph
    let pow_clmn = document.createElement('p');pow_clmn.innerText = '2'
    pow_clmn.style.height = '40px'; pow_clmn.style.width = '6px';pow_clmn.style.textAlign = 'center';pow_clmn.style.position = 'relative';pow_clmn.style.bottom = '17px'
    pow_clmn.style.marginRight = '5px' ;
    inp_parent.children[elements.indexOf(currentInputclass) +1].insertAdjacentElement('afterend' , pow_clmn) ; elements.splice(elements.indexOf(currentInputclass) + 2 , 0 , 'p')
    //  second  input
    let inp2 = document.createElement('input');
    for (let i = 0; i < children_class.length; i++) {
        if (children_class[i].class == currentInputclass){
            let newCL2 = currentInputclass.slice(0 , currentInputclass.length - 1 ) + (Number(currentInputclass[currentInputclass.length-1])+ 1)
            children_class.splice(i + 2 , 0,{class: newCL2, depth: getClassParts(newCL2).length -1, looping: getLooping(getClassParts(newCL2).length -1 , children_class)})
            inp2.classList.add(children_class[i + 2].class)
            elements.splice(elements.indexOf(currentInputclass) + 3 , 0, children_class[i + 2].class)
        }
    }
    inp_parent.children[elements.indexOf(currentInputclass) + 2].insertAdjacentElement('afterend' , inp2 )
    console.log(inp_parent.children,children_class);
    input = document.getElementsByTagName('input')
    for (let i = 0; i < input.length; i++) {
        input[i].onfocus = function select(){
            currentInputclass = this.classList[0]
            console.log(currentInputclass);
        }
    }
}
function getNestedLists(list,depth,newList) {
    let ends = []           
    for (let i = 0; i < list.length; i++) {
        if (list[i].depth == depth) {
            let element = document.getElementsByClassName(list[i].class);
            if (newList[0] == undefined) {newList.push(list[i].class , element[0].value);}
            else{newList.push([] , element[0].value)}
            ends.push(i)
        } 
    }
    for (let i = 2; i < newList.length; i+=2) {
        getNestedLists(list.slice(ends[i/2 -1]+1 , ends[i/2]), depth+1, newList[i]) 
    }
    if (newList[0] == 'inp_1') return newList
}//()=r5%&$♦