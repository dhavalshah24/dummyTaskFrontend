import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../services/shared-data/shared-data.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  constructor(private _sharedDataService: SharedDataService) { }
  message: any = ""

  ngOnInit(): void {
    this.message = this._sharedDataService.outputMessage;
  }
}
