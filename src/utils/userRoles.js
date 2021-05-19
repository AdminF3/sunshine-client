const organizationRolesOrder = [
  'lear',
  'leaas',
  'lsigns',
  'members'
];

const projectRolesOrder = [
  'plsign',
  'pm',
  'paco',
  'tama',
  'teme',
];

function retrieve(userID, roles, order) {
  const userRoles = [];
  const rolesAvaialable = Object.keys(roles);

  for (const orderIndex in order) {
    for (const roleIndex in rolesAvaialable) {
      const role = rolesAvaialable[roleIndex];

      if (role !== order[orderIndex]) {
        continue;
      }

      if ((Array.isArray(roles[role]) ? roles[role] : [roles[role]]).includes(userID)) {
        userRoles.push(role);
        break;
      }

      if (role === 'lear') {
        if (roles.lear._id === userID) {
          userRoles.push(role);
        }
        break;
      }
    }
  }

  if (userRoles.length === 0) {
    userRoles.push('unsigned');
  }

  return userRoles;
}

export function retrieveOrganizationRoles(userID, organization) {
  return retrieve(userID, organization.data.roles, organizationRolesOrder);
}

export function retrieveOrganizationRole(userID, organization) {
  const roles = retrieveOrganizationRoles(userID, organization);
  return roles[0];
}

export function hasOrganizationRole(userID, organization, ...roles) {
  if (!userID || !organization) {
    return false;
  }

  const or = retrieveOrganizationRoles(userID, organization);
  if (roles.length === 0) {
    return !or.every(r => r === 'unsigned');
  }
  return roles.some(r => or.includes(r));
}

export function retrieveProjectRoles(userID, project) {
  if (!userID || !project?.data?.roles) {
    return [];
  }
  return retrieve(userID, project.data.roles, projectRolesOrder);
}

export function retrieveProjectRole(userID, project) {
  const roles = retrieveProjectRoles(userID, project);
  return roles[0];
}

export function hasProjectRole(userID, project, ...roles) {
  const pr = retrieveProjectRoles(userID, project);
  return roles.some(r => pr.includes(r));
}

export function retrieveAssetRole(userID, asset) {
  const organizations = Object.values(asset.dependencies).filter(e => e.type === 'organization');
  if (organizations.length === 0) {
    return ['unsigned'];
  }
  return retrieveOrganizationRole(userID, organizations[0]);
}

export function hasCountryRole(user, ...roles) {
  if (!user || !Array.isArray(user.country_roles)) {
    return false;
  }

  return user.country_roles.some((r) => {
    return roles.some((role) => {
      return role.role === r.role && (!role.country || role.country === r.country);
    });
  });
}

export function getRoleCountries(user, role) {
  return user.data.country_roles.map(e => e.role === role ? e.country : null).filter(v => Boolean(v));
}

export function getEveryRoleEveryCountry(user) {
  const countriesWithRoles = {};

  user.data.country_roles.forEach(role => {
    if (countriesWithRoles.hasOwnProperty(role.country)) {
      countriesWithRoles[role.country].push(role.role);
    } else {
      countriesWithRoles[role.country] = [role.role];
    }
  });

  return countriesWithRoles;
}
