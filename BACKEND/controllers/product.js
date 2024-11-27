const { response } = require('express');
const Product = require('../models/productModel');


const getProductBySlug = async( req, res = response ) => {

    const { slug } = req.query;
    const product = await Product.findOne({ slug }).lean();
 
    if( !product ) {
        return res.status(404).json({
            message: 'Producto no encontrado'
        })
    }

    return res.json( product );


}


module.exports = {
    getProductBySlug,
}