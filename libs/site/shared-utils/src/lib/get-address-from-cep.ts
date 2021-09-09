export default async function getAddressFromCEP(cep: string) {
  let cleanCep = "";
  if (cep.length > 1) cleanCep = cep.replace(/\D/g, "");
  if (cleanCep.length === 8) {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();
    if (!data?.erro) {
      return {
        uf: data.uf,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
      };
    } else {
      throw new Error("CEP not found!");
    }
  }
  return null;
}
