const fs = require('fs');
const validateYarn = require('../validation/yarnValidationService');
const normalizeYarn = require('../normalization/normalizeYarn');
const { createYarn } = require('../dataAccess/yarnsDataAccessService');
const validateStock = require('../validation/stockValidationService');
const { createStock } = require('../dataAccess/stockDataAccessService');

const generateYarns = async () => {
    try {
        const data = fs.readFileSync('./initialData/generateYarns.json', 'utf8');
        const yarns = JSON.parse(data);
        for (let i = 0; i < yarns.length; ++i) {
            const errorMessage = validateYarn(yarns[i]);
            if (errorMessage !== "") {
                return console.log("generateYarns: Validation error: " + errorMessage);
            }

            let yarn = await normalizeYarn(yarns[i]);
            yarn = await createYarn(yarn);
            console.log("yarn.image.url:" + yarn.image.url)
            let stock = { yarnId: yarn._id.toString(), image: { url: yarn.image.url, alt: yarn.image.alt }, quantity: yarn.quantityInStock };
            const errorMsg = validateStock(stock);
            if (errorMsg !== "") {
                return console.log("generateYarns: Validation error: " + errorMsg);
            }
            stock = await createStock(stock);
        }
    } catch (error) {
        console.log("generateYarns: " + error);
    }
}
module.exports = generateYarns;