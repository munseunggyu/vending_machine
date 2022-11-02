
const data = [
  {
    name:'Original_Cola',
    price:1000,
    img:'./images/Original_Cola.png',
    count:5
  },
  {
    name:'Violet_Cola',
    price:1000,
    img:'./images/Violet_Cola.png',
    count:3
  },
  {
    name:'Yellow_Cola',
    price:1000,
    img:'./images/Yellow_Cola.png',
    count:6
  },
  {
    name:'Cool_Cola',
    price:1000,
    img:'./images/Cool_Cola.png',
    count:5
  },
  {
    name:'Green_Cola',
    price:1000,
    img:'./images/Green_Cola.png',
    count:5
  },
  {
    name:'Orange_Cola',
    price:1000,
    img:'./images/Orange_Cola.png',
    count:5
  }
]
class Drink{
  constructor(name,price,total,img){
    this.name = name;
    this.price = price
    this.total = total
    this.cartCount = 0
    this.img = img
  }
  click(){
    this.total -= 1
    this.cartCount += 1
  }
}
class Vending{
  constructor(){
    this.drinks = []
    this.priceTotal = 0
    this.cartTotal = {}
    this.money = 0
  }
  addDrink(name,price,total,img){
    this.drinks.push(new Drink(name,price,total,img))
  }
  getDrink(){
    return this.drinks
  }
  addMoney(money){
    this.money += money
  }
  cart(name){ 
    const clickDrink = this.drinks.findIndex(v => name === v.name)
    if(this.drinks[clickDrink].total <= 0){
      console.log('품절입니다만')
      return 
    }
    else{
      this.drinks[clickDrink].click() // Drink의 메소드
      this.priceTotal += this.drinks[clickDrink].price
      // console.log(this.drinks[clickDrink].name, clickDrink)

      // 카트에 객체로 각 음료수 정보 넘겨주기
      this.cartTotal[this.drinks[clickDrink].name] = this.drinks[clickDrink]
      return 
    }
  }
  buy(money){
    const change = money - this.priceTotal
    if(change < 0 ){
      console.log('돈이 부족합니다.')
    }else{
      console.log(`거스름돈은 ${change}입니다.`)
      return change
    }
  }
}

// 자판기 생성
const vending = new Vending()

// 자판기에 data에 있는 음료수 넣어준다.
data.forEach(drink => vending.addDrink(drink.name,drink.price,drink.count,drink.img))

const frag = document.createDocumentFragment()

const cartUl = document.querySelector('#cart')

// 자판기 안의 음료수들을 순회한다.
vending.getDrink().forEach(drink => {
  const figure = document.createElement('figure')
  figure.classList.add('figure-drink')
  
  // 자판기 클릭시 
  figure.addEventListener('click',() => {
    vending.cart(drink.name)  // vending의 cart실행
    cartUl.innerHTML = '' // 카트안을 지우고 다시 그린다.
    for(let i in vending.cartTotal){ //cartTotal을 순회하며 그려준다.
      getCarts(vending.cartTotal[i], cartUl)
    }
  })

  const drinkImg = document.createElement('img')
  drinkImg.classList.add('img-drink')
  drinkImg.setAttribute('src',drink.img)
  drinkImg.setAttribute('alt','')

  const figcaption = document.createElement('figcaption')
  figcaption.classList.add('img-drink-caption')

  const drinkName = document.createElement('p')
  drinkName.innerText = drink.name

  const drinkPrice = document.createElement('p')
  drinkPrice.innerText = drink.price

  figcaption.appendChild(drinkName)
  figcaption.appendChild(drinkPrice)

  figure.appendChild(drinkImg)
  figure.appendChild(figcaption)
  frag.appendChild(figure)
})
const drinkContainer = document.querySelector('.drink-con')
drinkContainer.appendChild(frag)

// // 카트에 그려주기

function getCarts(item,ul){
  console.log(vending.cartTotal)
  const cartLi = document.createElement('li')
  cartLi.classList.add('li-drink')

  const cartContainer = document.createElement('div')
  cartContainer.classList.add('drink-con')

  const cartImg = document.createElement('img')
  cartImg.classList.add('img-drink')
  cartImg.setAttribute('src',item.img)
  cartImg.setAttribute('alt','')

  const cartP = document.createElement('p')
  cartP.classList.add('p-name')
  cartP.innerText = item.name

  const cartCount = document.createElement('span')
  cartCount.classList.add('span-count')
  cartCount.innerText = item.cartCount


  cartContainer.appendChild(cartImg)
  cartContainer.appendChild(cartP)
  
  cartLi.appendChild(cartContainer)
  cartLi.appendChild(cartCount)
  ul.appendChild(cartLi)
}

// 처음 잔액 0원
const calculate = document.querySelector('.calculate')
calculate.innerText = vending.money +'원'

// 입금 버튼 누르면 자판기의 Money에 더 해준다.
const moneyInput = document.querySelector('.input-deposit_amount')
const cartBtn = document.querySelector('.inputBtn')
cartBtn.addEventListener('click', () =>{
  vending.money = +vending.money + +moneyInput.value
  moneyInput.value = 0
  calculate.innerText = vending.money + '원'
})

const getUl = document.querySelector('#get')
// 획득 버튼 클릭
const getBtn = document.querySelector('.btn-get')
getBtn.addEventListener('click', () => {
  cartUl.innerHTML = '' // 카트안을 지우고 다시 그린다.
  for(let i in vending.cartTotal){ //cartTotal을 순회하며 그려준다.
    getCarts(vending.cartTotal[i],getUl )
  }
  vending.cartTotal = []
})

