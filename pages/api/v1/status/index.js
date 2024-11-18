function status(request, response) {
  response.status(200).json({ chave: "acesso joinha" });
}

export default status;
