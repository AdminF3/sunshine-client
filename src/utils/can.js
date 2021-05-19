import {
  hasCountryRole,
  retrieveOrganizationRole,
  hasOrganizationRole,
  hasProjectRole,
} from './userRoles';
import { validStatus } from '../constants/statusTypes';

export function approveEntity(user, entity) {
  if (!user || !entity?.data) {
    return false;
  }

  if (isSuperuser(user)) {
    return true;
  }

  if (hasCountryRole(user.profileInfo?.data, { role: 'country_admin', country: entity.data.country })) {
    return true;
  }

  return false;
}

export function requestOrgMembership(user, org) {
  if (!user?.profileInfo?._id) {
    return false;
  }
  if (isSuperuser(user)) {
    return true;
  }
  if (hasCountryRole(user.profileInfo?.data, { role: 'country_admin', country: org.data?.country })) {
    return true;
  }
  return retrieveOrganizationRole(user.isAuthenticated, org) === 'unsigned';
}

export function canEditOrganization(user, org) {
  if (!user) {
    return false;
  }

  if (isSuperuser(user)) {
    return true;
  }

  return hasOrganizationRole(user.profileInfo?._id, org, 'lear', 'leaas');
}

export function canViewOrganization(user, org) {
  if (!user) {
    return false;
  }

  if (isSuperuser(user)) {
    return true;
  }

  if (hasCountryRole(user.profileInfo?.data, { role: 'country_admin', country: org.data?.country })) {
    return true;
  }

  return retrieveOrganizationRole(user.isAuthenticated, org) !== 'unsigned';
}

export function canViewPublicProjects(user) {
  if (!user) {
    return false;
  }

  if (user.isSuperUser) {
    return true;
  }

  return hasCountryRole(user.profileInfo?.data, { role: 'country_admin' }, { role: 'fund_manager' });
}

export function access(user, permission) {
  if (!permission) {
    return true;
  }

  if (permission === 'loggedin') {
    return Boolean(user?.isAuthenticated);
  }

  if (permission === 'admin') {
    return Boolean(user?.isSuperUser) || user?.profileInfo?.data.platform_manager;
  }

  if (typeof permission === 'object') {
    if (permission.admin && (user?.isSuperUser || user?.profileInfo?.data?.platform_manager)) {
      return true;
    }

    const keys = Object.keys(permission);

    for (const i in keys) {
      const k = keys[i];
      if (k === 'countryRole') {
        const roles = permission[k].map(r => ({ role: r }));
        if (hasCountryRole(user.profileInfo?.data, ...roles)) {
          return true;
        }
      }
    }
  }

  return false;
}

export function canFinish(fields, requiredFields) {
  return Boolean(Object.entries(fields).find(e => {
    return requiredFields.find(f => e[0] === f && e[1].length === 0);
  }));
}

export function canAssignAdminNWManager(user) {
  return user?.isSuperUser || user?.profileInfo?.data?.platform_manager;
}

export function canAccessRoute(user, path) {
  if (!user) {
    return false;
  }
  if (path.indexOf('/admin') !== 0) {
    return true;
  }
  if (isSuperuser(user)) {
    return true;
  }
  if (hasCountryRole(user.profileInfo?.data, { role: 'country_admin' })) {
    return true;
  }
  return false;
}

export function canCompleteMilestone(userIsSuperUser, userIsLogged, singleProject) {
  return Boolean(userIsSuperUser || hasProjectRole(userIsLogged, singleProject, 'pm'));
}

const allowedEditProjectRoles = ['pm', 'plsign', 'tama'];
export function canEditProject(project, user) {
  if (!user || !user.profileInfo) {
    return false;
  }

  if (isSuperuser(user)) {
    return true;
  }

  if (hasProjectRole(user.profileInfo._id, project, ...allowedEditProjectRoles)) {
    return true;
  }

  const owner = project.dependencies?.[project.data?.owner];
  if (!owner) {
    return false;
  }

  return hasOrganizationRole(user.profileInfo._id, owner, 'lear');
}

export function canAssignProjectRoles(user, project) {
  if (!user || !user.profileInfo) {
    return false;
  }

  if (isSuperuser(user)) {
    return true;
  }

  if (hasProjectRole(user.profileInfo._id, project, 'pm')) {
    return true;
  }

  if (hasCountryRole(user.profileInfo?.data, { role: 'portfolio_director', country: project?.data?.country })) {
    return true;
  }

  return false;
}

export function canReviewFA(user) {
  if (!user) {
    return false;
  }
  if (isSuperuser(user)) {
    return true;
  }
  return hasCountryRole(user.profileInfo?.data, { role: 'fund_manager' }, { role: 'portfolio_director' });
}

export function canUploadFiles(user, entity) {
  if (!user || !entity) {
    return false;
  }
  if (isSuperuser(user)) {
    return true;
  }
  if (entity.type === 'organization') {
    return hasOrganizationRole(user.profileInfo.data.ID, entity, 'lear', 'leaas', 'lsigns');
  }
  if (entity.type === 'asset') {
    return hasOrganizationRole(user.profileInfo.data.ID, entity.data?.owner, 'lear', 'leaas', 'lsigns', 'members')
        || hasOrganizationRole(user.profileInfo.data.ID, entity.data?.esco, 'lear', 'leaas', 'lsigns', 'members');
  }

  return false;
}

export function canDeleteFiles(user, entity) {
  if (!user) {
    return false;
  }
  if (isSuperuser(user)) {
    return true;
  }
  return entity.data.valid !== validStatus;
}

export function isMilestoneEnabled(project, milestone, milestones, phase) {
  const currentMilestone = project.data.milestone.toUpperCase();

  if (phase) {
    return true;
  }

  // NOTE (@edimov): If phase is set to `false` - the project has not
  // reached the phase yet. If `undefined` - the request
  // is referring a mileston from Acquisition Phase.
  if (phase === false) {
    const unlocksOn = Array.isArray(milestone.unlocksOn) ? milestone.unlocksOn : [milestone.unlocksOn];

    return unlocksOn.indexOf(currentMilestone) > -1;
  }

  if (currentMilestone === 'COMMISSIONING') {
    return true;
  }

  let currMilestoneIDX = -1;
  let targetMilestoneIDX = 0;
  for (let i = 0; i < milestones.length; i++) {
    if (milestones[i].milestoneEnum === currentMilestone) {
      currMilestoneIDX = i;
    }
    if (milestones[i].milestoneEnum === milestone.milestoneEnum) {
      targetMilestoneIDX = i;
    }
  }

  if (
    currMilestoneIDX !== -1 &&
    milestones[currMilestoneIDX]?.milestoneEnum === milestones[targetMilestoneIDX].unlocksOn
  ) {
    return true;
  }

  return currMilestoneIDX + 1 >= targetMilestoneIDX;
}

export function canEditEntity(user, entity) {
  if (!user?.profileInfo?.data || !entity?.data) {
    return false;
  }
  if (isSuperuser(user)) {
    return true;
  }

  if (hasCountryRole(user.profileInfo.data, { role: 'country_admin', country: entity.data.country })) {
    return true;
  }

  if (entity.type === 'organization') {
    return hasOrganizationRole(user.profileInfo.data.ID, entity, 'lear', 'leaas', 'lsigns', 'members');
  }

  if (entity.type === 'asset') {
    return canEditEntity(user, entity.data.owner);
  }

  return false;
}

export function canViewAssetPrivateInfo(user, asset) {
  if (!user) {
    return false;
  }
  if (isSuperuser(user)) {
    return true;
  }
  if (hasCountryRole(user.profileInfo?.data, { role: 'country_admin', country: asset.data.country })) {
    return true;
  }
  if (hasOrganizationRole(user.profileInfo?._id, asset.data.owner)) {
    return true;
  }
  if (hasOrganizationRole(user.profileInfo?._id, asset.data.esco)) {
    return true;
  }

  return false;
}

export function isSuperuser(user) {
  if (!user) {
    return false;
  }
  return user.isSuperUser || user.profileInfo?.data?.platform_manager || user.profileInfo?.data?.admin_network_manager;
}

export function canCompleteFP(forfaitingPaymentData, requiredUpload) {
  if (requiredUpload.length <= 0) {
    return false;
  }
  if (!forfaitingPaymentData?.TransferValue) {
    return false;
  }
  if (!forfaitingPaymentData?.Currency) {
    return false;
  }
  if (!forfaitingPaymentData?.TransferDate) {
    return false;
  }

  return true;
}

export function shouldInvalidateOrg(organization, stateData, user) {
  if (!organization?.data) {
    return false;
  }
  if (isSuperuser(user)) {
    return false;
  }

  return organization.data.name !== stateData.orgName ||
    organization.data.address !== stateData.address ||
    organization.data.vat !== stateData.vat ||
    organization.data.legal_form !== parseInt(stateData.legal_form, 10) ||
    organization.data.registration_number !== stateData.registration_number;
}

export function canSendGDPR(data) {
  return data.requesterName &&
    data.requesterAddress &&
    data.requesterPhone &&
    data.requesterEmail &&
    data.reason &&
    data.information &&
    data.confirm &&
    data.files.length > 0;
}

export function canCommentMilestone({ user, project, milestone, milestones, phase }) {
  if (!isMilestoneEnabled(project, milestone, milestones, phase)) {
    return false;
  }

  return hasCountryRole(
    user.profileInfo?.data,
    { role: 'country_admin', country: project.data?.country },
    { role: 'fund_manager', country: project.data?.country },
  );
}
