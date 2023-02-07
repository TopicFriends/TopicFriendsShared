import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms'
import { UserProfileInputs } from '../../UserProfileInputs';
import { UserOtherProfiles } from '../other-profiles-core/UserOtherProfiles';
import {
  getOtherProfileName,
  otherProfileUserName,
  UserOtherProfileDescriptor,
  UserOtherProfilesDescriptorsDefs,
  UserOtherProfilesDescriptorVals,
} from '../other-profiles-core/UserOtherProfilesDescriptors'


@Component({
selector: 'app-user-other-profiles',
  templateUrl: './user-other-profiles.component.html',
  styleUrls: ['./user-other-profiles.component.scss'],
})
export class UserOtherProfilesComponent implements OnInit {

  // descriptors: UserOtherProfilesDescriptors<UserOtherProfileDescriptor> = [
  descriptorsMap = new UserOtherProfilesDescriptorsDefs()

  formControls: UserOtherProfilesDescriptorVals<UntypedFormControl> = {} as any

  descriptorsList = UserOtherProfilesDescriptorsDefs.array

  @Input() public parentFormGroup: UntypedFormGroup = new UntypedFormGroup({})
  @Input() public userProfileInputs: UserProfileInputs
  @Input() public otherProfiles: UserOtherProfiles


  public formGroup: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    // private userProfileService: UserProfileService,
  ) {
    for ( let key in this.descriptorsMap ) {
      if (this.descriptorsMap.hasOwnProperty(key)) {
        this.formControls[key] = new UntypedFormControl()
      }
    }
    this.formGroup = this.formBuilder.group(this.formControls)
  }

  ngOnInit() {
    this.parentFormGroup.addControl('UserOtherProfiles', this.formGroup)
    if ( this.otherProfiles ) {
      this.applyFromDb(this.otherProfiles)
    }

    // new approach: adding to parent form group instead of constructing the whole form structure at once
    // this.userProfileService.otherProfilesById(this.userProfileInputs.userId).subscribe((otherProfiles: UserOtherProfiles) => {
    //   this.applyFromDb(otherProfiles)
    // });
    // setFormControlEnabled(this.formGroup, this.userProfileInputs.isEditable)
  }

  /* TODO: extract to non-component */
  private applyFromDb(otherProfiles: UserOtherProfiles) {
    console.log('applyFromDb: otherProfiles ', otherProfiles)
    this.otherProfiles = otherProfiles;
    if (otherProfiles) {
      // FIXME: setValue instead of patchValue (because some might be undefined)
      // this.formGroup.setValue({
      const patch = {}
      for ( let key of Object.keys(otherProfiles) ) {
        patch[key] = getOtherProfileName(otherProfiles[key])
      }
      this.formGroup.patchValue(patch)
    }
    this.formGroup.markAsPristine()
  }

  /* TODO: extract to non-component */
  getOtherProfiles(): UserOtherProfiles {
    const formVal = {}
    for ( let key of Object.keys(this.formControls) ) {
      formVal[key] = {
        userName: otherProfileUserName(this.formControls[key])
      }
    }
    return formVal as UserOtherProfiles
  }
}
