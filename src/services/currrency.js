import serverCall from "../serverCall"

const GetCurrencyFetch = async () => {
  try {
    const response  = await serverCall.get('v6/6832bf67beb2fc8029200f77/latest/USD');
    return response;
  } catch (error) {
    throw error
  }
}

const currencyService = {
  GetCurrencyFetch
}

export default currencyService