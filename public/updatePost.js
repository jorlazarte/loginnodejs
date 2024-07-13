const modifyButtonHandleClick = (e) => {

    e.preventDefault()

    if (updInputId.value.length === 0 ||
        updInputName.value.length === 0 ||
        updInputPrice.value.length === 0 ||
        updInputStock.value.length === 0) {

        return alert('Uno o más campos no se han completado')
    }

    const body = {
        name: updInputName.value,
        price: parseFloat(updInputPrice.value),
        stock: updInputStock.value
    }

    const url = './products/' + updInputId.value

    fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => errorCheck(res))
        .catch(err => alert(err))
}