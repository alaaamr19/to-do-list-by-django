function changeButton(e){
    if(e.target.value){
        $('#add').prop('disabled',false)
    }
    else{
        $('#add').prop('disabled',true)
    }
}

document.addEventListener('DOMContentLoaded',function(){
    $(".status-1").appendTo("#active");
    $(".status-2").appendTo("#doing");
    $(".status-3").appendTo("#done");
    $(".status").css({display:"block"})

})

function changeStatus(id,status) {
    $.ajax({
        type: 'GET',
        url: `/tasks/${id}/`,
        data: {
            "status": status,
        },
        success: function(response) {

        },
        error: function(response) {
            // alert the error if any error occured
            alert(response);
        }
    })
}

function addTask() {
    let textTitle =$("#task").val();
    if (!textTitle) {
        alert("enter value")
    }
    $.ajax({
        type: 'GET',
        url: "add/",
        data: {
            "title": textTitle,
            },

        success: function(response) {
               $("#task").val("");
               let dateFormat=new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit',hour: '2-digit', minute: '2-digit'}).format(new Date(response.date))
               let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                 newTask=$(`<div  draggable='true'  ondragend="enddrag(event)" ondragstart="startdrag(event)" scope='row' class='card status status-1' id= ${response.id}>
                                <strong>${textTitle}</strong>
                                <p class="text-primary">${dateFormat}</p>
                            </div >`);
                 $("#active").prepend(newTask);
        },
        error: function(response) {
            // alert the error if any error occured
            alert(response);
        }

    })
}
//drag and drop handlers
function startdrag(e) {
    let taskId = e.target.id;
    console.log(taskId);
    e.dataTransfer.setData('myTask', taskId);

}

function enddrag(e) {
    e.preventDefault();
}

function dropped(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("myTask");
    var task = document.getElementById(data);

    if (e.target.id=="doing"){
        e.target.appendChild(task);
        // send ajax call to update status as Doing
        changeStatus(data,2);

    }
    else if(e.target.id=="done"){
        e.target.appendChild(task);
        //send ajax call to update status as Done
        changeStatus(data,3);

    }
    else if(e.target.id=="active") {
        e.target.appendChild(task);
        //send ajax call to update status as Active
        changeStatus(data,1);

    }

}

function enterdrag(e) {
    e.preventDefault();
}

function overdrag(e) {
    e.preventDefault();
}

