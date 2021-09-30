export interface RoleBadgeProps {
  role: string;
}

export function RoleBadge({role}: RoleBadgeProps) {
  return (
    <span className={`${role === "User" ? `bg-secondary-300 text-secondary-600` : `bg-primary-300 text-primary-600`} font-bold py-1 px-3 rounded-full text-xs`}>
    {role}
  </span>
  )
}
export default RoleBadge
