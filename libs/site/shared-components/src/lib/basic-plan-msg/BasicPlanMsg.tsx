export interface BasicPlanMsgProps {
  message: string;
}

export function BasicPlanMsg({ message }: BasicPlanMsgProps) {
  return <div className="text-xs text-gray-400 text-right p-2">{message}</div>;
}

export default BasicPlanMsg;
