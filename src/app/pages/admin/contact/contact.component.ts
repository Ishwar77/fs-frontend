import { Component, ChangeDetectorRef,  OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { ContactService } from 'src/app/services/contact';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';

export interface ContactDataManage {
  si: any;
  name: any;
  email: any;
  mobile: any;
  subject: any;
  message: any;
  action: any;
}

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  showMsg: boolean = false;
  mailText: string = "";

  userLoggedIn = false;
  dialoguedata;
  menus: any = [];
  dataSource: any;
  displayedColumns: string[] = ["si", "name", "email", "mobile", "subject", "message", "action"];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private cdref: ChangeDetectorRef,
    private contactservice: ContactService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.enquiry();
  }

  enquiry() {
    this.contactservice.getcontactAction().subscribe((res) => {

      if (res["metaData"] && res["metaData"].length) {
        this.menus = res["metaData"];
        this.dataSource = new MatTableDataSource<ContactDataManage>(this.menus);
        this.buildPagination();
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.SUCCESS;
      } else {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
      }
      this.cdref.markForCheck();
    },
      (err) => {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
        this.cdref.markForCheck();
      }
    );
  }

  email(menu) {
    this.mailText = `mailto:${menu.email}?subject=FIT SOCIALS:Answer for the Query&body=Hello ${menu.full_name},%0A %0A
  (write your Answer here)%0A %0A %0A Thank you %0A FIT SOCIALS %0A MANGALORE`;
    window.location.href = this.mailText;
  }

  private buildPagination(pageIndex = 0, pageLength = 5) {
    let dataFrom = pageIndex * pageLength;
    let dataTo = pageLength * (pageIndex + 1);

    if (dataFrom > this.menus.length) {
      dataFrom = 0;
    }
    if (dataTo > this.menus.length) {
      dataTo = this.menus.length;
    }

    this.dataSource = new MatTableDataSource(
      this.menus.slice(dataFrom, dataTo)
    );

    this.dataSource.paginator = this.paginator;
    this.cdref.markForCheck();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  managePagination(paginationEvent) {
    this.buildPagination(paginationEvent.pageIndex, paginationEvent.pageSize);
    this.cdref.markForCheck();
  }

  delete(data) {
    this.contactservice.deletecontact(data.contact_id).subscribe((res) => {
      this.enquiry();
      this.cdref.markForCheck();
      this.snackbar.open("Deleted successfully", "", {
        duration: 3000,
        verticalPosition: "top",
        panelClass: ["sucess-snackbar"],
      });
    }, err => {
      this.snackbar.open("Cannot Delete", "", {
        duration: 3000,
        verticalPosition: "top",
        panelClass: ["error-snackbar"],
      });
    });
  }
}
