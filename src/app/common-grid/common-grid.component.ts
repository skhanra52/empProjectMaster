import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';
import { NgbModal, ModalDismissReasons,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  styleUrls: ['./common-grid.component.sass']
})
export class CommonGridComponent implements OnInit {

  employeeData : any;
  closeResult = '';
  contactForm:FormGroup;
 
  constructor(private commonService: CommonServiceService, private modalService:NgbModal,private fb: FormBuilder) { 
    // this.contactForm = this.fb.group({
    //   firstName: new FormControl('', [Validators.required]),
    //   lastName: new FormControl(''),
    //   email: new FormControl(''),
    //   doj: new FormControl(),
    //   address:this.fb.group({
    //      street: new FormControl(''),
    //      city: new FormControl(''),
    //   state: new FormControl(''),
    //   pin:new FormControl(''),    
    // }),
    // status: new FormControl('')
    // });

    // Because we are using FormBuilder we can use below syntax otherwise above we can use.

    this.contactForm = this.fb.group({
      firstName:['', [Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.email]],
      doj: [''],
      address:this.fb.group({
         street: [''],
         city: [''],
      state: [''],
      pin:[''],    
    }),
    status: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    this.commonService.getdata().subscribe((response)=>{
      this.employeeData= response;
      console.log(response);
    });
  
  }
  
  open(content:any) {
    console.log(content);
    this.modalService.open(content,{ size: 'xl', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // Refreshing form after clicking on cross
      // this.contactForm.get('firstName')?.setValue('');
      // this.contactForm.controls["lastName"].setValue('');
      this.contactForm.reset();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(contactForm: FormGroup) {
    // console.log(contactForm.value);
    let date = contactForm.value.doj.day + '/' + contactForm.value.doj.month + '/' + contactForm.value.doj.year;
    let obj = {
      firstName: contactForm.value.firstName,
      lastName: contactForm.value.lastName,
      email: contactForm.value.email,
      DOJ: date,
      address: {
        street: contactForm.value.address.street,
        city: contactForm.value.address.city,
        pin: contactForm.value.address.pin,
        state: contactForm.value.address.state
      },
      status: contactForm.value.status
    }
    // PostAPI
    this.commonService.addEmployee(obj).subscribe((result) => {
      console.log("testing result", result);
      // GetAPI To  refresh automatically
      this.commonService.getdata().subscribe((response) => {
        this.employeeData = response;
      });
    });

  }

  
 

}
