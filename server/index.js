const puppeteer = require ("puppeteer")

(async () => {
    const URL = "https://www.amazon.com/s?k=medias+de+compresi%C3%B3n+para+mujer";
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto(URL, { waituntil: "networkidle2"});
    const title = await page.title()
    console.log('titulo de la pagina : ${title}')

    let products = [];
    let nextPage = true;
     while (nextPage) { 
       const products= await pageXOffset.evalute (()=> {
            const products = Array.from(document.querySelectorAll('.puis-card-container.s-card-container'))

           return products.map(products =>{
                const title = products.querySelector('.a-text-normal').innerText
                const priceWhole = products.querySelector('.a-price-whole').innerText
                const priceFraction = products.querySelector('.a-price-fraction').innerText
            
                if (!priceWhole || !priceFraction) {
                    return
                }
                console.log(title)
                console.log(priceWhole + '.'+ priceFraction)
                console.log(priceFraction)
            })
        })
        products = {...products, ...newProducts}
        await page.evalute(() => {
            const nextButton = document.querySelector('.s-pagination-next')
            if (nextButton) {
                nextButton.click()
                return true
            }
            return false
        })
    }
})();

   