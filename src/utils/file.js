import { SERVER as backendURL } from '../constants/endpoints';

export function entityFileURL(entity, filename) {
  const { ID, type } = entity;

  return `${backendURL}/${type}/${ID}/${filename}`;
}
