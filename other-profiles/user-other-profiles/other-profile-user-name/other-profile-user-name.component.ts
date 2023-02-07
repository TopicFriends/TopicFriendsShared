import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms'
import { UserOtherProfileDescriptor } from '../../other-profiles-core/UserOtherProfilesDescriptors'

@Component({
  selector: 'app-other-profile-user-name',
  templateUrl: './other-profile-user-name.component.html',
  styleUrls: ['./other-profile-user-name.component.scss']
})
export class OtherProfileUserNameComponent implements OnInit {

  @Input() descriptor: UserOtherProfileDescriptor
  @Input() parentFormGroup: UntypedFormGroup
  @Input() thisFormControl: UntypedFormControl

  get isEditable() { return false }

  // @Input() userProfileInputs: UserProfileInputs

  urlNoProtocol: string
  fullUrl: string
  userName: string

  constructor() { }

  ngOnInit() {
    this.applyDataFromFormControl()
    // if ( ! this.userProfileInputs.isEditable ) {
    //   this.thisFormControl.valueChanges.subscribe(value => {
    //     // console.log('OtherProfileUserNameComponent, in subscribe value', value)
    //     this.applyDataFromFormControl()
    //   })
    // }
  }

  private applyDataFromFormControl() {
    if ( this.thisFormControl.value ) {
      this.userName = this.thisFormControl.value
      this.urlNoProtocol = this.userName && this.descriptor.urlPrefix + this.userName
      this.fullUrl = this.userName && ((this.descriptor.protocol || 'https://') + this.urlNoProtocol)
    }
  }
}
