export class AdminDashMenu {
  iconClass?: string;
  title?: string;
  navTo?: string;

  static getMenuAdminItems() {
    return [
      {
        iconClass: "supervised_user_circle",
        title: "Home",
        navTo: "admin/open",
        isActive: false,
      },
      {
        iconClass: "supervised_user_circle",
        title: "Users",
        navTo: "admin/user-manage",
        isActive: false,
      },
      {
        iconClass: "supervised_user_circle",
        title: "Trainers",
        navTo: "admin/trainer-manage",
        isActive: false,
      },
      {
        iconClass: "payment",
        title: "Events",
        navTo: "admin/event-manage",
        isActive: false,
      },
      {
        iconClass: "payment",
        title: "Payments",
        navTo: "admin/payment",
        isActive: false,
      },
      {
        iconClass: "payment",
        title: "Advertise",
        navTo: "admin/advertise-manage",
        isActive: false,
      },
      {
        iconClass: "question_answer",
        title: "Query",
        navTo: "admin/enquiry",
        isActive: false
      },
      {
        iconClass: "payment",
        title: "My Profile",
        navTo: "admin/profile",
        isActive: false,
      },
      {
        iconClass: "contactless",
        title: "Session",
        navTo: "admin/session",
        isActive: false,
      },
    ];
  }
}
