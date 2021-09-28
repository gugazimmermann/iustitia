export interface ActiveBadgeProps {
  status: boolean;
}

export function ActiveBadge({status}: ActiveBadgeProps) {
  return (
    <span className={`${status ? `bg-green-300 text-green-600` : `bg-gray-300 text-gray-600`} font-bold py-1 px-3 rounded-full text-xs`}>
    {status ? `Ativo` : `Inativo`}
  </span>
  )
}
export default ActiveBadge
