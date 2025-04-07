// IMPORTS
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  // Get the data from the API using JsonBin instead of JsonBlob because this website no longers exists
  GetFaultsAndHintsData():Observable<any>{
    return this.httpClient.get("https://api.jsonbin.io/v3/b/67e2791b8a456b79667c26e4");
  }
}
