import axiosInstance from './axios';

export function getFileNameFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1].split('?')[0];
}

export async function uploadFile(file: File): Promise<{ url: string; type: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post('/v1/files/upload', formData);
  const url = response.data.url;
  const type = file.type.startsWith('image')
    ? 'image'
    : file.type.startsWith('video')
      ? 'video'
      : 'file';
  return { url, type };
}

export async function deleteFileFromS3(url: string): Promise<void> {
  const fileName = getFileNameFromUrl(url);
  await axiosInstance.delete(`/v1/files/${fileName}`);
}
