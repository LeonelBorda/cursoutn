var pool = require ('./bd');

async function getDeportivos () {  
        var query = 'select * from deportivos';
        var rows = await pool.query (query);
        return rows;   
}

async function deleteDeportivosById (id) {  
    var query = 'delete from deportivos where id = ?';
    var rows = await pool.query (query, [id]);
    return rows;   
}

module.exports = { getDeportivos, deleteDeportivosById }