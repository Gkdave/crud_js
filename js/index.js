let regForm = document.querySelector('.register-form'); 
let allInput=regForm.querySelectorAll('INPUT');
let closeBtn =document.querySelector(".btn-close");
let allRegData=[];
let url = "";


// Stored Data in localStorage 
if(localStorage.getItem(allRegData) !=null){
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
    profile: url == "" ? "/img/download.png" : url
});
localStorage.setItem('allRegData',JSON.stringify(allRegData));
swal("Data inserted successfully", "You clicked the button!", "success");
closeBtn.click();
regForm.reset("");
    }
    else
    {
        swal("Email already exists","failed","warning");
    }
}

//Reading profile Photo
allInput[5].onchange = ()=>{
    let freader = new FileReader();  
    freader.readAsDataURL(allInput[5].files[0]);
    freader.onload = (e)=>{
        url=e.target.result;
        console.log(url);
    }
    }   
    
