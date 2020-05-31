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
                console.log(response)
            },
            error: function(response) {
                // alert the error if any error occured
                alert(response);
            }
        })}
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
                console.log(response);
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
            task.style.display=block;
            // send ajax call to update status as processing
            changeStatus(data,2);
            //color updated orders (green)
            var children=e.target.children;
            for(var i=0;i<children.length;i++){
                if(children[i].classList[0]=="order"){
                    children[i].className="order bg-success"

                }
            }

        }
        else if(e.target.id=="done"){
            console.log(task,e.target)
            e.target.appendChild(task);
            //send ajax call to update status as orderded
            changeStatus(data,3);
            // color updated orders (red)
            var children=e.target.children;
            for(var i=0;i<children.length;i++){
                if(children[i].classList[0]=="order"){
                    children[i].className="order bg-danger"
                }
            }
        }
        else {
            console.log(task,e.target)
            e.target.appendChild(task);
            //send ajax call to update status as orderded
            changeStatus(data,1);
            // color updated orders (red)
            var children=e.target.children;
            for(var i=0;i<children.length;i++){
                if(children[i].classList[0]=="order"){
                    children[i].className="order bg-danger"
                }
            }
        }

    }

    function enterdrag(e) {
        e.preventDefault();
    }

    function overdrag(e) {
        e.preventDefault();
    }

