import { NotificationIcon, CloseIcon } from "@iustitia/site/shared-components";

export interface NavNotificationProps {
  setNotificationOpen(notificationOpen: boolean): void;
  notificationOpen: boolean;
}

export function NavNotification({
  setNotificationOpen,
  notificationOpen,
}: NavNotificationProps) {
  return (
    <section
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-xl sm:max-w-md focus:outline-none ${
        notificationOpen ? `` : `hidden`
      }`}
    >
      <div className="absolute left-0 p-2 transform -translate-x-full bg-white">
        <button
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="p-2 text-black rounded-md focus:outline-none focus:ring"
        >
          <CloseIcon styles="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col h-screen">
        <div className="flex space-x-2 bg-primary-500 text-white items-center justify-center h-14 border-b">
          <NotificationIcon styles="w-5 h-5" />
          <h2 className="text-xl font-medium">Notificações</h2>
        </div>
      </div>
    </section>
  );
}

export default NavNotification;
