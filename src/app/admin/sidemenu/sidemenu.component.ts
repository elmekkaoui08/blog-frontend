import { Component, OnInit } from '@angular/core';
import {AppRoles} from "../../shared/models/role.model";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  readonly AppRoles: AppRoles;
  constructor() { }

  ngOnInit(): void {
  }

}
