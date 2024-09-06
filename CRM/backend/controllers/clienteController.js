const Cliente = require("../models/cliente");

// Função para buscar todos os clientes
exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
};

// Função para criar um novo cliente
exports.createCliente = async (req, res) => {
  const { cpfCnpj, codigo, nomeRazaoSocial, email, telefone, relacionamento } =
    req.body;

  const novoCliente = new Cliente({
    cpfCnpj,
    codigo,
    nomeRazaoSocial,
    email,
    telefone,
    relacionamento,
  });

  try {
    const cliente = await novoCliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    if (err.code === 11000) {
      // Erro de duplicação
      res.status(400).json({ error: "cpf/CNPJ ou Código já existente" });
    } else {
      res.status(500).json({ error: "Erro ao criar cliente" });
    }
  }
};

// Função para buscar um cliente pelo ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente)
      return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar cliente" });
  }
};

// Função para atualizar um cliente
exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cliente)
      return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(cliente);
  } catch (err) {
    if (err.code === 11000) {
      // Erro de duplicação
      res.status(400).json({ error: "cpf/CNPJ ou Código já existente" });
    } else {
      res.status(500).json({ error: "Erro ao atualizar cliente" });
    }
  }
};

// Função para deletar um cliente
exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente)
      return res.status(404).json({ error: "Cliente não encontrado" });
    res.json({ message: "Cliente deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar cliente" });
  }
};