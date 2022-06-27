import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export enum ContextDataItem {
  LOGGEDIN = "loggedIn",
  USER_ID = "userId",
  TRAINER_ID = "trainerId",
  USER_ROLE = "userRole",
  USER_NAME = "username",
  USER_MAIL = "usermail",
  EVENT_ID = "eventId",
  EVENT_NAME = "eventname",
  IMAGE_URL = "image",
  AMOUNT = "amount",
  SUBSCRIPTION_ID = "subscriptionId",
  TOKEN_KEY = "tokenKey",
  TOKEN_VALUE = "tokenValue",
  REDIRECT_URL = "redirectUrl",
  SHOWBATCHES = "showbatches",
  UUID = "uuid",
  RAZORKEY = "razorkey",
  EventUUID = "eventuuid",
  SUBUUID = "subuuid",
  BMISTATUS = "bmistatus",
  IP = "ip"
}

export enum ContextEvents {
  CONTEXT_INIT = 1,
  VALUDE_CHANGED = 2,
  CONTEXT_DESTROYED = 3,
}

export interface ContextActionListencer {
  event: ContextEvents;
  data: any;
}

/**
 * ApplicationContext is an Injectable service, at Root level.
 * This is used to store globally used data.
 * Also supports subscription service, to listen for any changes in them
 *
 * To use, one must be define this, as a dependency in the host constructor
 *
 * Keys:
 * #### loggedIn: boolean
 * #### sessionId: number
 * #### searchText: string
 * #### searchCategory: string
 */

@Injectable({ providedIn: "root" })
export class ApplicationContext {
  private static data: any = { loggedIn: false };

  public listener: Subject<ContextActionListencer> = new Subject<ContextActionListencer>();

  private static getWindowSession(): any {
    const appData = window.localStorage.getItem('appData') || '{\"loggedIn\": false}';

    try {
        return JSON.parse(appData);
      } catch (e) {
        return { loggedIn: false };
      }

    // const cookies = document.cookie;
    // let x = null;

    // if (cookies.indexOf(";")) {
    //   const cookieList = cookies.split(";");
    //   x = cookieList[cookieList.length - 1];
    // } else {
    //   x = cookies;
    // }

    // if (!x) {
    //   return { loggedIn: false };
    // }

    // try {
    //   return JSON.parse(x);
    // } catch (e) {
    //   document.cookie = null;
    //   return { loggedIn: false };
    // }
  }

  private static persistSession() {
    if (!ApplicationContext.data) {
      return;
    }
    // window.sessionStorage.setItem(this.browserSessionVariable, JSON.stringify(ApplicationContext.data));
    const oldCookieData = this.getWindowSession();
    const newCookie = { ...oldCookieData, ...ApplicationContext.data };
    // document.cookie = JSON.stringify(newCookie);
    window.localStorage.setItem('appData', JSON.stringify(newCookie));
    ApplicationContext.data = { ...newCookie };
  }

  public static initApplicatioContext(applicationContext?: {
    key?: any;
    value?: any;
  }) {
    if (!applicationContext) {
      // ApplicationContext.data = new Map();
      ApplicationContext.data = ApplicationContext.getWindowSession();
    } else {
      ApplicationContext.data = applicationContext;
    }
    ApplicationContext.persistSession();
  }

  public getData(key: ContextDataItem) {
    if (!key) {
      return null;
    }

    if (!ApplicationContext.data) {
      ApplicationContext.data = { ...ApplicationContext.getWindowSession() };
    }
    return ApplicationContext.data[key] || null;
  }

  public setData(key: ContextDataItem, value) {
    if (!key) {
      return null;
    }

    if (!ApplicationContext.data) {
      ApplicationContext.data = { ...ApplicationContext.getWindowSession() };
    }

    ApplicationContext.data[key] = value;
    this.notify(ContextEvents.VALUDE_CHANGED, key, value);

    ApplicationContext.persistSession();
  }

  /**
   * Utility method to send updates to listeners
   * @param event ContextEvents
   * @param dataKey any
   * @param dataValue any
   */
  private notify(event: ContextEvents, dataKey?: any, dataValue?: any) {
    if (!this.listener || !event) {
      return;
    }

    this.listener.next({
      event: event,
      data:
        !dataKey && !dataValue
          ? ApplicationContext.data
          : { key: dataKey, value: dataValue },
    });
    return;
  }

  public destroySession() {
    // window.sessionStorage.removeItem(this.getData(th));
    // document.cookie = null;
    window.localStorage.removeItem('appData');
    this.notify(ContextEvents.CONTEXT_DESTROYED);
  }

  /** Returns Only Numbers Function */
  onlyNumberKey(event) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  onlyPositiveNumbers(event) {
    if (event && event.target) {
      event.target.value === '' ? event.target.value = '' : event.target.value < 0 ?
        event.target.value = event.target.value * -1 : false;
    }
  }
}
