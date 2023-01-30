
export const URL_PROD= {
  baseUrl: 'https://api.simoway.com/v1/',
  baseUrlFiles: 'https://api.simoway.com/uploads/',
  baseUrlPdfs: 'https://api.simoway.com/pdfs/',
};
export const URL_PROD_TEST = {
  baseUrl: 'https://prod-test-api.simoway.com/v1/',
  baseUrlFiles: 'https://prod-test-api.simoway.com/uploads/',
  baseUrlPdfs: 'https://prod-test-api.simoway.com/pdfs/',
};
export const URL_DEV = {
  baseUrl: 'https://dev-test-api.simoway.com/v1/',
  baseUrlFiles: 'https://dev-test-api.simoway.com/uploads/',
  baseUrlPdfs: 'https://dev-test-api.simoway.com/pdfs/',
};


export const URL_LOCAL = {
  baseUrl: 'http://localhost:5000/api/v1/',
  baseUrlFiles: 'http://localhost:5000/uploads/',
  baseUrlPdfs: 'http://localhost:5000/pdfs/',
};

export let PLATFORM =  window.location.href.includes('seller.simoway.com')? `Seller` : window.location.href.includes('operator.simoway.com')? `Operator` :   window.location.href.includes('admin.simoway.com')?`Admin` : 'Admin' ;
export let URL_API =  window.location.href.includes('dev-test')? URL_DEV : window.location.href.includes('prod-test')? URL_PROD_TEST : window.location.href.includes('localhost')? URL_LOCAL : URL_PROD ;
export let ENV_APP = window.location.href.includes('dev-test')? 'dev-test' : window.location.href.includes('prod-test')? 'prod-test' : window.location.href.includes('localhost')? 'local' : '' ;
export const PREFIX = "https://";
export const BASE_URL = "simoway.com/";
