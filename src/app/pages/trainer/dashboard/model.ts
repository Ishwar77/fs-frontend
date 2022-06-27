export class AdminDashMenu {
  iconClass?: string;
  title?: string;
  navTo?: string;

  static getMenuAdminItems() {
    return [
      {
        iconClass: "supervised_user_circle",
        title: "Home",
        navTo: "trainer/open",
        isActive: false,
      },
      {
        iconClass: "payment",
        title: "Event",
        navTo: "trainer/event-manage",
        isActive: false,
      },
      {
        iconClass: "payment",
        title: "Onboard",
        navTo: "trainer/onboarding",
        isActive: false,
      },
      {
        iconClass: "payment",
        title: "My Profile",
        navTo: "trainer/profile",
        isActive: false,
      },
      // {
      //   iconClass: "payment",
      //   title: "Payment History",
      //   navTo: "trainer/payment-history",
      //   isActive: false,
      // },
      {
        iconClass: "rewards",
        title: "My Rewards",
        navTo: "trainer/rewards",
        isActive: false,
      }
    ];
  }
}
