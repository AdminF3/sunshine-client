import { isValid } from '../../../utils/entity';

const supportedEntityTypes = ['organization', 'user', 'asset'];

export function getDocumentsList(notificationsList, entitiesPerType, s) {
  const settings = { ignoreTargetTypes: [], ...s };
  const nodesMap = {};
  for (let i = 0; i < notificationsList.length; i++) {
    const node = notificationsList[i].node;
    if (settings.ignoreTargetTypes.indexOf(node.targetType) > -1) {
      continue;
    }

    const key = `${node.action}-${node.targetType}-${node.targetID}-${node.userID}`;
    const docName = node.action === 'accept_lear_application' ? node.old : node.new;
    const docUrl = node.action === 'accept_lear_application' ? `/user/${node.userID}/${node.old}` : `/${node.targetType}/${node.targetID}/${node.new}`;

    if (!(key in nodesMap)) {
      nodesMap[key] = {
        key,
        action: node.action,
        targetType: node.targetType,
        targetID: node.targetID,
        targetKey: node.targetKey,
        userID: node.userID,
        userKey: node.userKey,
        targetValid: true,
        documents: [],
        country: node.country,
        comment: node.comment,
        date: node.date
      };
      if (supportedEntityTypes.indexOf(node.targetType) > -1) {
        const e = (entitiesPerType[`${node.targetType}s`] || []).find(o => o._id === node.targetID);
        if (e) {
          nodesMap[key].targetValid = isValid(e.data);
        }
      }
    }
    nodesMap[key].documents.push({
      notificationID: node.ID,
      name: docName,
      url: docUrl,
    });
  }

  return Object.values(nodesMap);
}
