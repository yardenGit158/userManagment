import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../Models/UserModel';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: UserModel[] = [];
  originalUsersData: { [key: string]: UserModel } = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      users.forEach((user) => {
        this.originalUsersData[user.userName] = { ...user };
      });
    });
  }

  anyChanges(): boolean {
    return this.users.some((user) => {
      const original = this.originalUsersData[user.userName];
      return JSON.stringify(original) !== JSON.stringify(user);
    });
  }

  updateUsers(): void {
    const usersToUpdate = this.users.filter((user) => {
      const original = this.originalUsersData[user.userName];
      return JSON.stringify(original) !== JSON.stringify(user);
    });

    if (usersToUpdate.length > 0) {
      this.userService.updateUser(usersToUpdate).subscribe({
        next: () => {
          console.log('Users updated successfully.');
          usersToUpdate.forEach((user) => {
            this.originalUsersData[user.userName] = { ...user };
          });
        },
        error: (error) => console.error('Failed to update users:', error),
      });
    } else {
      console.log('No changes to update.');
    }
  }
}
