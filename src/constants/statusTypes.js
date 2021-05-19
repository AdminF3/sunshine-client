export const projectStatusTypes = (t) => [
  { value: '1', label: t('validStatus.planning') },
  { value: '2', label: t('validStatus.inProgress') },
  { value: '3', label: t('validStatus.finished') },
  { value: '4', label: t('validStatus.abandoned') },
];

export const transitionRequestStatus = {
  forReview: 'FOR_REVIEW',
  accepted: 'ACCEPTED',
  rejected: 'REJECTED',
  requestForChanges: 'REQUEST_FOR_CHANGES',
};

export const validStatus = 2;
