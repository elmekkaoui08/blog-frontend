import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-author-header',
  templateUrl: './author-header.component.html',
  styleUrls: ['./author-header.component.scss']
})
export class AuthorHeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
