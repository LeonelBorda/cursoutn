var pool = require ('./bd');

async function getProductos () {  
        var query = 'select * from productos';
        var rows = await pool.query (query);
        return rows;   
}

async function deleteProductosById (id) {  
    var query = 'delete from productos where id = ?';
    var rows = await pool.query (query, [id]);
    return rows;   
}

module.exports = { getProductos, deleteProductosById }