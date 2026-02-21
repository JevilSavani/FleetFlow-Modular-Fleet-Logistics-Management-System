export type UserRole = 'admin' | 'manager' | 'driver' | 'viewer';

export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
}

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    { resource: 'vehicles', action: 'create' },
    { resource: 'vehicles', action: 'read' },
    { resource: 'vehicles', action: 'update' },
    { resource: 'vehicles', action: 'delete' },
    { resource: 'drivers', action: 'create' },
    { resource: 'drivers', action: 'read' },
    { resource: 'drivers', action: 'update' },
    { resource: 'drivers', action: 'delete' },
    { resource: 'trips', action: 'create' },
    { resource: 'trips', action: 'read' },
    { resource: 'trips', action: 'update' },
    { resource: 'trips', action: 'delete' },
    { resource: 'expenses', action: 'create' },
    { resource: 'expenses', action: 'read' },
    { resource: 'expenses', action: 'update' },
    { resource: 'expenses', action: 'delete' },
    { resource: 'maintenance', action: 'create' },
    { resource: 'maintenance', action: 'read' },
    { resource: 'maintenance', action: 'update' },
    { resource: 'maintenance', action: 'delete' },
    { resource: 'analytics', action: 'read' },
  ],
  manager: [
    { resource: 'vehicles', action: 'read' },
    { resource: 'vehicles', action: 'update' },
    { resource: 'drivers', action: 'read' },
    { resource: 'drivers', action: 'update' },
    { resource: 'trips', action: 'create' },
    { resource: 'trips', action: 'read' },
    { resource: 'trips', action: 'update' },
    { resource: 'expenses', action: 'create' },
    { resource: 'expenses', action: 'read' },
    { resource: 'maintenance', action: 'create' },
    { resource: 'maintenance', action: 'read' },
    { resource: 'analytics', action: 'read' },
  ],
  driver: [
    { resource: 'vehicles', action: 'read' },
    { resource: 'drivers', action: 'read' },
    { resource: 'trips', action: 'read' },
    { resource: 'expenses', action: 'read' },
  ],
  viewer: [
    { resource: 'vehicles', action: 'read' },
    { resource: 'drivers', action: 'read' },
    { resource: 'trips', action: 'read' },
    { resource: 'analytics', action: 'read' },
  ],
};

export function hasPermission(role: UserRole, resource: string, action: string): boolean {
  const permissions = rolePermissions[role] || [];
  return permissions.some((p) => p.resource === resource && p.action === action);
}

export function canAccess(role: UserRole, resource: string): boolean {
  const permissions = rolePermissions[role] || [];
  return permissions.some((p) => p.resource === resource);
}

export function getPermissionsForRole(role: UserRole): Permission[] {
  return rolePermissions[role] || [];
}
