const { response } = require('express');
const Product = require('../models/productModel');



const SHOP_CONSTANTS = {
    validGenders: ['men','women','kid','unisex'],
}


const getProductBySlug = async( req, res = response ) => {
    console.log(req.query.slug)
    const { slug } = req.query;
    const product = await Product.findOne({ slug }).lean();

    if( !product ) {
        return res.status(404).json({
            message: 'Producto no encontrado'
        })
    }

    

    return res.status(200).json( product );

}



module.exports = {
    getProductBySlug,
}