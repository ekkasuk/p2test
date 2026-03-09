let questions=[]
let index=0
let repeat=false
let exam=false

function show(){

if(!questions.length)return

let q=questions[index]

qNumber.innerText="ข้อ "+(index+1)+" / "+questions.length

question.innerText=q.q

choices.innerHTML=""

q.c.forEach(c=>{

let d=document.createElement("div")

d.className="choice"
d.innerText=c

choices.appendChild(d)

})

}

function speak(text){

let rate=document.getElementById("speed").value

let utter=new SpeechSynthesisUtterance(text)

utter.lang="th-TH"
utter.rate=rate

speechSynthesis.speak(utter)

}

function readQuestion(){

let delay=document.getElementById("delay").value*1000

setTimeout(()=>{

speak(questions[index].q)

if(repeat){

setTimeout(readQuestion,6000)

}

},delay)

}

function readChoices(){

questions[index].c.forEach((c,i)=>{

setTimeout(()=>{

speak(c)

},i*2000)

})

}

function next(){

if(index<questions.length-1){

index++
show()

}

}

function prev(){

if(index>0){

index--
show()

}

}

function toggleRepeat(){

repeat=!repeat

alert("อ่านซ้ำ: "+repeat)

}

function examMode(){

exam=!exam

document.querySelectorAll("button").forEach(b=>{

if(!b.innerText.includes("อ่าน")){

b.disabled=exam

}

})

}

document.getElementById("fileInput").addEventListener("change",function(e){

let file=e.target.files[0]

if(file.name.endsWith(".docx")){

readDocx(file)

}else{

readTxt(file)

}

})

function readTxt(file){

let reader=new FileReader()

reader.onload=function(){

parse(reader.result)

}

reader.readAsText(file)

}

function readDocx(file){

let reader=new FileReader()

reader.onload=function(event){

mammoth.extractRawText({arrayBuffer:event.target.result})
.then(function(result){

parse(result.value)

})

}

reader.readAsArrayBuffer(file)

}

function parse(text){

let parts=text.split("ข้อ")

questions=[]

parts.forEach(p=>{

let lines=p.trim().split("\n")

if(lines.length>1){

let q=lines[0]

let c=lines.slice(1)

questions.push({q:q,c:c})

}

})

index=0
show()

}
