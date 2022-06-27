export class AdminDashMenu {
  iconClass?: string;
  navTo?: string;

  static getMenuAdminItems() {
    return [
      {
        iconClass: "subscriptions",
        // title: "Home",
        navTo: "myevents/summary/subscription",
        tooltip: "subscription",
        isActive: false,
      },
      {
        iconClass: "event_seat",
        // title: "Event",
        navTo: "myevents/summary/batches",
        tooltip: "Batches",
        isActive: false,
      },
      {
        iconClass: "extension",
        // title: "Onboard",
        navTo: "myevents/summary/coupans",
        tooltip: "Coupons",
        isActive: false,
      },
    ];
  }
}
