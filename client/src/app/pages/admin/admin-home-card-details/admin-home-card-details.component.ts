import {Component, OnInit, ViewChild} from '@angular/core';
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {HomeCard} from "../../../shared/models/home-card.model";
import {UploadUtils} from "../../../shared/utils/upload.utils";
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";

@Component({
  selector: 'app-admin-home-card-details',
  templateUrl: './admin-home-card-details.component.html',
  styleUrls: ['./admin-home-card-details.component.scss']
})
export class AdminHomeCardDetailsComponent implements OnInit {
  actions: AppbarAction[] = [];
  homeCardId: string;
  homeCardForm: FormGroup;
  status: string = '';
  @ViewChild('formRef') formRef: FormGroupDirective;

  private submitAction: AppbarAction = {
    id: "0",
    name: "Salva modifiche",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.formRef.onSubmit(undefined)
  }


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private api: ApiService,
              private matUtils: MatUtilsService,
              private router: Router) {

    this.homeCardForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.homeCardId = params.id;
        this.api.getHomeCard(params.id).subscribe(data => {
          const homeCard = new HomeCard(data);
          this.homeCardForm.get('title').setValue(homeCard.title);
          this.homeCardForm.get('description').setValue(homeCard.description);
          this.actions.push(this.submitAction);
        });
      }
    });
  }


  modifyHomeCard() {
    if (!this.homeCardForm.valid) {
      return;
    }

    this.status = 'loading';
    this.api.editHomeCard(this.homeCardId, UploadUtils.toFormData(this.homeCardForm.value)).subscribe(() => {
      this.status = '';
      this.router.navigate(['/admin/home-customize']).then(() => {
        this.matUtils.createSnackBar('Home card modificata!');
      })
    }, error => {
      this.status = error;
    });
  }
}
