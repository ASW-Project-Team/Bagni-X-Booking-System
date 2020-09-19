import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {Bathhouse} from "../../../shared/models/bathhouse.model";
import {UploadUtils} from "../../../shared/utils/upload.utils";
import {HomeCard} from "../../../shared/models/home-card.model";
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";

@Component({
  selector: 'app-admin-home-customize',
  templateUrl: './admin-home-customize.component.html',
  styleUrls: ['./admin-home-customize.component.scss']
})
export class AdminHomeCustomizeComponent implements OnInit {
  bathhouseForm: FormGroup;
  status: string = '';
  mainCard: HomeCard;
  homeCards: HomeCard[];


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private api: ApiService,
              private matUtils: MatUtilsService) {

    this.bathhouseForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: [''],
      seasonDateRange: this.formBuilder.group({
        seasonStart: ['', Validators.required],
        seasonEnd: ['', Validators.required],
      }),
    });
  }


  ngOnInit(): void {
    this.api.getBathhouse().subscribe(data => {
      const bathhouse = new Bathhouse(data);
      this.bathhouseForm.get('name').setValue(bathhouse.name);
      this.bathhouseForm.get('seasonDateRange.seasonStart').setValue(bathhouse.seasonStart);
      this.bathhouseForm.get('seasonDateRange.seasonEnd').setValue(bathhouse.seasonEnd);
    });

    this.api.getHomeCards().subscribe(data => {
      const allCards: HomeCard[] = data.map(model => new HomeCard(model));
      this.homeCards = allCards.filter(item => !item.isMainCard && item.orderingIndex != -1);
      this.mainCard = allCards.filter(item => item.isMainCard && item.orderingIndex == -1)[0];
    });
  }


  modifyBathhouseData() {
    if (!this.bathhouseForm.valid) {
      return;
    }

    this.status = 'loading';
    const newData = {
      name:  this.bathhouseForm.get('name').value,
      seasonDateFrom: this.bathhouseForm.get('seasonDateRange.seasonStart').value,
      seasonDateTo: this.bathhouseForm.get('seasonDateRange.seasonEnd').value,
      image: this.bathhouseForm.get('image').value
    }

    this.api.editBathhouse(UploadUtils.toFormData(newData)).subscribe(() => {
      this.status = '';
      this.matUtils.createSnackBar('Dati modificati.');
    }, error => {
      this.status = error;
    });
  }
}
