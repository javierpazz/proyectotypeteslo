const { response } = require('express');
const Product = require('../models/productModel');

const getSearchPro = async( req, res = response ) => {
    
    let { q = '' } = req.query;

    
    if ( q.length === 0 ) {
        return res.status(400).json({
            message: 'Debe de especificar el query de búsqueda'
        })
    }

    q = q.toString().toLowerCase();

    const products = await Product.find({
        $text: { $search: q }
    })
    .select('title images price inStock slug -_id')
    .lean();



    return res.status(200).json(products);
}

module.exports = {
    getSearchPro,
}