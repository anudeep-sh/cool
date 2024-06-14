import { imageAPI } from '../api/requests/Logo/logoAPI';

export const fetchAllImages = async () => {
  try {
    if (!localStorage.getItem('imagesObj')) {
      const imagesObj = await imageAPI.getAllImages();
      localStorage.setItem('imagesObj', JSON.stringify(imagesObj.data));
    }
  } catch (err) {
    localStorage.setItem('imagesObj', {});
    console.log(err?.message);
  }
};
