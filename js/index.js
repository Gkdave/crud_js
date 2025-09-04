let regForm = document.querySelector('.register-form'); 
let allInput=regForm.querySelectorAll('INPUT');
let closeBtn =document.querySelector(".btn-close");
let regList =document.querySelector(".reg-list");



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
        profile: url == "" ? "/img/download.png" : url, 
    
    });
    localStorage.setItem('allRegData',JSON.stringify(allRegData));
        swal("Data inserted successfully", "You clicked the button!", "success");
        closeBtn.click();
        regForm.reset("");
        getRegData();
    }
    else
    {
        swal("Email already exists","failed","warning");
    }

}

const getRegData = ()=>{
    regList.innerHTML="";
    allRegData.forEach((data,index)=>{
            regList.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td>
                <img src="${data.profile}" width="40" alt="image" style="width: 40px; border-radius: 50%;">
                </td>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.mobile}</td>
                <td>${data.passoword}</td>
                <td>
                     <button data="${data}"  index="${index}" class="edit-btn btn btn-primary p-1 px-2"><i class="fa fa-edit"></i></button>
                     <button index="${index}" class="del-btn btn btn-danger p-1 px-2"><i class="fa fa-trash"></i></button>
                     
                </td>
            </tr>
                  `
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



}

getRegData();
//Reading profile Photo
allInput[5].onchange = ()=>{
    let freader = new FileReader();  
    freader.readAsDataURL(allInput[5].files[0]);
    freader.onload = (e)=>{
        url=e.target.result;
        console.log(url);
    }
}   


//let confirm 

const confirm =()=>{
    return new Promise((resolve,reject)=>{
        swal({
            title:"Are you sure ?",
            text:"Once deleted, you will not be able to recover!",
            icon:"Warning",
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