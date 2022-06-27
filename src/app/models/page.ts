export enum PageStatus {
  LOADING = 1,
  READY = 2,
}

export enum PageAction {
  SUCCESS = 1,
  FAILED = 2,
  INFO = 3
}

export class PageManager {
  message?: string;
  status?: PageStatus;
  action?: PageAction;

  constructor(
    message = "",
    status = PageStatus.LOADING,
    action = PageAction.SUCCESS
  ) {
    this.message = message;
    this.status = status;
    this.action = action;
  }
}
