const { response } = require('express');
const Product = require('../models/productModel');



const SHOP_CONSTANTS = {
    validGenders: ['men','women','kid','unisex'],
}



const getProducts = async( req, res = response ) => {

    console.log(req.query.gender)
    
    const { gender = 'all' } = req.query;

    let condition = {};

    if ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ) {
        condition = { gender };
    }

    const products = await Product.find(condition)
                                .select('title images price inStock slug -_id')
                                .lean();


    return res.status(200).json( products );

}



module.exports = {
    getProducts,
}