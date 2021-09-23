const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesModel.getById(id);
  if (!sales) return WRONG_ID_FORMAT(res);
  return res.status(200).json(sales);
};