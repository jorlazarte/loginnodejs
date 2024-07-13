const updateButton = document.getElementById('btn_updatePost')
/*
const updInputId = document.getElementById('update-id')
const updInputName = document.getElementById('update-name')
const updInputPrice = document.getElementById('update-price')
const updInputStock = document.getElementById('update-stock')
*/

const modifyButtonHandleClick = (e) => {

    e.preventDefault()
    /*
    if (updInputId.value.length === 0 ||
        updInputName.value.length === 0 ||
        updInputPrice.value.length === 0 ||
        updInputStock.value.length === 0) {

        return alert('Uno o más campos no se han completado')
    }
    */
    const body = {
        idPost: document.getElementById('postId').value, 
        idUser: document.getElementById('postIdUser').value, 
        titlePost: document.getElementById('postTitle').value, 
        textPost: document.getElementById('postBody').value
    }
    
    const url = '3'
    
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => errorCheck(res))
        .catch(err => alert(err))
}

const errorCheck = (error) => {
    if (error.error_code === 1 ||
        error.error_code === 3 ||
        error.error_code === 10)
        alert(error.error_desc)

    if (error.error_code === 0) {
        alert(error.desc)
        location.href = '/'
    }
}

//updateButton.addEventListener('click', modifyButtonHandleClick)