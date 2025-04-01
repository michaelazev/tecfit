// controllers/dataController.js
const sql = require('mssql');

exports.getAllData = async (req, res) => {
  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .query('SELECT * FROM DataItems');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ message: 'Erro ao buscar dados.' });
  } finally {
    sql.close();
  }
};

exports.getDataById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('ItemID', sql.Int, itemId)
      .query('SELECT * FROM DataItems WHERE ItemID = @ItemID');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Item não encontrado.' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Erro ao buscar item:', err);
    res.status(500).json({ message: 'Erro ao buscar item.' });
  } finally {
    sql.close();
  }
};

exports.createData = async (req, res) => {
  const { name, description } = req.body;
  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('Name', sql.VarChar, name)
      .input('Description', sql.VarChar, description)
      .query('INSERT INTO DataItems (Name, Description) VALUES (@Name, @Description); SELECT SCOPE_IDENTITY() AS ItemID;');
    res.status(201).json({ message: 'Item criado com sucesso!', itemId: result.recordset[0].ItemID });
  } catch (err) {
    console.error('Erro ao criar item:', err);
    res.status(500).json({ message: 'Erro ao criar item.' });
  } finally {
    sql.close();
  }
};

exports.updateData = async (req, res) => {
  const itemId = req.params.id;
  const { name, description } = req.body;
  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('ItemID', sql.Int, itemId)
      .input('Name', sql.VarChar, name)
      .input('Description', sql.VarChar, description)
      .query('UPDATE DataItems SET Name = @Name, Description = @Description, UpdatedAt = GETDATE() WHERE ItemID = @ItemID');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Item não encontrado.' });
    }

    res.json({ message: 'Item atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar item:', err);
    res.status(500).json({ message: 'Erro ao atualizar item.' });
  } finally {
    sql.close();
  }
};

exports.deleteData = async (req, res) => {
  const itemId = req.params.id;
  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('ItemID', sql.Int, itemId)
      .query('DELETE FROM DataItems WHERE ItemID = @ItemID');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Item não encontrado.' });
    }

    res.json({ message: 'Item deletado com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar item:', err);
    res.status(500).json({ message: 'Erro ao deletar item.' });
  } finally {
    sql.close();
  }
};