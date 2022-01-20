document.querySelector('#create-todo').addEventListener('click', function () {
    document.querySelector('#new-item').style.display = 'block'

    document.querySelector('#new-item button').addEventListener('click', function () {
        let itemName = document.querySelector('#new-item input').value
        let itemUrl = document.querySelector('#new-item input').value
        if (itemName) {
            let items = localStorage.getItem('learn-items')
            let itemsArr = JSON.parse(items) !== null ? JSON.parse(items) : []
            itemsArr.push({ item: itemName, url: itemUrl })
            saveItems(itemsArr)
            fetchItems()
            document.querySelector('#text').value = ''
            document.querySelector('#url').value = ''
            document.querySelector('#new-item').style.display = 'none'
        }
    })
})

document.querySelector('#add-current-tab').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
        let itemName = tab[0].title
        let itemUrl = tab[0].url
        if (itemName) {
            console.log(itemUrl)
            let items = localStorage.getItem('learn-items')
            let itemsArr = JSON.parse(items) !== null ? JSON.parse(items) : []
            itemsArr.push({ item: itemName, url: itemUrl })
            saveItems(itemsArr)
            fetchItems()
        }
    })
})

document.querySelectorAll('.arrow-up').forEach(val => val.addEventListener('click', function () {

}))


function saveItems(obj) {
    let string = JSON.stringify(obj)
    localStorage.setItem('learn-items', string)
}

function itemDelete(index) {
    let items = localStorage.getItem('learn-items')
    let itemsArr = JSON.parse(items) !== null ? JSON.parse(items) : []
    document.querySelector('ul li[data-itemIndex="' + index + '"]').remove()
    saveItems(itemsArr.filter((val, i) => i !== index))
    fetchItems()
}

function moveUp(index) {
    let items = localStorage.getItem('learn-items')
    let itemsArr = JSON.parse(items) !== null ? JSON.parse(items) : []
    document.querySelector('ul li[data-itemIndex="' + index + '"]').remove()
    saveItems(itemsArr.filter((val, i) => i !== index))
    fetchItems()
}

function moveDown(index) {
    let items = localStorage.getItem('learn-items')
    let itemsArr = JSON.parse(items) !== null ? JSON.parse(items) : []
    saveItems(itemsArr.filter((val, i) => i !== index))
    fetchItems()
}


function fetchItems() {
    let itemsList = document.getElementById('learn-list')
    itemsList.innerHTML = ''
    let newItemHTML = ''
    try {
        let items = localStorage.getItem('learn-items')
        console.log(items)
        let itemsArr = JSON.parse(items) !== null ? JSON.parse(items) : []
        for (let i = 0; i < itemsArr.length; i++) {
            const url = !!itemsArr[i].url ? itemsArr[i].url : '#'
            newItemHTML += `<li data-itemIndex="${i}" 
            class="flex justify-between items-center capitalize ">
                <div class="flex-1 max-h-10 truncate">
                    <a href="${url}" target="_blank">
                        ${i + 1}: ${itemsArr[i].item} 
                    </a>
                </div>
                <div class="flex items-center">
                    <button class="text-4xl">␡</button>
                    <div class="text-sm">
                        ${i > 0 ? '<div class="cursor-pointer arrow-up">&uarr;</div>' : ''}
                        <div class="cursor-pointer arrow-down">&darr;</div>
                    </div>
                </div>
            </li>`
        }
        itemsList.innerHTML = newItemHTML

        document.querySelectorAll('ul li').forEach((val, i) => {
            val.querySelector('button').addEventListener('click', function () {
                itemDelete(i)
            })
        })
    } catch (err) {
        console.log(err)
        //create default items list
    }
}

fetchItems()

