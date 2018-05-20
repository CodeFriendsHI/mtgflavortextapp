const fetch = require("node-fetch");

/**
 * get the data to validate
 */
async function getValidation() {
    let result;
    try {
        result = await fetch("https://api.scryfall.com/sets");
    } catch (error) {
        throw error;
    }

    return result;
}

/**
 * validate if a card exists based on set and cat
 * 
 * @param {string} set 
 * @param {number} card 
 * 
 * @returns {boolean} boolean value baesd on if the card exists or not
 */
async function validate(set, card) {

    console.info(set,card)
    const result = await getValidation();

    const json = await result.json();

    let validate = false;

    json.data.forEach((item)=> {
        if(set === item.code && 1 <= card && card <= item.card_count ) {
            validate = true;
        }
    });
    
    return validate;
}

module.exports = {
    validate,
};
