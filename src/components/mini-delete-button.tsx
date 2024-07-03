import { CloseCircleOutlined } from "@ant-design/icons";

export function MiniDeleteButton({ onClick, icon = <CloseCircleOutlined /> }: { onClick: () => void, icon?: React.ReactNode }) {
  return (
    <div className="cursor-pointer p-3 flex justify-center items-center hover:text-[#ff4d4f]"
      onClick={onClick}>
      {icon}
    </div>
  )
}