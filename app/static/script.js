const preferencesContainerID  = document.getElementById('preferences-container-id');
const resultContainerID = document.getElementById('results-id');

let cuisine_collection = [];

function onClickAddCuisine(cuisine){
    if (!cuisine_collection.includes(cuisine)){
        cuisine_collection.push(cuisine);
        renderCusine();
    }
    
}


function onClickRemoveCuisine(index){
    console.log(index);
    cuisine_collection = cuisine_collection.filter((item, i) => i != index);


    renderCusine()

}



function renderCusine(){ 
    preferencesContainerID.innerHTML = "";

    for (let i=0; i < cuisine_collection.length; i++){ 

        const listElemtent = document.createElement('li');
        const spanElement = document.createElement('span');
        
        // add event listener
        spanElement.addEventListener('click', () => onClickRemoveCuisine(i))

        // class requirements
        listElemtent.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        spanElement.classList.add('badge', 'bg-danger', 'close');
        
        // add content to element
        listElemtent.innerHTML = cuisine_collection[i];
        spanElement.innerHTML = "<i data-feather='trash'></i>";
    
        listElemtent.appendChild(spanElement);
    
        preferencesContainerID.appendChild(listElemtent); // add to to preferences
    
    }

    // define elements below
   

    feather.replace({ class: 'icon' });
}


async function getResults (){ 
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })




    const reqInit = { method: 'GET', headers, mode: 'cors', cache: 'default'};


    const response = await fetch(`http://localhost:5000/search?query=${cuisine_collection.join(',')}`, reqInit);

    const json = await response.json();

    let content = "";

    console.log(json.results);
    for (var recipe of json.results){
        content += `
                    <div class='card'>
                    <img class='card-img-top' src='${recipe.image}'>
                    <div class='card-body'>
                    ${recipe.title}
                    </div>
                    </div>` 
    }
    resultContainerID.innerHTML = content
}


