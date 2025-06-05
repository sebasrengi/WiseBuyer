const puppeteer = require("puppeteer")

;(async () => {
    const URL = "https://www.amazon.com/s?k=medias+de+compresi%C3%B3n+para+mujer";
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle2"});
    const title = await page.title();
    console.log('titulo de la pagina : ${title}');

    let products = [];
    let nextPage = true;
     while (nextPage) {
       const newProducts = await page.evaluate(() => {
            const products = Array.from(document.querySelectorAll('.puis-card-container.s-card-container'));

           return products.map(product => {
                const title = product.querySelector('.a-text-normal').innerText;
                const priceWhole = product.querySelector('.a-price-whole').innerText;
                const priceFraction = product.querySelector('.a-price-fraction').innerText;

                if (!priceWhole || !priceFraction) {
                    return null;
                }
                console.log(title);
                console.log(priceWhole + '.' + priceFraction);
                console.log(priceFraction);
                return {
                  title,
                  price: priceWhole + '.' + priceFraction
                };
            });
        });
        products = {...products, ...newProducts};
        await page.evaluate(async () => {
            const nextButton = document.querySelector('.s-pagination-next');
            if (nextButton) {
                nextButton.click();
                return true;
            } else {
              return false;
            }
        });
    }
})();
