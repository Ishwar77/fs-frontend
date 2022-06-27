import { ApplicationContext, ContextDataItem } from '../../../util/context/applicationContext';
import { TrainerService } from 'src/app/services/trainer';
import { PageManager, PageStatus, PageAction } from '../../../models/page';
import { Component, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: "app-trainer-onboarding-component",
  templateUrl: "./component.html",
  styleUrls: ["./component.scss"],
})
export class AppTrainerOnboardingComponent implements AfterViewInit {
  private sampleFilePath = 'assets/onboarding/FS-Client-Onboarding-v2.xlsx';
  pageManager: PageManager = new PageManager(null, PageStatus.READY, PageAction.INFO);
  menus: any = [];

  pass = [];
  fail = [];
  private acceptedFileTypes = ['.csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

  selectedFile;

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private trainerService: TrainerService,
    private context: ApplicationContext,
    private route: Router
  ) { }

  ngAfterViewInit() {
    if (this.context.getData(ContextDataItem.USER_ROLE) !== 6) {
      this.route.navigate([`home`]);
      return;
    }
    this.initActions();
    this.cdRef.detectChanges();
  }

  private initActions() {
    this.pageManager.message = 'Upload the Client data file, in the predefined format';
    this.selectedFile = null;
    this.pass = [];
    this.fail = [];
    this.cdRef.markForCheck();
  }

  public downloadSample() {
    this.pageManager.message = 'Downloading the sample data file';
    window.open(this.sampleFilePath, '__blank');
    this.cdRef.markForCheck();
  }

  public refresh() {
    this.pageManager = new PageManager('Upload Client data', PageStatus.READY, PageAction.INFO);
    this.initActions();
    this.cdRef.markForCheck();
  }

  public triggerFileUploader() {
    this.pageManager.message = 'Choose the Data File, with basic client data';
    this.cdRef.markForCheck();

    this.fileInput.nativeElement.click();

  }

  public fileSelectionChange(event) {
    if (!event) {
      return;
    }

    const files = event.target.files || null;
    if (!files || !files.length) {
      return;
    }
    this.selectedFile = files[0];

    if (this.acceptedFileTypes.indexOf(this.selectedFile.type) < 0) {
      this.selectedFile = null;
      this.pageManager.message = 'Selected an Excel or CSV file with valid Client Data';
      this.pageManager.status = PageStatus.READY;
      this.pageManager.action = PageAction.FAILED;
      return;
    }

    this.pageManager.message = 'Selected File = ' + this.selectedFile.name;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.uploadClientFile(formData);
  }

  private uploadClientFile(formData) {
    this.pageManager.message = 'Onboarding in Progress';
    this.pageManager.status = PageStatus.LOADING;

    const trainerId = this.context.getData(ContextDataItem.USER_ID);
    this.trainerService.onboardClients(trainerId, formData).pipe(debounceTime(200)).subscribe(res => {

      this.pass = res.metaData['passed'];
      this.fail = res.metaData['failed'] || [...res.metaData['passed']];

      this.pageManager.message = `Creation of User Profiles Success,
       Pass = ${this.pass.length}, Failed = ${this.fail.length}, Update the available seats manually`;
      this.pageManager.status = PageStatus.READY;
      this.pageManager.action = PageAction.SUCCESS;

      // Now map the clients to Events and insert into Registration
      // TODO

    }, err => {
      this.pageManager.message = `Unable to onboard data, ${err.error.message || null} `;
      this.pageManager.status = PageStatus.READY;
      this.pageManager.action = PageAction.FAILED;
    });
  }
}
