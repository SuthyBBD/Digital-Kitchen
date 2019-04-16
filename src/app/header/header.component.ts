import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.setTimer();
  }

  logout() {
    this.auth.logout();

    this.router.navigate(['/login']);
  }

  setTimer() {
    // Update the count down every 1 second
    const x = setInterval(function () {

      // Get todays date and time
      const now = new Date().getTime();


      // Set the date we're counting down to
      const countDownDate = new Date('Jan 5, 2021 00:00:00').getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for hours, minutes and seconds
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="timer"
      document.getElementById('timer').innerHTML = hours + 'h:'
        + minutes + 'm:' + seconds + 's';

       console.log(this.time);
    }, 1000);
  }

}
