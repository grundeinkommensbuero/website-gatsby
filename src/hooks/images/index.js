import { useState } from 'react';
import CONFIG from '../../../aws-config';

export const useUploadImage = () => {
  const [state, setState] = useState({});
  return [state, (userId, image) => uploadImage(userId, image, setState)];
};

const uploadImage = async (userId, image, setState) => {
  try {
    setState({ state: 'loading' });
    const contentType = image.type;
    console.log('content type & size', contentType, image.size);

    const uploadUrl = await requestPreSignedUrl(userId, contentType);

    console.log('upload url', uploadUrl);

    const result = await uploadToS3(uploadUrl, image, contentType);

    console.log('upload result', result);
  } catch (error) {
    console.log('Error', error);
    setState({ state: 'error' });
  }
};

const requestPreSignedUrl = async (userId, contentType) => {
  const request = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      contentType,
    }),
  };

  const response = await fetch(
    `${CONFIG.API.INVOKE_URL}/images/upload-url`,
    request
  );

  if (response.status === 201) {
    const { uploadUrl } = await response.json();
    return uploadUrl;
  } else {
    throw new Error(`Api response was ${response.status}`);
  }
};

const uploadToS3 = async (uploadUrl, image, contentType) => {
  const params = {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: image,
  };

  return fetch(uploadUrl, params);
};
