export class AdminDashMenu {
  iconClass?: string;
  title?: string;
  navTo?: string;

  static getMenuAdminItems() {
    return [
      {
        // iconClass: "supervised_user_circle",
        title: "Home",
        navTo: "user/main",
        isActive: false,
      },

      {
        // iconClass: "payment",
        title: "My Events",
        navTo: "user/myevents",
        isActive: false,
      },
      {
        // iconClass: "payment",
        title: "My Payments",
        navTo: "user/payment-history",
        isActive: false,
      },
      // {
      //   // iconClass: "payment",
      //   title: "Referals",
      //   navTo: "user/profile",
      //   isActive: false,
      // },
      {
        // iconClass: "payment",
        title: "My Profile",
        navTo: "user/profile",
        isActive: false,
      },
      {
        // iconClass: "payment",
        title: "Rewards",
        navTo: "user/rewards",
        isActive: false,
      },
      // {
      //   iconClass: "payment",
      //   title: "Manage Payment",
      //   navTo: "trainer/payment-manage",
      //   isActive: false,
      // },
      // {
      //   iconClass: "payment",
      //   title: "Subcription Manage",
      //   navTo: "admin/subscription-manage",
      //   isActive: false
      // },
      //  {
      //   iconClass: "payment",
      //   title: "coupan Manage",
      //   navTo: "admin/coupan-manage",
      //   isActive: false
      // },
    ];
  }
}
