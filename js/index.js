
const main = document.getElementById('main');
const search = () => {
    const input = document.getElementById('input-value');
    const error = document.getElementById('error');
  
    const inputValue = parseInt(input.value);
    input.value = '';
   
    if(isNaN(inputValue)){
        error.innerText = 'please give a number';
        main.innerText = '';
    }else if(inputValue == ''){
        error.innerText = 'please give something in input';
        main.innerText= '';

    }else if(inputValue <= 0){
        error.innerText = 'give a positve value please';
        main.innerText= '';

    }else if(inputValue > 52){
        error.innerText = 'we have only 52 cards. so input range is (1-52)';
        main.innerText= '';

    }
    else {
        error.innerText = '';
        input.value = '';
        main.innerText = '';

        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
        .then(res => res.json())
        .then(data => displayCards(data.cards));
       
    }
    
}

const displayCards = (cards) => {
    for(let card of cards){
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.classList.add('col-sm-12');
        div.classList.add('mb-5');
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${card.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title"> Suit: ${card.suit}</h5>
                <p class="card-text"> Code: ${card.code}</p>
                <button onclick="cardDetails('${card.code}')"  href="#" class="btn btn-primary">See Details</button>
            </div>
        </div>
        `;
        main.appendChild(div);
    }

}

const cardDetails = (code) => {
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(res => res.json())
        .then(data => {
            const allCards = data.cards;
            const singleCard =  allCards.find( card => card.code == code);
            const div = document.createElement('div');
            
            main.innerHTML = '';
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${singleCard.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title"> Suit: ${singleCard.suit}</h5>
                <p class="card-text"> Code: ${singleCard.code}</p>
                <p class="card-text"> Value: ${singleCard.value}</p>
              
            </div>
        </div>
            `;
            main.appendChild(div);
        });

}