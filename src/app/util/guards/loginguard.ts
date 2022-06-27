import { Injectable } from "@angular/core";
import {
  ApplicationContext,
  ContextDataItem,
} from "../context/applicationContext";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class LoginGuard {
  constructor(private context: ApplicationContext, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const loggedIn = this.context.getData(ContextDataItem.LOGGEDIN) || false;
    const userRole = this.context.getData(ContextDataItem.USER_ROLE) || false;
    try {
      if (loggedIn && userRole == 1) {
        return true;
      } else {
        this.route.navigate([`home`]);
        return false;
      }
    } catch (e) {
      this.route.navigate([`home`]);
      return false;
    }
  }
}
