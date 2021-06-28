import API_ENDPOINT from '../globals/api-endpoint';

class RestoDbSource {
  static async listResto() {
    const response = await fetch(API_ENDPOINT.LIST_RESTO);
    const responseJson = await response.json();
    return responseJson;
  }

  static async searchResto(key) {
    const response = await fetch(API_ENDPOINT.SEARCH_RESTO(key));
    const responseJson = await response.json();
    return responseJson;
  }

  static async detailResto(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async inputReview(newJson) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(newJson),
    });
    return response.json();
  }
}

export default RestoDbSource;
