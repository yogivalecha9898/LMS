class book {
    constructor(title, author, type) {
        this.title = title
        this.author = author
        this.type = type
    }
}

class display {
    add(chp){
        console.log("adding")
        let tB = document.getElementById('tBody')
        let ui = `
            <tr>
                <td>${chp.title}</td>
                <td>${chp.author}</td>
                <td>${chp.type}</td>
                <td>
                    <button id = "delete" onclick = "impD(this.parentElement.parentElement)">Del</button>
                </td>
            </tr> 
        `
        tB.innerHTML += ui
    }

    clear() {
        const lib = document.getElementById('library')
        lib.reset()
    }

    show(type, det) {
        let message = document.getElementById('mess')
        message.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>Message: </strong>${det}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
        setTimeout(()=> {
            message.innerHTML = ''
        },5000)
    }

    validate(chp) {
        if(chp.title.length < 2 || chp.author.length < 2) return false
        return true
    }
}

const libFun = (e)=> {
    console.log("Tis is my library")
    let title = document.getElementById('title').value  
    let author = document.getElementById('author').value

    let history = document.getElementById('history')
    let horror = document.getElementById('horror')
    let fiction = document.getElementById('fiction')
    let type = undefined

    if(history.checked) type = history.value
    else if(fiction.checked) type = fiction.value
    else if(horror.checked) type = horror.value

    let chp = new book(title, author, type)
    console.log(chp)

    let dis = new display()
    
    if(dis.validate(chp)) {
        dis.add(chp)
        dis.clear()
        dis.show('success', 'Your book has been successfully added to the queue')
    } else {
        dis.show('danger', 'An error occured while adding your booking, please retry')
    }

    e.preventDefault()
}

function impD(toDel) {
    toDel.innerHTML = ''
}


const lib = document.getElementById('library')
lib.addEventListener('submit', libFun)

const sea = document.getElementById('search')

sea.addEventListener('keyup', ()=> {
    console.log(sea.value)
    let table = document.getElementById('tBody')
    let tr = table.getElementsByTagName('tr')
    for(let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[0];
        if(td) {
            let val = td.textContent || td.innerHTML
            if(val.toLowerCase().indexOf(sea.value.toLowerCase()) > -1) {
                tr[i].style.display = ""
            } else tr[i].style.display = "none"
        }
    }
    
})