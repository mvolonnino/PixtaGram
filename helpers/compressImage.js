import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const compressImage = async (uri, format = SaveFormat.JPEG) => {
  const manipulateImage = await manipulateAsync(
    uri,
    [{ resize: { width: 500, height: 500 } }],
    { compress: 0.9, format }
  );

  const result = await fetch(manipulateImage.uri);
  const blob = await result.blob();

  return blob;
};

export default compressImage;
