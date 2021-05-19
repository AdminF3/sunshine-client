export const nullUUID = '00000000-0000-0000-0000-000000000000';

export function isNullUUID(uuid) {
  return !uuid || uuid === nullUUID;
}
