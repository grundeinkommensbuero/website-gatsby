import CONFIG from '../../../../aws-config';

export const useGetUserByEmail = async email => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/users?email=${email}`,
      request
    );

    if (response.status === 200) {
      const json = await response.json();

      return { state: 'success', user: json.users[0] };
    } else if (response.status === 404) {
      return { state: 'notFound' };
    } else {
      return { state: 'error' };
    }
  } catch (error) {
    return { state: 'error' };
  }
};
