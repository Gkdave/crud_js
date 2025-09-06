let regForm = document.querySelector('.register-form'); 
let allInput=regForm.querySelectorAll('INPUT');
let allBtn=regForm.querySelectorAll('button');
let closeBtn =document.querySelector(".btn-close");
let regList =document.querySelector(".reg-list");
let modalBtn = document.getElementById("#myModal");
let addBtn =document.querySelector(".add-btn");
let searchEl =document.querySelector(".search");
let delAllBtn =document.querySelector(".delete-all-btn");
let paginationBox=document.querySelector(".pagination-box");
let prevBtn=document.querySelector(".prev-btn");
let nextBtn=document.querySelector(".next-btn");

let allRegData=[];

let url = "";

// Stored Data in localStorage 
if(localStorage.getItem("allRegData") !=null){
    allRegData=JSON.parse(localStorage.getItem('allRegData'));
}
// console.log(allRegData); 
// Adding Data 
regForm.onsubmit = (e)=>{
    e.preventDefault(); // preventing form from submitting
    let checkEmail = allRegData.find((data)=>data.email == allInput[1].value);
    if(checkEmail == undefined){
        allRegData.push({
        name: allInput[0].value,
        email:allInput[1].value,
        mobile:allInput[2].value,
        dob:allInput[3].value,
        passoword:allInput[4].value,
        profile:url == "" ? "LogoC.png" : url, 
    
    });
    localStorage.setItem('allRegData',JSON.stringify(allRegData));
        swal("Data inserted successfully", "You clicked the button!", "success");
        closeBtn.click();
        regForm.reset("");
        getRegData(0,5);
    }
    else
    {
        swal("Email already exists","failed","warning");
    }

}

const getRegData = (from,to)=>{
    regList.innerHTML="";
    let filter = allRegData.slice(from,to);
    // console.log(filter);
    filter.forEach((data,index)=>{
        let dataStr = JSON.stringify(data);
        let finalData = dataStr.replace(/"/g,"'");
            regList.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td>
                <img src="${data.profile}"  alt="profile" style="width: 40px; border-radius: 50%;">
                </td>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.mobile}</td>
                <td>${data.dob}</td>
                <td>${data.passoword}</td>
                <td>
                     <button data="${finalData}"  index="${index}" class="edit-btn btn btn-primary p-1 px-2"><i class="fa fa-edit"></i></button>
                     <button index="${index}" class="del-btn btn btn-danger p-1 px-2"><i class="fa fa-trash"></i></button>
                     
                </td>
            </tr>`;
    });
action();

}


//Delete Coding
const action=()=>{
    //delete Coding 

    let allDelBtn = regList.querySelectorAll(".del-btn");
    for(let btn of allDelBtn){
        btn.onclick = async ()=>{
                let index = btn.getAttribute("index");
                let isConfirm = await confirm();
                if(isConfirm){
                    allRegData.splice(index,1);
                    localStorage.setItem("allRegData",JSON.stringify(allRegData));
                    getRegData();
                }
            }
        }

    //Edit Coding 
    let allEditBtn = regList.querySelectorAll(".edit-btn");
    for(let btn of allEditBtn){
        btn.onclick =()=>{
            let index = btn.getAttribute("index");
            let dataStr=btn.getAttribute("data");
            let finalData=dataStr.replace(/'/g,'"');
            let data = JSON.parse(finalData);
            console.log(data);
            addBtn.click();
            allInput[0].value=data.name;
            // console.log(data.name);
            allInput[1].value=data.email;
            allInput[2].value=data.mobile;
            allInput[3].value=data.dob;
            allInput[4].value=data.password;
            url=data.profile;
            allBtn[0].disabled=false;
            allBtn[1].disabled=true;

            allBtn[0].onclick=()=>{
            allRegData[index]={
                    name:allInput[0].value,
                    email:allInput[1].value,
                    mobile:allInput[2].value,
                    dob:allInput[3].value,
                    password:allInput[4].value,
                    profile: url == "" ? "/img/LogoC.png" : url,
        
        }
        localStorage.setItem("allRegData",JSON.stringify(allRegData));
            swal("Data Updated"," Successfully","success"); 
            closeBtn.click(); 
            regForm.reset(); 
            getRegData(0,5);
            allBtn[0].disabled=true;
            allBtn[1].disabled=false;
            }
        }
    }
}

getRegData(0,5);

//Reading profile Photo
allInput[5].onchange = ()=>{
    let freader = new FileReader();  
    freader.readAsDataURL(allInput[5].files[0]);
    freader.onload = (e)=>{
        url=e.target.result;
        // console.log(url);
    }
}   

// delete all data

delAllBtn.onclick = async() => {
    // alert();
    let isConfirm = await confirm();
    if(isConfirm){
        allRegData = [];
        localStorage.removeItem("allRegData");
        getRegData();
    }
}
//let confirm 

const confirm =()=>{
    return new Promise((resolve,reject)=>{
        swal({
            title:"Are you sure ?",
            text:"Once deleted, you will not be able to recover!",
            icon:"warning",
            buttons:true,
            dangerMode:true,
        })
        .then((willDelete) => {
            if(willDelete){
                resolve(true);
                swal("Poof! Your imaginary file has been deleted.", {
                    icon:"success",
                });

            }else{
                reject(false);
                swal("Your imaginary file is safe!");

            }
        })
    });
}

//searching data

searchEl.oninput = ()=>{
    search();
}

const search = ()=>{
    let value=searchEl.value.toLowerCase();

    let tr = regList.querySelectorAll("tr");
    let i;
    for(i=0;i<tr.length;i++)
    {
        let allTd=tr[i].querySelectorAll("TD");
        let name=allTd[2].innerHTML;
        let email=allTd[3].innerHTML;
        let mobile=allTd[4].innerHTML;
        if(name.toLowerCase().indexOf(value) != -1){
            tr[i].style.display="";
        }else if(email.toLowerCase().indexOf(value) != -1){
        tr[i].style.display=""; 
    }
    else if(mobile.toLowerCase().indexOf(value) != -1){
        tr[i].style.display=""; 
    }
    else{
        tr[i].style.display ="none";
        }
    }  
}
//pagination Coding 

let length = allRegData.length/5;
let i, dataSkip=0,loadData=5;

if(length.toString().indexOf(".") !=-1){
    length = length + 1;
}
for(i=1;i<length;i++)
{
    paginationBox.innerHTML += `<button data-skip="${dataSkip}" load-data="${loadData}"  class="btn paginate-btn">${i}</button>`
    dataSkip = dataSkip + 5;
    loadData = loadData + 5;
}

//pagination 

let allPaginateBtn=paginationBox.querySelectorAll(".paginate-btn");
allPaginateBtn[0].classList.add("active");
allPaginateBtn.forEach((btn,index)=>{
     btn.onclick = ()=>{
        controlPrevAndNext(allPaginateBtn,index);
        for(let el of allPaginateBtn){
            el.classList.remove("active");
            
        }
        btn.classList.add("active");
        let skip = btn.getAttribute("data-skip");
        let loaded = btn.getAttribute("load-data");
        getRegData(skip,loaded);
    }
});
// for(let btn of allPaginateBtn){
   
// }


//next btn Coding

nextBtn.onclick = ()=>{
    let currentIndex = 0;
    allPaginateBtn.forEach((btn,index)=>{
        if(btn.classList.contains("active"))
        {
            currentIndex = index;
        }
    });
    allPaginateBtn[currentIndex+1].click();
    controlPrevAndNext(allPaginateBtn,currentIndex+1);
}
const controlPrevAndNext = (allPaginateBtn,currentIndex)=>{
    let length = allPaginateBtn.length-1;
    if(currentIndex == length)
    {
        nextBtn.disabled = true;
        prevBtn.disabled = false;
    }
    else if(currentIndex > 0)
        {
        prevBtn.disabled=false;
        nextBtn.disabled=false; 
    }
    else
    {
        prevBtn.disabled = true; 
        nextBtn.disabled=false;
    }
}


//prev btn Coding 

prevBtn.onclick = ()=>{
    let currentIndex = 0;
    allPaginateBtn.forEach((btn,index)=>{
        if(btn.classList.contains("active"))
        {
            currentIndex = index;   
        }
    });
    allPaginateBtn[currentIndex-1].click();
    controlPrevAndNext(allPaginateBtn,currentIndex-1);
}

