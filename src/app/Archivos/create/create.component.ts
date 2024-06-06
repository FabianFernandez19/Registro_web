import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArchivosService } from '../../servicios/archivos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  styleUrls: ['./create.component.css'],
  standalone: true,
  providers: [ArchivosService]
})
export class CreateComponent implements OnInit {
  uploadForm: FormGroup;
  clave: string | null = null;
  clubId!: number;

  constructor(
    private fb: FormBuilder,
    private archivosService: ArchivosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.uploadForm = this.fb.group({
      file: [null]
    });
  }

  ngOnInit(): void {
    this.validarToken();
    this.route.params.subscribe(params => {
      this.clubId = +params['clubId'];
    });
  }

  validarToken(): void {
    this.clave = localStorage.getItem("access_token");
    if (!this.clave) {
      this.router.navigate(['login']);  
    }
  }

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files && files.length > 0) {
      this.uploadForm.get('file')!.setValue(files[0]);
      document.getElementById('file-name')!.innerText = files[0].name;  
    }
  }

  uploadFile(): void {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file')!.value);
    formData.append('club_id', this.clubId.toString());

    if (this.clave) {
      this.archivosService.addarchivos(this.clave, formData, this.clubId).subscribe({
        next: (response) => {
          console.log('File uploaded successfully', response);
          window.alert('Archivo cargado correctamente');
          this.router.navigate(['clubes/index']); 
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          const errorMessage = error.error?.error || 'Error uploading file';
          this.snackBar.open(errorMessage, 'Cerrar', {
            duration: 5000,
          });
        }
      });
    } else {
      console.error('Authentication token is missing');
    }
  }
}
